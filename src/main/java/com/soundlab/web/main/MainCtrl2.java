package com.soundlab.web.main;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



/*
@RestController
@RequestMapping("/main")
public class MainCtrl2 {
	static final Logger logger = LoggerFactory.getLogger(MainCtrl2.class);
	@Autowired Map<String,Object> rm;
	@Autowired MainMapper2 mp;
	
	@GetMapping("/hash")
	public Map<String,Object> hash() {
		logger.info("MainCtrl ::: hash ");
		rm.clear();
		System.out.println("hash ::: "+mp.getHash());
		rm.put("cnt", mp.getHash());
		return rm;
	}
	
}
*/