package com.soundlab.web.foryou;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.soundlab.web.tx.TxService;

@RestController
public class ForYouCtrl {
	@Autowired ForYouMapper fm;
	@Autowired TxService ts;
	@RequestMapping("/foryou/{id}")
	public @ResponseBody Map<String, Object> getForYou(@PathVariable String id){
		System.out.println("cookieID :: "+id);
		Map<String, Object> res = new HashMap<>();
		res.put("fy", fm.getForYou());
		System.out.println(res.get("fy"));
		return res;
	}
	@RequestMapping("/foryou/albums/{seq}")
	public @ResponseBody Map<String, Object> getAlbumDt(@PathVariable String seq){
		System.out.println("albumSeq :: "+seq);
		Map<String, Object> res = new HashMap<>();
		res.put("albumDt", fm.getAlbumDetail(seq));
		System.out.println(res.get("albumDt"));
		return res;
	}
	@RequestMapping("/foryou/musicUp/{id}/{seq}")
	public void putUpdown(@PathVariable String id, @PathVariable String seq){
		Map<String, Object> p = new HashMap<>();
		p.put("id", id);
		p.put("seq", seq);
		ts.putMusicUp(p);
	}
	
}
