DROP TABLE IF EXISTS `boards`;

CREATE TABLE `boards` (
  `no`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY	COMMENT 'PK',
	`id`	VARCHAR(64)	NOT NULL	COMMENT 'UK',
	`title`	VARCHAR(100)	NOT NULL	COMMENT '제목',
	`writer`	VARCHAR(100)	NOT NULL	COMMENT '작성자',
	`content`	TEXT NULL	COMMENT '내용',
	`created_at`	TIMESTAMP	NOT NULL	DEFAULT current_timestamp	COMMENT '등록일자',
	`updated_at`	TIMESTAMP	NOT NULL	DEFAULT current_timestamp	COMMENT '수정일자'
) COMMENT '게시판';


INSERT INTO boards (id, title, writer, content)
SELECT 
  UUID(),
  CONCAT('게시판 샘플 데이터 ', t.num),
  CONCAT('작성자 ', t.num),
  CONCAT('내용 샘플 데이터 ', t.num)
FROM (
  SELECT @row := @row + 1 AS num
  FROM information_schema.tables, (SELECT @row := 0) r
  LIMIT 100
) t;

SELECT * FROM `boards`;