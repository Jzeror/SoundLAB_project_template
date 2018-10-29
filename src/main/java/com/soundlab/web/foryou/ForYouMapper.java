package com.soundlab.web.foryou;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


@Repository
public interface ForYouMapper {
	public List<Object> getForYou();
	public List<Object> getAlbumDetail(String p);
	public void putMusicUp(Map<String, Object> p);
	public void putGenreUp(Map<String, Object> p);
}
