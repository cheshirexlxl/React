package com.aloha.minihome.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.aloha.minihome.domain.Guestbook;

@Mapper
public interface GuestbookMapper {

    // 방명록 목록 조회 (홈 주인 기준, 페이징)
    public List<Guestbook> selectByOwnerId(
        @Param("ownerId") Long ownerId,
        @Param("size") int size,
        @Param("offset") int offset
    ) throws Exception;

    // 방명록 단건 조회
    public Guestbook selectById(Long id) throws Exception;

    // 방명록 작성
    public int insert(Guestbook guestbook) throws Exception;

    // 방명록 삭제 (비밀번호 검증)
    public int delete(@Param("id") Long id, @Param("password") String password) throws Exception;
}
