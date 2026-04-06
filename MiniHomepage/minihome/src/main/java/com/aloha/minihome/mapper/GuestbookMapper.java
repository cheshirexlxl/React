package com.aloha.minihome.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.minihome.domain.Guestbook;

@Mapper
public interface GuestbookMapper {

    // 방명록 목록 조회 (홈 주인 기준)
    public List<Guestbook> selectByOwnerId(Long ownerId) throws Exception;

    // 방명록 단건 조회
    public Guestbook selectById(Long id) throws Exception;

    // 방명록 작성
    public int insert(Guestbook guestbook) throws Exception;

    // 방명록 삭제
    public int delete(Long id) throws Exception;
}
