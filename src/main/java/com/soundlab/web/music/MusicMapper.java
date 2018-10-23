package com.soundlab.web.music;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface MusicMapper {
	 public List<Map<?,?>> realChart(HashMap<?,?> map);
	 public List<Map<?,?>> dayChart(HashMap<?,?> map);
	 public List<Map<?,?>> weekChart(HashMap<?,?> map);
	 public List<Map<?,?>> top50lineChart(HashMap<?,?> map);
}

