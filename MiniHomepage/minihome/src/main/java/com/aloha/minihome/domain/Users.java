package com.aloha.minihome.domain;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class Users {
    private Long id;
    private String username;
    private String password;
    private String nickname;
    private String bio;
    private String profileImage;
    private Date birthDate;
    private String email;
    private Date createdAt;
    private Date updatedAt;
    private List<UserAuth> authList;
    // 회원가입 시 권한 선택용 (DB 컬럼 아님)
    private String role;
}
