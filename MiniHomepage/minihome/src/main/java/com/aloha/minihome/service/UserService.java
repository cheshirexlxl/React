package com.aloha.minihome.service;

import com.aloha.minihome.domain.Users;

import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
    
    public boolean insert(Users user) throws Exception;
    public Users select(String username) throws Exception;
    public Users selectById(Long id) throws Exception;
    public void login(Users user, HttpServletRequest request) throws Exception;
    public boolean update(Users user) throws Exception;
    public boolean delete(String username) throws Exception;

}
