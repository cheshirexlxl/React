package com.aloha.minihome.domain;

import java.time.LocalDate;

import lombok.Data;

@Data
public class VisitorCount {
    private Long id;
    private Long userId;
    private LocalDate visitDate;
    private int count;
}
