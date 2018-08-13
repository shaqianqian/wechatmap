package com.wechat.demo.dao;


import com.wechat.demo.domain.position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;


public interface PositionRepository extends JpaRepository<position, Integer> {

    List<position> findByName(String name);


    @Query(value = "SELECT *, ROUND(6378.138*2*ASIN(SQRT(POW(SIN((?1*PI()/180-latitude*PI()/180)/2),2)+" +
            "COS(?1*PI()/180)*COS(latitude*PI()/180)*POW(SIN((?2*PI()/180-longitude*PI()/180)/2),2)))*1000)" +
            " AS distance FROM position ORDER BY distance LIMIT ?3 ", nativeQuery = true)
    public List<position> findClosestPositions(Double lat, Double lon, Integer quantity_positions);

    @Query(value = "SELECT ROUND(6378.138*2*ASIN(SQRT(POW(SIN((?1*PI()/180-latitude*PI()/180)/2),2)+" +
            "COS(?1*PI()/180)*COS(latitude*PI()/180)*POW(SIN((?2*PI()/180-longitude*PI()/180)/2),2)))*1000)" +
            " AS distance FROM position ORDER BY distance LIMIT ?3 ", nativeQuery = true)
    public List<Double> findClosestDistances(Double lat, Double lon, Integer quantity_positions);


}
