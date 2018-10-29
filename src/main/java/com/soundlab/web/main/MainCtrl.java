package com.soundlab.web.main;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soundlab.web.cmm.Util;




@RestController
@RequestMapping("/main")
public class MainCtrl {
	static final Logger logger = LoggerFactory.getLogger(MainCtrl.class);
	@Autowired Map<String,Object> rm;
	@Autowired MainMapper mp;
	
	@GetMapping("/mainContents")
	public Map<String,Object> mainContents() {
		logger.info("MainCtrl ::: mainContents ");
		rm.clear();
		System.out.println("hash ::: "+mp.getHash());
		rm.put("cnt", mp.getHash());
		
		Calendar cal = Calendar.getInstance();
		 cal.add(Calendar.DATE, -1);
	     rm.put("date1", new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime()));	
		 cal.add(Calendar.DATE, +2);
	     rm.put("date2", new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime()));		    
		 Util.log.accept("date1:: " +rm.get("date1"));
		 Util.log.accept("date2:: " +rm.get("date2"));
		
		System.out.println("chart ::: "+mp.getChart(rm));
		rm.put("top5", mp.getChart(rm));
		
		return rm;
	}
	
	@GetMapping("/hash")
	public Map<String,Object> hash() {
		logger.info("MainCtrl ::: hash ");
		rm.clear();
		System.out.println("hash ::: "+mp.getHash());
		rm.put("cnt", mp.getHash());
		return rm;
	}
	
	@GetMapping("/chart")
	public Map<String,Object> chart() {
		logger.info("MainCtrl ::: chart ");
		rm.clear();
		
		Calendar cal = Calendar.getInstance();
		 cal.add(Calendar.DATE, -1);
	     rm.put("date1", new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime()));	
		 cal.add(Calendar.DATE, +2);
	     rm.put("date2", new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime()));		    
		 Util.log.accept("date1:: " +rm.get("date1"));
		 Util.log.accept("date2:: " +rm.get("date2"));
		
		System.out.println("chart ::: "+mp.getChart(rm));
		rm.put("top5", mp.getChart(rm));
		
		return rm;
	}
	
}
