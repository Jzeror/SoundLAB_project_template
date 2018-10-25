package com.soundlab.web.main;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface MainMapper {
	public List<Integer> getHash();
	public Map<String,Object> getChart();
}
