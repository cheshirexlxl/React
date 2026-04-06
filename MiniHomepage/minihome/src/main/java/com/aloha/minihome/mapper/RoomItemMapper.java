package com.aloha.minihome.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.minihome.domain.RoomItem;

@Mapper
public interface RoomItemMapper {

    // 룸 아이템 목록 조회 (홈 주인 기준)
    public List<RoomItem> selectByUserId(Long userId) throws Exception;

    // 룸 아이템 단건 조회
    public RoomItem selectById(Long id) throws Exception;

    // 아이템 배치 추가
    public int insert(RoomItem roomItem) throws Exception;

    // 아이템 위치 수정
    public int update(RoomItem roomItem) throws Exception;

    // 아이템 삭제
    public int delete(Long id) throws Exception;

    // 유저의 모든 아이템 삭제
    public int deleteByUserId(Long userId) throws Exception;
}
