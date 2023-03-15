package b305.coffeebrew.server.config.security.filter;

import b305.coffeebrew.server.config.security.handler.DecodeEncodeHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * attemptAuthentication() 에서 검증을 보낼 경우
 * 여기서 ID와 비밀번호의 값이 비어 있는지 잘못된 값을 들고 있는지 DB 값과 비교해서
 * 올바른 값을 가진 경우만 리턴
 * 나머지 경우는 에러에 맞게 Exception 처리를 해줌
 */

@Slf4j
@RequiredArgsConstructor
@Component
public class UserAuthenticationManager implements AuthenticationManager {
	private static final String METHOD_NAME = UserAuthenticationManager.class.getName();
	private final DecodeEncodeHandler decodeEncodeHandler;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		log.info(METHOD_NAME + "- authenticate() ...");
		try {
			String memberId = String.valueOf(authentication.getPrincipal());
			String password = String.valueOf(authentication.getCredentials());

			if (memberId == null || memberId.equals("")) {
				log.warn("Member memberId validate - Empty or null");
				throw new NullPointerException();
			} else if (password == null || password.equals("")) {
				log.warn("Member password validate - Empty or null");
				throw new NullPointerException();
			} else {
//				if (decodeEncodeHandler.memberIdValid(memberId)) {
//					if (decodeEncodeHandler.passwordValid(memberId, password))
//						return new UsernamePasswordAuthenticationToken(memberId, password);
//				}
			}
		} catch (LockedException le) {
			log.error("잠겨 있는 계정 " + METHOD_NAME, le);
		} catch (DisabledException de) {
			log.error("비활성화 계정 " + METHOD_NAME, de);
		} catch (CredentialsExpiredException ce) {
			log.error("비밀번호가 만료된 계정 " + METHOD_NAME, ce);
		} catch (AccountExpiredException ae) {
			log.error("기간이 만료된 계정 " + METHOD_NAME, ae);
		} catch (BadCredentialsException be) {
			log.error("계정 자격 증명 실패 " + METHOD_NAME, be);
		} catch (UsernameNotFoundException ue) {
			log.error("존재하지 않는 계정 " + METHOD_NAME, ue);
		} catch (Exception e) {
			log.error("SERVER ERROR " + METHOD_NAME, e);
		}
		throw new NullPointerException();
	}
}
