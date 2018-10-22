package com.soundlab.web.dj;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.soundlab.web.cmm.Util;
import com.soundlab.web.bean.*;


@RestController
public class ArticleCtrl {
	@Autowired ArticleMapper am;
	@RequestMapping("/dj/{hash}")
	public @ResponseBody Map<String, Object> getDj(@PathVariable String hash){
		Map<String, Object> res = new HashMap<>();
		Map<String, Object> p = new HashMap<>();
		if(!hash.equals("first")) {
			String[] hashArr = hash.split(",");
			int count = 1;
			for(String s : hashArr) {
				p.put("t"+(count++), "%"+s+"%");
			}
		}
		res.put("djlist", am.get(p));
		System.out.println(res.get("djlist"));
		return res;
	}
	@RequestMapping("/dj/{seq}/musics")
	public @ResponseBody Map<String, Object> getDetail(@PathVariable String seq){
		Map<String, Object> res = new HashMap<>();
		res.put("mlist", am.getDetail(seq));
		return res;
	}
}
