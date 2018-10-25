package com.soundlab.web.foryou;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ForYouCtrl {
	@Autowired ForYouMapper fm;
	@RequestMapping("/foryou/{id}")
	public @ResponseBody Map<String, Object> getMusic(@PathVariable String id){
		System.out.println("cookieID :: "+id);
		Map<String, Object> res = new HashMap<>();
		System.out.println(fm.getMusic(id));
		System.out.println(fm.getAlbum());
		System.out.println(fm.getArtist(id));
		res.put("mList", fm.getMusic(id));
		res.put("alList", fm.getAlbum());
		res.put("atList", fm.getArtist(id));
		return res;
	}
}
