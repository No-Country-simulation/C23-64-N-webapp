package tech.nocountry.c23e64.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import tech.nocountry.c23e64.model.RentalEntity;

import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class RentalEmailServiceImpl implements RentalEmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Override
    public void notifyClient(String to, RentalEntity rental, InputStreamSource qrCode) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject("Confirmación de Reserva");
            helper.addInline("embeddedImage", qrCode, "image/" + "png");

            String formattedDate = rental.getRentalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            String htmlContent = """
                        <html>
                            <body>
                                <h3>Confirmación de reserva</h3>
                                <p>Estimado cliente, su reserva para el día %s por un total de $%s ha sido confirmada.</p>
                                <p>A continuación, su código QR:</p>
                                <img src='cid:embeddedImage' alt='QR Code'/>
                            </body>
                        </html>
                    """.formatted(formattedDate, rental.getTotal());

            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("Error al enviar correo HTML con imagen", e);
            throw new RuntimeException("Error al enviar correo HTML con imagen", e);
        }
    }

}
