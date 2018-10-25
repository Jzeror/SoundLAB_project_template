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
	@Autowired MusicMapper musMapper;
	@Autowired HashMap<String, Object> map;
	@GetMapping("/top50/{x}")
	private @ResponseBody List<Map<?,?>> top50(@PathVariable String x) {
		Util.log.accept(":: MusicCtrl :: list() :: page :: " );
		List<Map<?,?>> topList = null;
       /* Calendar cal = Calendar.getInstance();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd"); 

        String todayDate= new SimpleDateFormat("yyyy-MM-dd").format(new Date()); //오늘
        cal.add(Calendar.DATE, -1); //어제
        String yesterDate = new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
        
        cal.add(Calendar.DATE, 1 - cal.get(Calendar.DAY_OF_WEEK)-7); //주간
        String week1 = simpleDateFormat.format(cal.getTime()); 
        cal.add(Calendar.DATE, 7 - cal.get(Calendar.DAY_OF_WEEK)); 
        String week2 = simpleDateFormat.format(cal.getTime()); */

		if(x.equals("realChart") ) {
			 Calendar cal = Calendar.getInstance();
			 cal.add(Calendar.DATE, +1);
		     map.put("date1", new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime()));
		     cal.add(Calendar.DATE, -2);
		     map.put("date2", new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime()));	
			 topList = musMapper.realChart(map);			
		}else if (x.equals("weekChart")){
			Calendar cal = Calendar.getInstance();
			 cal.add(Calendar.DATE, 1);
		     map.put("date1", new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime()));
		     cal.add(Calendar.DATE, -7);
		     map.put("date2", new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime()));	
			 topList = musMapper.realChart(map);	
			 Util.log.accept("date1:: " +map.get("date1"));
			 Util.log.accept("date2:: " +map.get("date2"));
		}else if (x.equals("monthChart") ){
			Calendar cal = Calendar.getInstance();
			 cal.add(Calendar.DATE, 1);
		     map.put("date1", new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime()));
		     cal.add(Calendar.DATE, -30);
		     map.put("date2", new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime()));	
			 topList = musMapper.realChart(map);	
			 Util.log.accept("date1:: " +map.get("date1"));
			 Util.log.accept("date2:: " +map.get("date2"));
			 topList = musMapper.monthChart(map);
		}
		
		
		/*for(int i =0; i<21; i++) {
			topList.get(i).get("topList")
		}*/
		return topList;
	}
	
	@GetMapping("/top50lineChart")
	public List<Map<?,?>> top50lineChart() {
		  List<Map<?,?>> chartData = null;
		  Calendar cal = Calendar.getInstance();
		  String todayDate= new SimpleDateFormat("yyyy-MM-dd").format(new Date()); //오늘
		  map.put("todayDate",todayDate);
		  cal.add(cal.DATE, +1); 
	      String chartDate1 = new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
	      map.put("chartDate1",chartDate1);
	      
	      cal.add(cal.DATE, -7); 
	      String chartDate2  = new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
		  map.put("chartDate2",chartDate2);
		  
		  chartData = musMapper.top50lineChart(map);
		
		return chartData;
		
	}
	
	
	
	
	
}
