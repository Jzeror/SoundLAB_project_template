package com.soundlab.web.service;

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
import com.soundlab.web.bean.*;
import com.soundlab.web.service.ServiceCtrl;

import jdk.nashorn.internal.ir.annotations.Reference;


@RestController
@RequestMapping("/service")
public class ServiceCtrl {
	static final Logger logger = LoggerFactory.getLogger(ServiceCtrl.class);
	@Autowired Map<String, Object> map;
	@Autowired ServiceMapper sm;
	@Autowired artist at;
	
	String pl;
	public ServiceCtrl() { pl = ""; }
	@SuppressWarnings("unchecked")
	@GetMapping("/search/{artist}/{id}")
	public @ResponseBody Map<String,Object> search(@PathVariable String artist,@PathVariable String id){
		logger.info("ServiceCtrl ::: search");
		System.out.println("cookieID :: "+id);
		map.clear();
		if(!id.equals("undefined")) {
			map.put("id", id);
		}
		map.put("artist", artist);
		HashMap<String, Object> am = (HashMap<String, Object>) sm.getArtist(map);
		map.put("artist", am);
		String artistSeq = am.get("ARTIST_SEQ").toString();
		
		map.put("artistSeq", artistSeq);
		map.put("musics", sm.getMusicList(map));
		System.out.println("musics:::"+map.get("musics"));
		
		
		map.put("album", sm.getAlbumList(artistSeq));
		map.put("mv", sm.getMvList(artistSeq));
		
		System.out.println("artist::"+am);
		System.out.println("musics:::"+map.get("musics"));
		System.out.println("album:::"+map.get("album"));
		System.out.println("mv:::"+map.get("mv"));
		

		return map;
	}

	
	@GetMapping("/player/music/{musicSeq}")
	public Map<String,Object> playerMusic(@PathVariable String musicSeq){
		logger.info("ServiceCtrl ::: MusicPlayer");
		System.out.println("넘어온 musicSeq::"+musicSeq);
		map.clear();
		map.put("musicSeq", musicSeq);
		
		map.put("musics",sm.getPlayer(map));
		System.out.println("music플레이어::"+map.get("musicSeq"));
		System.out.println("뮤직스::"+map.get("musics"));
		return map;
	}
	@GetMapping("/player/album/{albumSeq}")
	public Map<String,Object> playerAlbum(@PathVariable String albumSeq){
		logger.info("ServiceCtrl ::: AlbumPlayer");
		System.out.println("넘어온  albumSeq::"+albumSeq);
		map.clear();
		map.put("albumSeq",albumSeq);
		map.put("albums", sm.getPlayer(map));
		System.out.println("album플레이어::"+map.get("albumSeq"));
		System.out.println("앨범스::"+map.get("albums"));
		
		return map;
	}
}
