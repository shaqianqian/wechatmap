package com.wechat.demo.service.impl;


import com.wechat.demo.domain.position;
import com.wechat.demo.dao.PositionRepository;
import com.wechat.demo.service.PositionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
@Slf4j
public class PositionServiceImpl implements PositionService {


    @Autowired
    private PositionRepository repository;
    @PersistenceContext
    private EntityManager entityManager;


    @Override
    @Transactional
    public position findByName(String name) {
        return repository.findByName(name).get(0);
    }




}