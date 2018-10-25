package com.soundlab.web.admin;

import java.util.List;
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
		m.put("AA", mpr.ageArtist());
		logger.info("ageArtist에 담긴 값 ::AnAKey"+m.get("AA"));
		
		//m.put("AnAPivot", mpr.ageArtistPivot());
		//logger.info("ageArtist에 담긴 값 :: AnAPivot"+m.get("AnAPivot"));
		return m;
	}
	
	@GetMapping("/pref/sexGenre")
	public Map<String,Object> sexGenre(){
		logger.info("sexGenre 진입");
		m.clear();
		m.put("SG", mpr.sexGenre());
		logger.info("SG에 담긴 값: "+m.get("SG"));
		return m;
	}
	@GetMapping("/pref/sexArtist")
	public Map<String,Object> sexArtist(){
		logger.info("sexArtist 진입");
		m.put("SA", mpr.sexArtist());
		logger.info("SA에 담긴 값: "+m.get("SA"));
		return m;
	}
	@GetMapping("/visit/cntNew")
	public int cntNew() {
		
		return 0;
	}
	/*@GetMapping("/visit/cntVisiter")
	public Map<String, Object> cntVisiter(){
		logger.info("일주일간 방문자 통계");
		m.put("cntV", mpr.cntVisiter());
		logger.info("cntV에 담긴 값:"+m.get("cntV"));
		return m;
	}*/
	@SuppressWarnings("unchecked")
	@GetMapping("/visit/cntVisiter")
	public List<Map<?,?>> cntVisiter(){
		logger.info("일주일간 방문자 통계");
		m.clear();
		m.put("now", "2018-10-25");
		m.put("ago", "2018-10-19");
		List<Map<?,?>> rs = (List<Map<?, ?>>) mpr.cntVisiter(m);
		logger.info("rs에 담긴 값:"+rs);
		return rs;
	}
	
}
