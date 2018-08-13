package com.wechat.demo.controller;



import com.wechat.demo.VO.positionVO;
import com.wechat.demo.converter.Position2PositionVO;
import com.wechat.demo.domain.position;
import com.wechat.demo.dao.PositionRepository;
import com.wechat.demo.service.PositionService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
//@RequestMapping("/wechat")
@Slf4j
public class positionController {

     @Autowired
    PositionRepository positionRepository;
    @Autowired
    PositionService positionService;
    @GetMapping("/")
    public String authorize() {

        return "welcome to our application";
    }
   @GetMapping("/auto")
    public String authorize(@RequestParam("lat") Double lat,
                            @RequestParam("lon") Double lon,
                            @RequestParam("name") String name) {
        position p=new position();
        p.setLatitude(lat);
        p.setLongitude(lon);
        p.setName(name);
//        positionRepository.save(p);
        return "you have find the user successfully "+p;
    }
    @GetMapping("/getall")
        public List<position> getAll() {
        return positionRepository.findAll();
    }


    @GetMapping("/findByName")
    public position findByName(@RequestParam("name") String name) {

        return positionRepository.findByName(name).get(0);

    }//为后期分类做准备
    @GetMapping("/findClosestPositions")
    public  List<positionVO> findClosestPositions(@RequestParam("lat") Double lat, @RequestParam("lon") Double lon, @RequestParam("quantitypositions") Integer quantitypositions ) {
        List<position> cloestPositions=positionRepository.findClosestPositions(lat,lon,quantitypositions);
        List<Double>  closetDistance=positionRepository.findClosestDistances(lat,lon,quantitypositions);


       List<positionVO> positionsVO= Position2PositionVO.convert(cloestPositions,closetDistance);;
        return positionsVO;
    }


}
