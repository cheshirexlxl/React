-- Active: 1767840811206@@127.0.0.1@3306@minihome
-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS minihome CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 사용자 생성 및 권한 부여
CREATE USER IF NOT EXISTS 'minihome'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON minihome.* TO 'minihome'@'localhost';
FLUSH PRIVILEGES;

USE minihome;

-- 주인 계정
CREATE TABLE IF NOT EXISTS users (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    username        VARCHAR(50)     NOT NULL UNIQUE,
    password        VARCHAR(255)    NOT NULL,
    nickname        VARCHAR(50)     NOT NULL,
    bio             TEXT,
    profile_image   VARCHAR(500),
    birth_date      DATE,
    email           VARCHAR(100)    UNIQUE,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- 주인 초기 데이터 삽입 (비밀번호는 "123456"을 BCrypt로 암호화한 값)
INSERT INTO users (username, password, nickname, bio)
VALUES ('admin', '$2a$10$01vqnTb1vChJteK2uOsomuORXW2Mf0NIcssh03vrQvhJOUYtG6Q/e', '냐아옹', '나야옹의 한줄소개');

-- 방명록
CREATE TABLE IF NOT EXISTS guestbook (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    owner_id    BIGINT          NOT NULL,               -- 누구 홈인지 (users.id)
    nickname    VARCHAR(50)     NOT NULL,
    password    VARCHAR(255)    NOT NULL,
    content     TEXT            NOT NULL,
    icon        VARCHAR(20)     NOT NULL DEFAULT 'cat', -- 프로필 아이콘 키
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE guestbook ADD COLUMN icon VARCHAR(20) NOT NULL DEFAULT 'cat' AFTER content;

-- 룸 아이템 배치
CREATE TABLE IF NOT EXISTS room_items (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    user_id     BIGINT          NOT NULL,               -- 주인 (users.id)
    item_type   VARCHAR(100)    NOT NULL,
    position_x  INT             NOT NULL DEFAULT 0,
    position_y  INT             NOT NULL DEFAULT 0,
    z_index     INT             NOT NULL DEFAULT 0,
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 룸 설정
CREATE TABLE IF NOT EXISTS room_setting (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    user_id     BIGINT          NOT NULL UNIQUE,        -- 주인 (users.id)
    bg_color    VARCHAR(20)     DEFAULT '#FFFFFF',
    bg_image    VARCHAR(500),
    updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 방문자 수
CREATE TABLE IF NOT EXISTS visitor_count (
    id          BIGINT  NOT NULL AUTO_INCREMENT,
    user_id     BIGINT  NOT NULL,                       -- 누구 홈인지 (users.id)
    visit_date  DATE    NOT NULL,
    count       INT     NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uq_user_date (user_id, visit_date),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 회원 권한
CREATE TABLE IF NOT EXISTS user_auth (
    id          BIGINT      NOT NULL AUTO_INCREMENT,
    username    VARCHAR(50) NOT NULL,
    auth        VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
    PRIMARY KEY (id),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

-- 기본 권한 삽입
INSERT INTO user_auth (username, auth) VALUES ('admin', 'ROLE_ADMIN');

