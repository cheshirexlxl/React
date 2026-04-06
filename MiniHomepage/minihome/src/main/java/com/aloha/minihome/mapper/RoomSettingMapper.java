package com.aloha.minihome.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.minihome.domain.RoomSetting;

@Mapper
public interface RoomSettingMapper {

    // 룸 설정 조회 (유저 기준)
    public RoomSetting selectByUserId(Long userId) throws Exception;

    // 룸 설정 생성 (최초 1회)
    public int insert(RoomSetting roomSetting) throws Exception;

    // 룸 설정 수정
    public int update(RoomSetting roomSetting) throws Exception;
}
