package com.aloha.board.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.aloha.board.domain.Files;
import com.aloha.board.mapper.FileMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {
    
    private final FileMapper fileMapper;

    @Value("${upload.path}")
    private String uploadPath;      // 업로드 경로

    @Override
    public List<Files> list() {
        return fileMapper.list();
    }

    @Override
    public PageInfo<Files> page(int page, int size) {
        PageHelper.startPage(page, size);
        List<Files> list = fileMapper.list();
        PageInfo<Files> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }

    @Override
    public Files select(int no) {
        return fileMapper.select(no);
    }

    @Override
    public Files selectById(String id) {
        return fileMapper.selectById(id);
    }

    @Override
    public boolean insert(Files entity) {
        int result = fileMapper.insert(entity);
        return result > 0;
    }
    @Override
    public boolean update(Files entity) {
        int result = fileMapper.update(entity);
        return result > 0;
    }

    @Override
    public boolean updateById(Files entity) {
        int result = fileMapper.updateById(entity);
        return result > 0;
    }

    // 파일 시스템의 파일 삭제
    private boolean delete(Files file) {      
        if ( file == null ) {
            log.info("파일이 없습니다.");
            return false;
        }

        String filePath = file.getFilePath();
        File deleteFile = new File(filePath);

        if ( !deleteFile.exists() ) {
            log.error("파일이 존재하지 않습니다.");
            return false;
        }
        
        // 파일 삭제
        boolean deleted = deleteFile.delete();
        if ( deleted ) {
            log.info("파일이 삭제되었습니다: "); 
            log.info("- " + filePath);    
        }
        return true;
    }    

    @Override
    public boolean delete(int no) {
        Files file = fileMapper.select(no);         // 파일정보 조회
        delete(file);                               // 1️⃣ 파일 삭제        
        int result = fileMapper.delete(no);         // 2️⃣ DB 데이터 삭제
        return result > 0;
    }

    @Override
    public boolean deleteById(String id) {
        Files file = fileMapper.selectById(id);     // 파일정보 조회
        delete(file);                               // 1️⃣ 파일 삭제
        int result = fileMapper.deleteById(id);     // 2️⃣ DB 데이터 삭제
        return result > 0;
    }

    @Override
    public boolean upload(Files file) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'upload'");
    }

    @Override
    public int upload(List<Files> fileList) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'upload'");
    }

    @Override
    public boolean download(String id, HttpServletResponse response) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'download'");
    }

    @Override
    public List<Files> listByParent(Files file) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'listByParent'");
    }

    @Override
    public int deleteByParent(Files file) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteByParent'");
    }

    @Override
    public int deleteFiles(String noList) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteFiles'");
    }

    @Override
    public int deleteFilesById(String idList) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteFilesById'");
    }

    @Override
    public int deleteFiles(List<Long> noList) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteFiles'");
    }

    @Override
    public int deleteFilesById(List<String> idList) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteFilesById'");
    }

    @Override
    public Files selectByType(Files file) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'selectByType'");
    }

    @Override
    public List<Files> listByType(Files file) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'listByType'");
    }

}
