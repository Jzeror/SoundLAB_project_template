package com.soundlab.web.detail;

import java.util.Map;

import org.aspectj.lang.annotation.RequiredTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.soundlab.web.bean.comment;
import com.soundlab.web.cmm.Util;
import com.soundlab.web.page.Pagination;
import com.soundlab.web.service.ServiceCtrl;

@RestController
@RequestMapping("/detailPg")
public class DetailCtrl {
	static final Logger logger = LoggerFactory.getLogger(ServiceCtrl.class);
	@Autowired Map<String,Object> map;
	@Autowired DetailMapper dm;
	@Autowired Pagination page;
	@Autowired comment cmt;
	
	
	@GetMapping("/detail/{albumSeq}")
	public Map<String,Object> detail(@PathVariable String albumSeq){
		logger.info("DetailPgCtrl ::: detail");
		map.clear();
		
		map.put("album", dm.getAlbum(albumSeq));
		map.put("musics", dm.getAlbumMusic(albumSeq));
		System.out.println("앨범정보::"+map.get("album"));
		System.out.println("musics::"+map.get("musics"));;
	
		return map;
	}
	@PostMapping("/write")
	public void albumComment(@RequestBody Map<String,Object> am){
		logger.info("DetailPgCtrl ::: write");
		System.out.println(am);
		
		map.clear();
		map.put("memberId", am.get("memberId"));
		map.put("seqGroup", am.get("seqGroup"));
		map.put("msg", am.get("msg"));
		System.out.println("Map::"+map);
		
		dm.create(map);
		
		
		
	}



}
