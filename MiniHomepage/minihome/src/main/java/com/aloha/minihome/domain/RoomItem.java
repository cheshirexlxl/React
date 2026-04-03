package com.aloha.minihome.domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RoomItem {
    private Long id;
    private Long userId;
    private String itemType;
    private int positionX;
    private int positionY;
    private int zIndex;
    private LocalDateTime createdAt;
}
