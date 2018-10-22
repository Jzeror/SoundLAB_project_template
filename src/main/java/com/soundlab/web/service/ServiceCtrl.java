package com.soundlab.web.service;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.soundlab.web.bean.*;
import com.soundlab.web.service.ServiceCtrl;


@RestController
@RequestMapping("/service")
public class ServiceCtrl {
	static final Logger logger = LoggerFactory.getLogger(ServiceCtrl.class);
	@Autowired Map<String, Object> map;
	@Autowired ServiceMapper sm;
	@Autowired artist at;
	
	
	@SuppressWarnings("unchecked")
	@GetMapping("/search/{artist}")
	public Map<String,Object> search(@PathVariable String artist){
		logger.info("ServiceCtrl ::: search");
		map.clear();
		HashMap<String, Object> am = (HashMap<String, Object>) sm.getArtist(artist);
		System.out.println("am에 담긴것::"+am);
		String artistSeq = am.get("ARTIST_SEQ").toString();
		
		map.put("artist", am);
		map.put("musics", sm.getMusicList(artistSeq));
		map.put("album", sm.getAlbumList(artistSeq));
		map.put("mv", sm.getMvList(artistSeq));
		System.out.println("artist::"+am);
		System.out.println("album:::"+map.get("album"));
		System.out.println("musics:::"+map.get("musics"));
		System.out.println("mv:::"+map.get("mv"));
		

		return map;
	}

	
	@GetMapping("/player")
	public Map<String,Object> player(){
		logger.info("ServiceCtrl ::: player");
		return map;
	}
}
