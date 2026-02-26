package com.aloha.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aloha.board.domain.Boards;
import com.aloha.board.mapper.BoardMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;

    @Override
    public List<Boards> list() {
        return boardMapper.list();
    }

    @Override
    public Boards select(int no) {
        return boardMapper.select(no);
    }

    @Override
    public Boards selectById(String id) {
        return boardMapper.selectById(id);
    }

    @Override
    public boolean insert(Boards entity) {
        int result = boardMapper.insert(entity);
        return result > 0;
    }

    @Override
    public boolean update(Boards entity) {
        int result = boardMapper.update(entity);
        return result > 0;
    }

    @Override
    public boolean updateById(Boards entity) {
        int result = boardMapper.updateById(entity);
        return result > 0;
    }

    @Override
    public boolean delete(int no) {
        int result = boardMapper.delete(no);
        return result > 0;
    }

    @Override
    public boolean deleteById(String id) {
        int result = boardMapper.deleteById(id);
        return result > 0;    
    }

    @Override
    public PageInfo<Boards> page(int page, int size) {
        PageHelper.startPage(page, size);
        List<Boards> list = boardMapper.list();
        PageInfo<Boards> pageInfo = new PageInfo<>(list);        
        return pageInfo;
    }
}
