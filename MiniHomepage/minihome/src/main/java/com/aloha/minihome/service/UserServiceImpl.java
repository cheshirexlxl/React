package com.aloha.minihome.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aloha.minihome.domain.UserAuth;
import com.aloha.minihome.domain.Users;
import com.aloha.minihome.mapper.UserMapper;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    
    @Override
    @Transactional
    public boolean insert(Users user) throws Exception {
        // 비밀번호 암호화
        String password = user.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        // 회원 등록
        int result = userMapper.insert(user);

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
    public Users selectById(Long id) throws Exception {
        return userMapper.selectById(id);
    }

    @Override
    public void login(Users user, HttpServletRequest request) throws Exception {
        // JWT 기반 인증은 JwtAuthenticationFilter에서 처리하므로, 이 메서드는 빈 구현으로 남겨둡니다.
    }

    @Override
    public boolean update(Users user) throws Exception {
        // 비밀번호 입력한 경우에만 암호화하여 업데이트
        String password = user.getPassword();
        if (password != null && !password.isEmpty()) {
            user.setPassword(passwordEncoder.encode(password));
        } else {
            user.setPassword(null); // null이면 mapper에서 UPDATE 제외
        }
        int result = userMapper.update(user);
        return result > 0;
    }

    @Override
    public boolean delete(String username) throws Exception {
        // 1. 권한 삭제 (자식 테이블)
        userMapper.deleteAuth(username);
        // 2. 회원 삭제 (부모 테이블)
        return userMapper.delete(username) > 0;
    }
    
}
