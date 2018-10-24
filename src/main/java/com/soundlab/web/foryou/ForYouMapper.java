package com.soundlab.web.foryou;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


@Repository
public interface ForYouMapper {
	public List<Object> getMusic(String p);
	public List<Object> getAlbum();
	public List<Object> getArtist(String p);
}
