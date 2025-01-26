package tech.nocountry.c23e64.validation.constraints;

import jakarta.validation.Constraint;
import tech.nocountry.c23e64.validation.NullNotBlankValidator;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Constraint(validatedBy = NullNotBlankValidator.class)
@Target({FIELD, METHOD, PARAMETER, ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface NullNotBlank {

    String message() default "El campo debe ser nulo o no estar en blanco";

    Class<?>[] groups() default {};

    Class<?>[] payload() default {};

}
