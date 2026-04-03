package com.aloha.minihome.mapper;

import java.time.LocalDate;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.minihome.domain.VisitorCount;

@Mapper
public interface VisitorCountMapper {

    // 특정 날짜 방문자 수 조회
    VisitorCount selectByUserIdAndDate(Long userId, LocalDate visitDate);

    // 총 방문자 수 조회
    int selectSumByUserId(Long userId);

    // 오늘 방문자 수 추가 (최초)
    int insert(VisitorCount visitorCount);

    // 오늘 방문자 수 증가
    int increment(Long userId, LocalDate visitDate);
}
