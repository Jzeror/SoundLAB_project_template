package com.soundlab.web.foryou;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


@Repository
public interface ForYouMapper {
	public List<Object> getForYou();
	public List<Object> getAlbumDetail(String p);
	public void putMusicUp(String p);
	public void putMusicDown(String p);
	public void putGenreUp(String p);
	public void delMusicDown(String p);
	public void delMusicUp(String p);
	public void delGenreUp(String p);
}
