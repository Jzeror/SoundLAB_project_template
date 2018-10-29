package com.soundlab.web.tx;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.soundlab.web.dj.ArticleMapper;
import com.soundlab.web.foryou.ForYouMapper;

@Service
@Transactional
public class TxService {
	@Autowired ForYouMapper fm;
	@Autowired ArticleMapper am;
	public void putMusicUp(Map<String, String> p) {
		// 음악 좋아요 쿼리, 장르 좋아요 쿼리 트랜잭션
		String ms = p.get("mSeq");
		fm.putMusicUp(ms);
		fm.putGenreUp(p.get("gSeq"));
		fm.delMusicDown(ms);
	}
	public void delMusicUp(Map<String, String> p) {
		fm.delMusicUp(p.get("mSeq"));
		fm.delGenreUp(p.get("gSeq"));
	}
	public void putMusicDown(Map<String, String> p) {
		String ms = p.get("mSeq");
		fm.putMusicDown(ms);
		fm.delMusicUp(ms);
		fm.delGenreUp(p.get("gSeq"));
	}
	public void putHashView(Map<String, String> p) {
		Map<String, Object> map = new HashMap<>();
		map.put("id", p.get("id"));
		map.put("seq", p.get("t1"));
		am.putHashView(map);
		map.put("seq", p.get("t2"));
		am.putHashView(map);
		map.put("seq", p.get("t3"));
		am.putHashView(map);
		
	}
}
