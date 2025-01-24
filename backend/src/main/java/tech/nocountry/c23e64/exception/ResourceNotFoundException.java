package tech.nocountry.c23e64.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

import java.net.URI;

@Getter
public class ResourceNotFoundException extends RuntimeException {

    private final ProblemDetail problemDetail;

    public ResourceNotFoundException(String message) {
        super(message);
        this.problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, message);
        problemDetail.setType(URI.create("https://httpstatuses.com/404"));
        problemDetail.setTitle("Not Found");
    }

}
