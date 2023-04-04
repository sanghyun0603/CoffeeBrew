package b305.coffeebrew.server.dto.survey;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@NoArgsConstructor
@Slf4j
public class SurveyResDTO {

    private String resultCode;
    private String resultType;
    private int param1;
    private int param2;
    private int param3;
    private int param4;
    private int param5;
    private int param6;
    private int param7;
    private int param8;
    private boolean expired;

    @Builder
    public SurveyResDTO(String resultCode, String resultType, int param1, int param2, int param3, int param4, int param5, int param6, int param7, int param8, boolean expired) {
        this.resultCode = resultCode;
        this.resultType = resultType;
        this.param1 = param1;
        this.param2 = param2;
        this.param3 = param3;
        this.param4 = param4;
        this.param5 = param5;
        this.param6 = param6;
        this.param7 = param7;
        this.param8 = param8;
        this.expired = expired;
    }

    public static SurveyResDTO of(String resultCode, String resultType, int param1, int param2, int param3, int param4, int param5, int param6, int param7, int param8, boolean expired) {
        return SurveyResDTO.builder()
                .resultCode(resultCode)
                .resultType(resultType)
                .param1(param1)
                .param2(param2)
                .param3(param3)
                .param4(param4)
                .param5(param5)
                .param6(param6)
                .param7(param7)
                .param8(param8)
                .expired(expired)
                .build();
    }
}
