package com.aloha.minihome.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.minihome.domain.Guestbook;

@Mapper
public interface GuestbookMapper {

    // 방명록 목록 조회 (홈 주인 기준)
    List<Guestbook> selectByOwnerId(Long ownerId);

    // 방명록 단건 조회
    Guestbook selectById(Long id);

    // 방명록 작성
    int insert(Guestbook guestbook);

    // 방명록 삭제
    int delete(Long id);
}
