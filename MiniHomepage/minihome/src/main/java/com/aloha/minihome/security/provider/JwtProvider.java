package com.aloha.minihome.security.provider;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.aloha.minihome.domain.CustomUser;
import com.aloha.minihome.domain.UserAuth;
import com.aloha.minihome.domain.Users;
import com.aloha.minihome.mapper.UserMapper;
import com.aloha.minihome.security.contants.SecurityConstants;
import com.aloha.minihome.security.props.JwtProps;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final JwtProps jwtProps;
    private final UserMapper userMapper;    

    /**
     * JWT 토큰 생성
     * @param id       사용자 PK
     * @param username 사용자 아이디
     * @param roles    사용자 권한 목록
     */
    public String createToken(Long id, String username, List<String> roles) {

        SecretKey shaKey = getShaKey();

        int exp = 1000 * 60 * 60 * 24 * 5;
        String jwt = Jwts.builder()
                .signWith(shaKey, Jwts.SIG.HS512)
                .header().add("typ", SecurityConstants.TOKEN_TYPE)
                .and()
                .expiration( new Date( System.currentTimeMillis() + exp ) )
                .claim("id", id)
                .claim("username", username)
                .claim("roles", roles)
                .compact();

        return jwt;
    }



    /**
     * 인증 토큰 (토큰 해석)
     * @param authorization
     * @return 
     */
    public UsernamePasswordAuthenticationToken getAuthenticationToken(String authorization) {
        if( authorization == null || authorization.length() == 0 )
            return null;

        try {
            String jwt = authorization.replace(SecurityConstants.TOKEN_PREFIX, "");
            log.info("jwt : " + jwt);

            SecretKey shaKey = getShaKey();

            Jws<Claims> parsedToken = Jwts.parser()
                                          .verifyWith(shaKey)
                                          .build()
                                          .parseSignedClaims(jwt);
            log.info("parsedToken : " + parsedToken);

            String id = parsedToken.getPayload().get("id").toString();
            String username = parsedToken.getPayload().get("username").toString();
            Object roles = parsedToken.getPayload().get("rol");

            Users user = new Users();
            user.setId(Long.parseLong(id));
            user.setUsername(username);
            List<UserAuth> authList = ((List<?>) roles)
                                        .stream()
                                        .map( auth -> UserAuth.builder()
                                                              .username(username)
                                                              .auth(auth.toString())
                                                              .build()
                                            )
                                        .collect( Collectors.toList() );
            user.setAuthList(authList);

            List<SimpleGrantedAuthority> authorities
                    = ((List<?>) roles)
                        .stream()
                        .map( auth -> new SimpleGrantedAuthority(auth.toString()) )
                        .collect( Collectors.toList() );
            try {
                Users userInfo = userMapper.select(username);
                if( userInfo != null ) {
                    user.setNickname(userInfo.getNickname());
                    user.setEmail(userInfo.getEmail());
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                log.error("Error fetching additional user info during token parsing");
            }

            UserDetails userDetails = new CustomUser(user);

            return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
            
        } catch (ExpiredJwtException exception) {
            log.warn("Request to parse expired JWT : {} failed : {}", authorization, exception.getMessage());
        } catch (UnsupportedJwtException exception) {
            log.warn("Request to parse unsupported JWT : {} failed : {}", authorization, exception.getMessage());
        } catch (MalformedJwtException exception) {
            log.warn("Request to parse invalid JWT : {} failed : {}", authorization, exception.getMessage());
        } catch (IllegalArgumentException exception) {
            log.warn("Request to parse empty or null JWT : {} failed : {}", authorization, exception.getMessage());
        }
        return null;
    }

    /**
     * 토큰 유효성 검증
     */
    public boolean validateToken(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parser()
                                     .verifyWith(getShaKey())
                                     .build()
                                     .parseSignedClaims(jwt);
            Date expiration = claims.getPayload().getExpiration();
            log.info("expiration : " + expiration.toString());

            boolean result = expiration.after( new Date() );
            return result;
        } catch (ExpiredJwtException e) {
            log.error("Token expired");
        } catch (JwtException e) {
            log.error("Token corrupted");
        } catch (NullPointerException e) {
            log.error("Token is null");
        } catch (Exception e) {
            log.error("Token validation exception");
        }
        return false;
    }    

    // 시크릿 키
    private SecretKey getShaKey() {
        String secretKey = jwtProps.getSecretKey();
        byte[] signingKey = secretKey.getBytes();
        SecretKey shaKey = Keys.hmacShaKeyFor(signingKey);
        return shaKey;
    }
}
