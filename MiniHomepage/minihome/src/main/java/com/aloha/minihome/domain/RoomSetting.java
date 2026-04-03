package com.aloha.minihome.domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RoomSetting {
    private Long id;
    private Long userId;
    private String bgColor;
    private String bgImage;
    private LocalDateTime updatedAt;
}
