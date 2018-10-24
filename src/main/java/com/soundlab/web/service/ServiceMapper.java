package com.soundlab.web.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.soundlab.web.bean.*;

@Repository
public interface ServiceMapper {
	public Map<?,?> getArtist(String artist);
	public List<music> getMusicList(String music);
	public List<?> getAlbumList(String album);
	public List<?> getMvList(String mv);
	
}
