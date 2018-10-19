package com.soundlab.web.music;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.soundlab.web.cmm.Util;



@RestController
@RequestMapping("/music")
public class MusicCtrl {
	static final Logger logger = LoggerFactory.getLogger(MusicCtrl.class);
	@Autowired com.soundlab.web.bean.music music;
	@Autowired MusicMapper musMapper;
	@Autowired HashMap<String, Object> map;
	@GetMapping("/top50/{x}")
	private @ResponseBody List<Map<String, Object>> top50(@PathVariable String x) {
		Util.log.accept(":: MusicCtrl :: list() :: page :: " );
		List<Map<String, Object>> topList = null;
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd"); 

        String todayDate= new SimpleDateFormat("yyyy-MM-dd").format(new Date()); //오늘
        cal.add(Calendar.DATE, -1); //어제
        String yesterDate = new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
        
        cal.add(Calendar.DATE, 1 - cal.get(Calendar.DAY_OF_WEEK)-7); //주간
        String week1 = simpleDateFormat.format(cal.getTime()); 
        cal.add(Calendar.DATE, 7 - cal.get(Calendar.DAY_OF_WEEK)); 
        String week2 = simpleDateFormat.format(cal.getTime()); 

		if(x.equals("realChart") ) {			
			 map.put("todayDate",todayDate);
			 topList = musMapper.realChart(map);			
		}else if (x.equals("dayChart")){
			 map.put("yesterDate",yesterDate);
			 topList = musMapper.dayChart(map);
		}else if (x.equals("weekChart") ){
			 map.put("week1",week1);
			 map.put("week2",week2);
			 topList = musMapper.weekChart(map);
		}
		return topList;
	

		
	}
}
