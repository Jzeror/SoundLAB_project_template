package com.soundlab.web.bean;

import lombok.Data;

@Data
public class comment {
	private String memberId, msg,regidate;
	private int commentSeq,seqGroup;
}
