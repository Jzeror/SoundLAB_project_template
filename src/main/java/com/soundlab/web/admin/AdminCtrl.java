package com.soundlab.web.admin;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminCtrl {
	static final Logger logger = LoggerFactory.getLogger(AdminCtrl.class);
	@Autowired Map<String, Object> m;
	@Autowired AdminMapper mpr;
	
	@GetMapping("/artist/{artist_name}")
	public Map<String, Object> goodStr(@PathVariable String artist_name){
		logger.info("AdminController :: artist");
		System.out.println(artist_name);
		
		m.clear();
		m.put("GS", mpr.artiGS(artist_name));
		System.out.println("GS에 담긴 값"+m.get("GS"));
		return m;
	}
	
	@GetMapping("/pref/ageGenre")
	public Map<String,Object> ageGenre(){
		logger.info("AdminController :: pref : 나이 장르");
		m.clear();
		m.put("AnG",mpr.ageGenre());
		System.out.println("ageGenre에 담긴 값"+m.get("AnG"));
		return m;
	}
	
	@GetMapping("/pref/ageArtist")
	public Map<String, Object> ageArtist(){
		logger.info("AdminController :: pref-나이 아티스트");
		m.clear();
		m.put("AnAKey", mpr.ageArtistK());
		m.put("AnAPivot", mpr.ageArtistPivot());
		logger.info("ageArtist에 담긴 값 ::AnAKey"+m.get("AnAKey"));
		logger.info("ageArtist에 담긴 값 :: AnAPivot"+m.get("AnAPivot"));
		return m;
	}
	
}
