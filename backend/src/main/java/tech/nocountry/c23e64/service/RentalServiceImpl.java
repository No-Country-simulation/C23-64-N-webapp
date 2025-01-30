package tech.nocountry.c23e64.service;

import org.springframework.stereotype.Service;
import tech.nocountry.c23e64.dto.RentalCreateDto;
import tech.nocountry.c23e64.dto.RentalDto;
import tech.nocountry.c23e64.mapper.ClientInfoMapper;
import tech.nocountry.c23e64.mapper.RentalMapper;
import tech.nocountry.c23e64.model.ClientInfoEntity;
import tech.nocountry.c23e64.model.FurnitureEntity;
import tech.nocountry.c23e64.model.RentalDetailEntity;
import tech.nocountry.c23e64.model.RentalEntity;
import tech.nocountry.c23e64.repository.ClientInfoRepository;
import tech.nocountry.c23e64.repository.FurnitureRepository;
import tech.nocountry.c23e64.repository.RentalRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final FurnitureRepository furnitureRepository;
    private final ClientInfoRepository clientInfoRepository;
    private final RentalMapper rentalMapper;
    private final ClientInfoMapper clientInfoMapper;

    public RentalServiceImpl(RentalRepository rentalRepository, ClientInfoRepository clientInfoRepository, FurnitureRepository furnitureRepository, RentalMapper rentalMapper, ClientInfoMapper clientInfoMapper) {
        this.rentalRepository = rentalRepository;
        this.clientInfoRepository = clientInfoRepository;
        this.furnitureRepository = furnitureRepository;
        this.rentalMapper = rentalMapper;
        this.clientInfoMapper = clientInfoMapper;
    }

    @Override
    public RentalDto createRental(RentalCreateDto createDto) {
        ClientInfoEntity clientInfo = clientInfoRepository.save(clientInfoMapper.toEntity(createDto.getClientInfo()));

        RentalEntity rental = RentalEntity.builder()
                .clientInfo(clientInfo)
                .rentalDate(createDto.getRentalDate())
                .qrCode("QR CODE")
                .build();

        List<RentalDetailEntity> rentalDetails = createDto.getRentalDetails().stream().map(rentalDetailCreateDto -> {
            FurnitureEntity furniture = furnitureRepository.findById(rentalDetailCreateDto.getFurnitureId())
                    .orElseThrow(() -> new IllegalArgumentException("El mueble con ID " + rentalDetailCreateDto.getFurnitureId() + " no existe"));

            return RentalDetailEntity.builder()
                    .rental(rental)
                    .furniture(furniture)
                    .quantity(rentalDetailCreateDto.getQuantity())
                    .subTotal(furniture.getUnitPrice().multiply(BigDecimal.valueOf(rentalDetailCreateDto.getQuantity())))
                    .build();
        }).toList();

        rental.setRentalDetails(rentalDetails);
        rental.setTotal(rentalDetails.stream()
                .map(RentalDetailEntity::getSubTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        return rentalMapper.toDto(rentalRepository.save(rental));
    }

    @Override
    public List<RentalDto> getAllRentals() {
        return rentalRepository.findAll().stream().map(rentalMapper::toDto).toList();
    }

}
