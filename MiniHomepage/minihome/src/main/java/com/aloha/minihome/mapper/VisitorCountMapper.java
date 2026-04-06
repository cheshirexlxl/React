package com.aloha.minihome.mapper;

import java.time.LocalDate;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.minihome.domain.VisitorCount;

@Mapper
public interface VisitorCountMapper {

    // 특정 날짜 방문자 수 조회
    public VisitorCount selectByUserIdAndDate(Long userId, LocalDate visitDate) throws Exception;

    // 총 방문자 수 조회
    public int selectSumByUserId(Long userId) throws Exception;

    // 오늘 방문자 수 추가 (최초)
    public int insert(VisitorCount visitorCount) throws Exception;

    // 오늘 방문자 수 증가
    public int increment(Long userId, LocalDate visitDate) throws Exception;
}
