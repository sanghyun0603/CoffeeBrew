package b305.coffeebrew.server.config.security.handler;

import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Slf4j
public class UserLoginFailureHandler {
	private static final String METHOD_NAME = UserLoginFailureHandler.class.getName();

	public String onAuthenticationFailure(Exception exception) {
		log.info(METHOD_NAME + "- onAuthenticationFailure() ...");

		String message = "SERVER ERROR";
		try {
			if (exception instanceof LockedException) message = "잠겨 있는 계정";
			else if (exception instanceof DisabledException) message = "비활성화 계정";
			else if (exception instanceof CredentialsExpiredException) message = "비밀번호가 만료된 계정";
			else if (exception instanceof AccountExpiredException) message = "기간이 만료된 계정";
			else if (exception instanceof BadCredentialsException) message = "계정 자격 증명 실패";
			else if (exception instanceof UsernameNotFoundException) message = "존재하지 않는 유저";
			else if (exception instanceof NullPointerException) message = "아이디 또는 비밀번호 입력 오류";
			else if (exception instanceof MismatchedInputException) message = "요청 값이 존재하지 않음";
			else message = "알 수 없는 이유";
		} catch (Exception e) {
			log.error("SERVER ERROR " + METHOD_NAME, e);
		}
		return message;
	}
}
