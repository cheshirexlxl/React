package com.aloha.minihome.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.minihome.domain.Guestbook;
import com.aloha.minihome.mapper.GuestbookMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/guestbook")
public class GuestbookController {

    private final GuestbookMapper guestbookMapper;

    // 방명록 목록 조회 (페이징)
    @GetMapping("/{ownerId}")
    public ResponseEntity<?> list(
        @PathVariable Long ownerId,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        try {
            int offset = (page - 1) * size;
            List<Guestbook> list = guestbookMapper.selectByOwnerId(ownerId, size, offset);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.error("방명록 목록 조회 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 방명록 작성
    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody Guestbook guestbook) {
        try {
            int result = guestbookMapper.insert(guestbook);
            if (result > 0) {
                return new ResponseEntity<>(HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("방명록 작성 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 방명록 삭제 (비밀번호 검증)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String password = body.get("password");
            int result = guestbookMapper.delete(id, password);
            if (result > 0) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            log.error("방명록 삭제 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
