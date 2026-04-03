package com.aloha.minihome.domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Guestbook {
    private Long id;
    private Long ownerId;
    private String nickname;
    private String password;
    private String content;
    private LocalDateTime createdAt;
}
