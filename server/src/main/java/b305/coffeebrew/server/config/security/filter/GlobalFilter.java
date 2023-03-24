package b305.coffeebrew.server.config.security.filter;

import b305.coffeebrew.server.config.jwt.JwtTokenProvider;
import b305.coffeebrew.server.config.security.auth.PrincipalDetailService;
import b305.coffeebrew.server.config.security.handler.UserLogoutHandler;
import b305.coffeebrew.server.config.security.handler.UserLogoutSuccessHandler;
import b305.coffeebrew.server.config.utils.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * csrf, cors 등 web security 에서 설정하는 전역 필터 설정 클래스
 * 커스텀 필터 환경 변수 설정 클래스
 * corsFilter() : cross-origin resource sharing 허용 설정
 * authenticationFilter() : 유저 인증 메소드 빈 주입 및 환경 변수 설정
 * authorizationFilter() : 유저 인가 메소드 빈 주입 및 환경 변수 설정
 */

@Configuration
@RequiredArgsConstructor
public class GlobalFilter {
	@Value(value = "${user.cors.pattern}")
	private String corsPattern;
	@Value(value = "${user.cors.header}")
	private String corsHeader;
	@Value(value = "${user.cors.method}")
	private String corsMethod;
	@Value(value = "${user.cors.source.pattern}")
	private String corsSource;
	@Value(value = "${user.url.client}")
	private String clientURL;
	@Value(value = "${jwt.header.access}")
	private String headerAccess;
	@Value(value = "${jwt.header.refresh}")
	private String headerRefresh;
	@Value(value = "${jwt.type.access}")
	private String typeAccess;
	@Value(value = "${user.url.logout}")
	private String logoutURL;
	@Value(value = "${user.permit.all}")
	private String permitAll;
	@Value(value = "${user.session.id}")
	private String sessionId;
	@Value(value = "${user.cookie.credential}")
	private boolean cookieConfig;

	private final UserAuthenticationManager userAuthenticationManager;
	private final JwtTokenProvider jwtTokenProvider;
	private final PrincipalDetailService principalDetailService;
	private final RedisUtil redisUtil;

	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOriginPattern(corsPattern);
		config.addAllowedOrigin(clientURL);
		config.addAllowedHeader(corsHeader);
		config.addAllowedMethod(corsMethod);
		config.addExposedHeader(headerAccess);
		config.addExposedHeader(headerRefresh);
		config.setAllowCredentials(cookieConfig);
		source.registerCorsConfiguration(corsSource, config);
		return new CorsFilter(source);
	}

	public UserAuthenticationFilter authenticationFilter() {
		UserAuthenticationFilter userAuthenticationFilter = new UserAuthenticationFilter(userAuthenticationManager, jwtTokenProvider, redisUtil);
		userAuthenticationFilter.setHeaderKeyAccess(headerAccess);
		userAuthenticationFilter.setTypeAccess(typeAccess);

		return userAuthenticationFilter;
	}

	public JwtTokenAuthorizationFilter authorizationFilter() {
		JwtTokenAuthorizationFilter jwtTokenAuthorizationFilter = new JwtTokenAuthorizationFilter(userAuthenticationManager, jwtTokenProvider, principalDetailService);
		jwtTokenAuthorizationFilter.setHeaderKeyAccess(headerAccess);
		jwtTokenAuthorizationFilter.setTypeAccess(typeAccess);

		return jwtTokenAuthorizationFilter;
	}

	public String getLogoutURL() {
		return logoutURL;
	}

	public String getPermitAll() {
		return permitAll;
	}

	public String getSessionId() {
		return sessionId;
	}

	public UserLogoutHandler logoutHandler() {
		return new UserLogoutHandler();
	}

	public UserLogoutSuccessHandler logoutSuccessHandler() {
		return new UserLogoutSuccessHandler();
	}
}
