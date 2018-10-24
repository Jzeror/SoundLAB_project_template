package com.soundlab.web.admin;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface AdminMapper {
	public List<?> artiGS(String s);
	public List<?> ageGenre();
	public List<?> ageArtistK();
	public List<?> ageArtistPivot();

}