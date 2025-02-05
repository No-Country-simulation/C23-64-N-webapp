package tech.nocountry.c23e64.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tech.nocountry.c23e64.dto.RentalCreateDto;
import tech.nocountry.c23e64.dto.RentalDto;
import tech.nocountry.c23e64.mapper.ClientInfoMapper;
import tech.nocountry.c23e64.mapper.RentalMapper;
import tech.nocountry.c23e64.model.*;
import tech.nocountry.c23e64.repository.ClientInfoRepository;
import tech.nocountry.c23e64.repository.FurnitureRepository;
import tech.nocountry.c23e64.repository.RentalDetailRepository;
import tech.nocountry.c23e64.repository.RentalRepository;

import java.awt.image.BufferedImage;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final FurnitureRepository furnitureRepository;
    private final ClientInfoRepository clientInfoRepository;
    private final RentalMapper rentalMapper;
    private final ClientInfoMapper clientInfoMapper;
    private final RentalDetailRepository rentalDetailRepository;

    @Override
    public RentalDto createRental(RentalCreateDto createDto) {
        final ClientInfoEntity clientInfo = getClientInfo(createDto);

        RentalEntity rental = RentalEntity.builder()
                .clientInfo(clientInfo)
                .rentalDate(createDto.getRentalDate())
                .build();

        List<RentalDetailEntity> rentalDetails = createDto.getRentalDetails().stream().map(rentalDetailCreateDto -> {
            FurnitureEntity furniture = furnitureRepository.findById(rentalDetailCreateDto.getFurnitureId())
                    .orElseThrow(() -> new IllegalArgumentException("El mueble con ID " + rentalDetailCreateDto.getFurnitureId() + " no existe"));

            Integer totalReserved = rentalDetailRepository.findTotalReservedByFurnitureAndDate(furniture.getId(), rental.getRentalDate());
            if (totalReserved + rentalDetailCreateDto.getQuantity() > furniture.getStock()) {
                throw new IllegalArgumentException("No hay suficiente stock para el mueble con ID " + furniture.getId());
            }

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

    private ClientInfoEntity getClientInfo(RentalCreateDto createDto) {
        final ClientInfoEntity clientInfo;
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAuthenticated = authentication != null && authentication.isAuthenticated() && !authentication.getPrincipal().equals("anonymousUser");

        if (isAuthenticated) {
            final UserEntity user = (UserEntity) authentication.getPrincipal();
            boolean isAdmin = user.getUserRole().equals(UserRole.ROLE_ADMIN);

            if (isAdmin) {
                if (createDto.getClientInfo() == null) {
                    throw new IllegalArgumentException("Se debe enviar información del cliente al crear una reserva desde un usuario admin.");
                }
                clientInfo = clientInfoRepository.save(clientInfoMapper.toEntity(createDto.getClientInfo()));
            } else {
                clientInfo = user.getClientInfo();
            }
        } else {
            if (createDto.getClientInfo() != null) {
                clientInfo = clientInfoRepository.save(clientInfoMapper.toEntity(createDto.getClientInfo()));
            } else {
                throw new IllegalArgumentException("Información del cliente es requerida para reservas sin autenticación.");
            }
        }
        return clientInfo;
    }

    @Override
    public List<RentalDto> getAllRentals() {
        return rentalRepository.findAll().stream().map(rentalMapper::toDto).toList();
    }

    @Override
    public RentalDto getRentalById(Long id) {
        return rentalRepository.findById(id)
                .map(rentalMapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("El alquiler con ID " + id + " no existe"));
    }

    @Override
    public BufferedImage getRentalQrCode(Long id) {
        final RentalEntity rental = rentalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El alquiler con ID " + id + " no existe"));

        final String qrCodeText = """
                ID Reserva: %d
                Cliente: %s
                Fecha: %s
                Total: $%s
                """.formatted(rental.getId(), rental.getClientInfo().getFullName(), rental.getRentalDate(), rental.getTotal());

        return generateQrImage(qrCodeText, 300, 300);
    }

    @Override
    public void deleteRental(Long id) {
        if (rentalRepository.existsById(id)) {
            rentalRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("El alquiler con ID " + id + " no existe");
        }
    }

    private BufferedImage generateQrImage(String text, int width, int height) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            Map<EncodeHintType, Object> hints = Map.of(EncodeHintType.MARGIN, 1, EncodeHintType.CHARACTER_SET, "UTF-8");
            BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height, hints);
            return MatrixToImageWriter.toBufferedImage(bitMatrix);
        } catch (WriterException e) {
            throw new RuntimeException("Error al generar el código QR", e);
        }
    }

}
