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
}
