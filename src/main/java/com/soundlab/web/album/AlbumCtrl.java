package com.soundlab.web.album;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soundlab.web.cmm.Util;

@RestController
@RequestMapping("/album")
public class AlbumCtrl {
	static final Logger logger = LoggerFactory.getLogger(AlbumCtrl.class);
	@Autowired AlbumMapper alMapper;
	@Autowired HashMap<String, Object> map;
	@GetMapping("/newAl/{x}")
	public List<Map<?,?>> newAl_recent(@PathVariable String x){
		List<Map<?,?>> newAl = null;
		  Util.log.accept("앨범 넘어온값 ::"+x);
		 
		  
		  if(x.equals("newAl_recent")) {
				 newAl=alMapper.newAl_recent();
				  Util.log.accept("앨범 넘어온값 newAl_recent ::"+newAl);
		  }else {
			  newAl=alMapper.newAl_like();
			  Util.log.accept("앨범 넘어온값 newAl_like ::"+newAl);
		  }

		
		
		
		
		return newAl;
		
		
	}
}
