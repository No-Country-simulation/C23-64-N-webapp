package tech.nocountry.c23e64.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

import java.net.URI;

@Getter
public class DuplicateResourceException extends RuntimeException {

    private final ProblemDetail problemDetail;

    public DuplicateResourceException(String message) {
        super(message);
        this.problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, message);
        problemDetail.setType(URI.create("https://httpstatuses.com/409"));
        problemDetail.setTitle("Conflict");
    }

}
