package com.wechat.demo.converter;

import com.wechat.demo.VO.positionVO;
import com.wechat.demo.domain.position;

import java.util.ArrayList;
import java.util.List;

public class Position2PositionVO {

    public static positionVO convert(position p, double distance) {

        positionVO pvo = new positionVO();
        pvo.setId(p.getId());
        pvo.setLatitude(p.getLatitude());
        pvo.setDistance(distance);
        pvo.setLongitude(p.getLongitude());
        pvo.setName(p.getName());
        return pvo;


    }
    public static List<positionVO> convert(List<position> positions, List<Double> distances) {
        List<positionVO> positionsVO=new ArrayList<positionVO>();
       for(int i=0;i<positions.size();i++){
           positionsVO.add(convert(positions.get(i),distances.get(i)));

       }

    return positionsVO;
    }


}
