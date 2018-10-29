package com.soundlab.web.tx;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.soundlab.web.foryou.ForYouMapper;

@Service
@Transactional
public class TxService {
	@Autowired ForYouMapper fm;
	public void putMusicUp(Map<String, Object> p) {
		// 음악 좋아요 쿼리, 장르 좋아요 쿼리 트랜잭션
		fm.putMusicUp(p);
		fm.putGenreUp(p);
	}
}
