package com.aloha.minihome.controller;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.minihome.domain.CustomUser;
import com.aloha.minihome.domain.Users;
import com.aloha.minihome.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    
    private final UserService userService;

    
    @GetMapping("/profile")
    public ResponseEntity<?> userInfo(
        @AuthenticationPrincipal CustomUser customUser
    ) {
        log.info("::::: user info :::::");

        if( customUser == null ) {
            return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }

        Users user = customUser.getUser();

        if( user != null ) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }

    // 미니홈피 주인 공개 정보 조회 (username으로 조회)
    @GetMapping("/{username}")
    public ResponseEntity<?> publicInfo(@PathVariable("username") String username) {
        log.info("::::: public user info - username: {} :::::", username);
        try {
            Users user = userService.select(username);
            if( user == null ) {
                return new ResponseEntity<>("NOT_FOUND", HttpStatus.NOT_FOUND);
            }
            // ROLE_ADMIN 이 아닌 계정은 미니홈피 주인이 아님 → 404
            boolean isAdmin = user.getAuthList() != null &&
                user.getAuthList().stream().anyMatch(a -> "ROLE_ADMIN".equals(a.getAuth()));
            if( !isAdmin ) {
                return new ResponseEntity<>("NOT_FOUND", HttpStatus.NOT_FOUND);
            }
            user.setPassword(null);   // 비밀번호 제거
            user.setAuthList(null);   // 권한 목록 제거
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            log.error("공개 유저 조회 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("")
    public ResponseEntity<?> join(@RequestBody Users user) {
        log.info("join request");
        try {
            boolean result = userService.insert(user);
            if( result ) {
                log.info("join success!");
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            }
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (DuplicateKeyException e) {
            log.warn("join duplicate: {}", e.getMessage());
            String msg = e.getMessage() != null && e.getMessage().contains("email")
                ? "이미 사용 중인 이메일입니다."
                : "이미 사용 중인 아이디입니다.";
            return new ResponseEntity<>(msg, HttpStatus.CONFLICT);
        } catch (Exception e) {
            log.error("join error", e);
            return new ResponseEntity<>("서버 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN') or #p0.username == authentication.name")
    @PutMapping("")
    public ResponseEntity<?> update(@RequestBody Users user) throws Exception {

        boolean result = userService.update(user);
    
        if( result ) {
        log.info("update success!");
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
        log.info("update fail!");
        return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN') or #p0 == authentication.name")
    @DeleteMapping("/{username}")
    public ResponseEntity<?> delete(@PathVariable("username") String username) throws Exception {
        boolean result = userService.delete(username);
        if( result )
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        else
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
    }

}
