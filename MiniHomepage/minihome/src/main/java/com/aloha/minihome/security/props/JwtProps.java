package com.aloha.minihome.security.props;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties("com.aloha.minihome")
public class JwtProps {
    private String secretKey;
}

