package com.aloha.minihome.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/files")
public class FileController {

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("파일이 없습니다.", HttpStatus.BAD_REQUEST);
        }

        try {
            // 저장 디렉토리 생성
            File uploadDir = new File(uploadPath + "/profile");
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // 고유 파일명 생성
            String originalFilename = file.getOriginalFilename();
            String ext = originalFilename.substring(originalFilename.lastIndexOf("."));
            String savedFilename = UUID.randomUUID().toString() + ext;

            // 파일 저장
            File dest = new File(uploadDir, savedFilename);
            file.transferTo(dest);

            // 접근 URL 반환 (/api 프록시를 통해 접근)
            String fileUrl = "/api/files/profile/" + savedFilename;
            log.info("파일 업로드 성공: {}", fileUrl);

            return new ResponseEntity<>(fileUrl, HttpStatus.OK);

        } catch (IOException e) {
            log.error("파일 업로드 실패", e);
            return new ResponseEntity<>("파일 업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
