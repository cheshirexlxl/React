package com.aloha.minihome.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.minihome.domain.RoomItem;

@Mapper
public interface RoomItemMapper {

    // 룸 아이템 목록 조회 (홈 주인 기준)
    List<RoomItem> selectByUserId(Long userId);

    // 룸 아이템 단건 조회
    RoomItem selectById(Long id);

    // 아이템 배치 추가
    int insert(RoomItem roomItem);

    // 아이템 위치 수정
    int update(RoomItem roomItem);

    // 아이템 삭제
    int delete(Long id);

    // 유저의 모든 아이템 삭제
    int deleteByUserId(Long userId);
}
