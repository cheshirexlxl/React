package com.aloha.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aloha.login.domain.UserAuth;
import com.aloha.login.domain.Users;
import com.aloha.login.mapper.UserMapper;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserServiceImpl implements UserService {
    
  @Autowired
  private UserMapper userMapper;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Override
  @Transactional
  public boolean insert(Users user) throws Exception {
    // 비밀번호 암호화
    String password = user.getPassword();
    String encodedPassword = passwordEncoder.encode(password);
    user.setPassword(encodedPassword);
    // 회원 등록
    int result = userMapper.join(user);

    // 권한 등록
    if( result > 0 ) {
        UserAuth userAuth = UserAuth.builder()
                                    .username(user.getUsername())
                                    .auth("ROLE_USER")
                                    .build();
        result += userMapper.insertAuth(userAuth);
    }
    return result > 0;
  }

  @Override
  public Users select(String username) throws Exception {
    return userMapper.select(username);
  }

  @Override
  public void login(Users user, HttpServletRequest request) throws Exception {
    // JWT 기반 인증은 JwtAuthenticationFilter에서 처리
  }

  @Override
  public boolean update(Users user) throws Exception {
    // 비밀번호 암호화
    String password = user.getPassword();
    String encodedPassword = passwordEncoder.encode(password);
    user.setPassword(encodedPassword);
    int result = userMapper.update(user);
    return result > 0;
  }

  /**
   * [개선] 회원 삭제 시 user_auth 먼저 삭제 (cascade)
   */
  @Override
  public boolean delete(String username) throws Exception {
    // 1. 권한 삭제 (자식 테이블)
    userMapper.deleteAuth(username);
    // 2. 회원 삭제 (부모 테이블)
    return userMapper.delete(username) > 0;
  }
}