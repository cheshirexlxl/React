package com.aloha.minihome.security.provider;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import com.aloha.minihome.security.contants.SecurityConstants;
import com.aloha.minihome.security.props.JwtProps;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final JwtProps jwtProps;

    // 서명 키 생성
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtProps.getSecretKey().getBytes());
    }

    /**
     * JWT 토큰 생성
     * @param username 사용자 아이디
     * @param role     사용자 권한
     */
    public String createToken(String username, String role) {
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * 토큰에서 username 추출
     */
    public String getUsername(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * 토큰에서 role 추출
     */
    public String getRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    /**
     * 토큰 유효성 검증
     */
    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            log.error("JWT 검증 실패 : {}", e.getMessage());
            return false;
        }
    }

    // Claims 파싱
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
