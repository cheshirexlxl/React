package com.aloha.minihome.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.minihome.domain.RoomSetting;

@Mapper
public interface RoomSettingMapper {

    // 룸 설정 조회 (유저 기준)
    RoomSetting selectByUserId(Long userId);

    // 룸 설정 생성 (최초 1회)
    int insert(RoomSetting roomSetting);

    // 룸 설정 수정
    int update(RoomSetting roomSetting);
}
