package tech.nocountry.c23e64.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import tech.nocountry.c23e64.validation.constraints.NullNotBlank;

public class NullNotBlankValidator implements ConstraintValidator<NullNotBlank, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value == null || !value.isBlank();
    }

}
