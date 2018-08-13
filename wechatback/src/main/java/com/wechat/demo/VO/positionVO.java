package com.wechat.demo.VO;

import lombok.Data;

@Data
public class positionVO {
    private int id;
    private String name;
    private Double longitude;
    private Double latitude;
    private Double distance;


}
