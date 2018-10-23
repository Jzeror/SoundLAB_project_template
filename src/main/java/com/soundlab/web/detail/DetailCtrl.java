package com.soundlab.web.detail;

import java.util.HashMap;
import java.util.Map;

import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
	@RequestMapping("/detilPg/comment/{id}/{pageNo}")
	public @ResponseBody Map<String,Object> albumCmt(
				@PathVariable String pageNo,
				@PathVariable String id){
		logger.info("DetailPgCtrl ::: comment");
		map.clear();
		map.put("pageNum", pageNo);
		map.put("countRow", dm.listComment(id));
		page.carryOut(map);
		Util.log.accept("::Detail albumCmt() :: page ::"+page);
		map.put("keyword", id);
		map.put("page", page);
		
		
		return map;
	}



}
