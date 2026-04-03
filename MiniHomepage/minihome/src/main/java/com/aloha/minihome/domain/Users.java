package com.aloha.minihome.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class Users {
    private Long id;
    private String username;
    private String password;
    private String nickname;
    private String bio;
    private String profileImage;
    private LocalDate birthDate;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
