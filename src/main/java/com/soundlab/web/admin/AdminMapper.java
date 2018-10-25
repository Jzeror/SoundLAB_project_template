package com.soundlab.web.admin;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface AdminMapper {
	public List<?> artiGS(String artist_name);
	public List<?> ageGenre();
	public List<?> ageArtist();
	//public List<?> ageArtistPivot();
	public List<?> sexGenre();
	public List<?> sexArtist();
	public int cntNew();
	public List<?> cntVisiter(Map<?,?> p);
}