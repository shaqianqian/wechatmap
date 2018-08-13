package com.wechat.demo.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class position {
    @Id
    @GeneratedValue
    private int id;

    private String name;
    private Double longitude;
    private Double latitude;


    @Override
    public String toString() {
        return "position{" +
                "name='" + name + '\'' +
                ", longitude='" + longitude + '\'' +
                ", latitude='" + latitude + '\'' +
                '}';
    }
}
