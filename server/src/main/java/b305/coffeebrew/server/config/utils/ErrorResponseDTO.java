package b305.coffeebrew.server.config.utils;

import b305.coffeebrew.server.exception.ErrorCode;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ErrorResponseDTO {
    private final int status;
    private final String message;
    private List<Error> errors;


    @Override
    public String toString() {
        return "{\n" + "\t\"status\": " + status + ",\n\t\"message\": \"" + message + '\"' + "\n}";
    }

    public ErrorResponseDTO(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public ErrorResponseDTO(ErrorCode code, BindingResult bindingResult) {
        this.status = code.getStatus();
        this.message = code.getMessage();
        this.errors = Error.of(bindingResult);
    }

    public ErrorResponseDTO(ErrorCode code) {
        this.status = code.getStatus();
        this.message = code.getMessage();
    }
    public ErrorResponseDTO(ErrorCode code, String msg) {
        this.status = code.getStatus();
        this.message = msg;
    }

    @Getter
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Error {
        private String field;
        private String value;
        private String reason;

        private Error(String field, String value, String reason) {
            this.field = field;
            this.value = value;
            this.reason = reason;
        }

        private static List<Error> of(BindingResult bindingResult) {
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            return fieldErrors.stream().map(error -> new Error(error.getField(), error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(), error.getDefaultMessage())).collect(Collectors.toList());
        }
    }
}
