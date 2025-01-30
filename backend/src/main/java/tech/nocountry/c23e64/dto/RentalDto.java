package tech.nocountry.c23e64.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class RentalDto {

    private Long id;

    private ClientInfoDto clientInfo;

    private List<RentalDetailDto> rentalDetails;

    private String rentalDate;

    private BigDecimal total;

    private String qrCode;

}
