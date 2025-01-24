package tech.nocountry.c23e64.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFound(ResourceNotFoundException ex) {
        return ex.getProblemDetail();
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ProblemDetail handleDuplicateResource(DuplicateResourceException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
        problemDetail.setType(URI.create("https://httpstatuses.com/409"));
        problemDetail.setTitle("Conflict");

        return problemDetail;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationExceptions(MethodArgumentNotValidException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setType(URI.create("https://httpstatuses.com/400"));
        problemDetail.setTitle("Validation Error");
        problemDetail.setDetail("One or more fields contain invalid values");

        List<Map<String, String>> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> Map.of(
                        "field", err.getField(),
                        "rejectedValue", String.valueOf(err.getRejectedValue()),
                        "message", Objects.requireNonNullElse(err.getDefaultMessage(), "Validation error")
                ))
                .collect(Collectors.toList());

        problemDetail.setProperty("errors", errors);
        return problemDetail;
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ProblemDetail handleInvalidJson(HttpMessageNotReadableException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setType(URI.create("https://httpstatuses.com/400"));
        problemDetail.setTitle("Invalid JSON");
        problemDetail.setDetail("The request body contains invalid JSON");

        return problemDetail;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleIllegalArgument(IllegalArgumentException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
        problemDetail.setType(URI.create("https://httpstatuses.com/400"));
        problemDetail.setTitle("Bad Request");

        return problemDetail;
    }
}
