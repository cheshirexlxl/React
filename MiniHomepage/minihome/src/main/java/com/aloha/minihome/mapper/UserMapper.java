package com.aloha.minihome.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.minihome.domain.UserAuth;
import com.aloha.minihome.domain.Users;

@Mapper
public interface UserMapper {

    // 회원가입
    public int insert(Users user) throws Exception;

    // username으로 조회 (로그인, 중복체크)
    public Users select(String username) throws Exception;

    // id로 조회 (프로필 조회)
    public Users selectById(Long id) throws Exception;

    // 프로필 수정
    public int update(Users user) throws Exception;

    // 회원 권한 등록
    public int insertAuth(UserAuth userAuth) throws Exception;

    // [개선] 회원 권한 삭제
    public int deleteAuth(String username) throws Exception;

    // 회원 탈퇴
    public int delete(String username) throws Exception;
}
