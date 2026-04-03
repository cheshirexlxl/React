package com.aloha.minihome.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.minihome.domain.Users;

@Mapper
public interface UserMapper {

    // 회원가입
    int insert(Users user);

    // username으로 조회 (로그인, 중복체크)
    Users select(String username);

    // id로 조회 (프로필 조회)
    Users selectById(Long id);

    // 프로필 수정
    int update(Users user);

    // 회원 탈퇴
    int delete(Long id);
}
