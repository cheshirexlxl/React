package com.aloha.minihome.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${upload.path}")
    private String uploadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // /files/profile/** 요청 → C:/upload/profile/ 디렉토리에서 파일 서빙
        registry.addResourceHandler("/files/profile/**")
                .addResourceLocations("file:///" + uploadPath + "/profile/");
    }
}
