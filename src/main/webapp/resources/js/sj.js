"use strict";
var sj = sj || {};
sj ={
		dj : ()=>{
			if(!($("#djSec").length >0)){   //exist
		
				let $djSec = $('<section/>').attr({id:'djSec'}).appendTo($('#contents'));
				
				$('<div/>').addClass('container').appendTo($djSec).append(
						$('<div/>').addClass('row text-center').append(
								$('<h4/>').attr({'style':'font-weight: bold;'}).addClass('col-xs-offset-3 col-xs-2').html('스타일'),
								$('<h4/>').attr({'style':'font-weight: bold;'}).addClass('col-xs-2').html('상황&장소'),
								$('<h4/>').attr({'style':'font-weight: bold;'}).addClass('col-xs-2').html('감정&기분')
						),
						$('<div/>').addClass('row').append(
								$('<div/>').attr({id : 'hb1','data-toggle':'buttons'}).addClass('col-xs-offset-3 col-xs-2 btn-group-vertical'),
								$('<div/>').attr({id : 'hb2','data-toggle':'buttons'}).addClass('col-xs-2 btn-group-vertical'),
								$('<div/>').attr({id : 'hb3','data-toggle':'buttons'}).addClass('col-xs-2 btn-group-vertical')
						),
						$('<div/>').attr({id:'dj-ls','style':'margin-top: 5rem'}).addClass('container')
				);
				let arr = [
					{at:'1',hash:['신나는','차분한','어쿠스틱','트로피칼','부드러운']},
					{at:'2',hash:['드라이브','휴식','편집숍&카페','헬스','클럽']},
					{at:'3',hash:['스트레스','이별','사랑&고백','새벽감성','위로']}
					];
				$.each(arr,(i,v)=>{
					$.each(v.hash,function(){
						$('<button/>')
						.attr({'style': 'z-index: 0;'})
						.addClass('btn sj-hash-btn')
						.html(this)
						.append(
								$('<input/>')
								.attr({
									type : 'checkbox',
									value : this
								})
						).appendTo($('#hb'+v.at));
					})
				});
				
				$('input[type="checkbox"]').change(function(){
					$('#sj-dj-detail').remove();
					
					let $this = $(this);
					$('input[type="checkbox"]:not(:checked)')
					.parents('button.sj-hash-btn')
					.prop('disabled'
							,($('input[type="checkbox"]:checked').length===3)
								? true : false );
					let s = '';
					let ckHash = $('input[type="checkbox"]:checked');
					for(let i of ckHash){
						s += i.value+',';
					}
					console.log(':: 선택된 해시 :: '+s.slice(0,-1));
					sj.service.dj_pl((s == '')?'first':s.slice(0,-1));
				});
				
				sj.service.dj_pl('first');
				
			}
		},
		
		forYou : ()=>{
			if(!($("#foryouSec").length >0)){   //exist
					let $foryouSec = $('<section/>').attr({id:'foryouSec'});
					$foryouSec.appendTo($('#contents'));
					
					$.getJSON($.ctx()+'/foryou/'+$.cookie("loginID"),d=>{
						
						
						let fmsA = [], fmsB = [], fal = [], fat = [], ald = [];
						let genreA = d.fy[0].msGenreA, genreB = d.fy[0].msGenreB;
						$.each(d.fy,(i,v)=>{
							if(v.msRankA <= 5){
								let u = {
										musicSeq : v.msSeqA,
										musicTitle : v.msTitleA,
										artistSeq : v.msArtistA,
										artistName : v.msArtistNameA,
										albumSeq : v.msAlbumA,
										albumTitle : v.msAlbumTitleA
								}, w = {
										musicSeq : v.msSeqB,
										musicTitle : v.msTitleB,
										artistSeq : v.msArtistB,
										artistName : v.msArtistNameB,
										albumSeq : v.msAlbumB,
										albumTitle : v.msAlbumTitleB
								}, x = {
										albumSeq : v.alSeq,
										albumTitle : v.alTitle,
										artistSeq : v.alArtist,
										artistName : v.alArtistName,
										imgName : v.alImgName,
										ext : v.alImgExt
								}, y = {
										artistSeq : v.atArtistSeq,
										artistName : v.atArtistName,
										imgName : v.atImgName,
										ext : v.atImgExt
								};
								fmsA.push(u);
								fmsB.push(w);
								fal.push(x);
								fat.push(y);
							}
							if(v.mSeq > 0){
								let z = {
										musicSeq : v.musicSeq,
										musicTitle : v.musicTitle,
										artistName : v.artistName,
										albumTitle : v.albumTitle
								};
								ald.push(z);		
							}
						});
						
						
					$('<div/>')
					.addClass('clearfix')
					.attr({id:'for-music', 'style':'margin-bottom:0px;'})
					.append(
							$('<div/>').addClass('container').append(
									$('<div/>').addClass('row').append(
											$('<div/>').addClass('col-xs-12').append(
													$('<div/>').addClass('sj-music-content sj-d-flex sj-flex-wrap').attr({'style':'height:400px'}).append(
															$('<div/>').addClass('sj-music-content-songs sj-h-100').attr({'style':'flex:none; width:100%; max-width:100%;'}).append(
																	$('<div/>').addClass('sj-music-songs-info sj-mb-10 sj-d-flex sj-flex-wrap sj-align-items-center').append(
																			$('<div/>').addClass('sj-songs-info-title').attr({'style':'width:100%;'}).append(
																							$('<div/>').addClass('sj-foryou-switch row')
																							.attr({'style':'margin: 10px 0;'})
																							.append(
																									$('<strong/>').html(genreA),
																									$('<input/>')
																									.attr({id:'genreSwt', type:'checkbox'})
																									.click(function(e){
																										$('input[name=allCheckMusic]:checkbox').prop('checked',false);
																										if($(this).is(':checked')){
																											sj.service.fy_music_li(fmsB);
																										}else{
																											sj.service.fy_music_li(fmsA);
																										}
																									}),
																									$('<label/>').attr({'for':'genreSwt'}),
																									$('<strong/>').html(genreB)
																							)
																			)
																	),
																	$('<div/>').addClass('sj-songs-meta').append(
																			$('<label/>').addClass('check-con').append(
																					$('<input/>').attr({type:'checkbox',name:'allCheckMusic'})
																					.click(function(e){
																						let $this = $(this);
																						$('.sj-music-item .check-con input[name=musicCk]:checkbox').prop('checked',($this.is(':checked')?true:false));
																					}),
																					$('<span/>').addClass('sj-checkmark')
																			),
																			$('<div/>').addClass('sj-fym-title').append($('<p/>').html('제목')),
																			$('<div/>').addClass('sj-fym-artist').append($('<p/>').html('아티스트')),
																			$('<div/>').addClass('sj-fym-album').append($('<p/>').html('아티스트')),
																			$('<button/>').attr({'style':'background-color:#eee;'}).addClass('btn btn-secondary').html('전체듣기')
																			.click(e=>{
																				sj.service.music_player($('.sj-music-item .check-con input[name=musicCk]:checkbox'));
																			}),
																			$('<button/>').attr({'style':'background-color:#eee;'}).addClass('btn btn-secondary').html('선택듣기')
																			.click(e=>{
																				sj.service.music_player($('.sj-music-item .check-con input[name=musicCk]:checkbox:checked'));
																			})
																	),
																	$('<div/>').addClass('sj-music-list-area sj-pl-scroll').attr({id:'fy-music-list','style':'height:60%;'})
															)
													)
											)
									)
							)
					).appendTo($foryouSec);
					
					sj.service.fy_music_li(fmsA);
					
					// for - album
					
					
					$('<div/>')
					.addClass('clearfix')
					.attr({id:'for-album', 'style':'margin-bottom:0px;'})
					.append(
							$('<div/>').addClass('container').append(
									$('<div/>').addClass('row').append(
											$('<div/>').addClass('col-xs-12').append(
													$('<div/>')
													.attr({'style':'padding:2.5rem 0rem 2.5rem 5rem;border:1px solid #EEEEEE;'})
													.addClass('sj-music-content sj-d-flex sj-flex-wrap').append(
															$('<div/>').attr({id:'for-album-li','style':'width:20%;overflow-y:auto;'}),
															$('<div/>').addClass('sj-music-content-songs sj-h-100')
															.attr({id:'for-album-dt', 'style':'flex:0 0 80%;max-width:80%;width:80%;border:none;'})
													)
											)
									)
							)
					).appendTo($foryouSec);
					
					
					/*$('#album-scroll').bind(function(){
						let $this = $(this);
						console.log($this.scrollTop());
						console.log($this.innerHeight());
						console.log($this[0].scrollHeight);
						if($this.scrollTop() + $this.innerHeight() >= $this[0].scrollHeight){
							console.log('Scroll End');
						}
					});*/
					
					
					let $li = $('<div/>').addClass('list-group').attr({'style':'margin:0;'}).appendTo('#for-album-li');
					
					$.each(fal,(i, v)=>{
						$('<div/>')
						.addClass('sj-for-album-item sj-bg-img')
						.attr({'style':'background-image:url('+$.ctx()+'/resources/img/album/'+v.imgName+'.'+v.ext+');'})
						.append(
								$('<div/>').addClass('sj-for-album-eff').append(
										$('<h4/>').html(v.albumTitle),
										$('<h6/>').html(v.artistName)
								)
						)
						.appendTo($li)
						.click(function(e){
							let $this = $(this);
							$this.siblings('.sj-for-album-item.active').removeClass('active');
							$this.addClass('active');
							$.getJSON($.ctx()+'/foryou/albums/'+v.albumSeq,d=>{
								sj.service.fy_album_dt(d.albumDt);
							})
						});
					});
					
					$('.sj-for-album-item:first').addClass('active');
					
					sj.service.fy_album_dt(ald);
					
					
					
					// for - artist
					
					$('<div/>')
					.addClass('clearfix')
					.attr({id:'for-album-dt', 'style':'margin-bottom:0px;'})
					.append(
							$('<div/>').addClass('container').append(
									$('<div/>').addClass('row').append(
											$('<div/>').addClass('col-xs-12').append(
													$('<div/>')
													.attr({'style':'padding:5rem;align-items:center;border:1px solid #EEEEEE;'})
													.addClass('sj-music-content sj-d-flex sj-flex-wrap').append(
															$('<div/>').attr({id:'for-artist'}).addClass('accordian')
													)
											)
									)
							)
					).appendTo($foryouSec);
											
					
					let $accUl = $('<ul/>').appendTo($('#for-artist'));
					$.each(fat,(i,v)=>{
						$('<li/>').append(
								$('<div/>')
								.addClass('sj-bg-img')
								.attr({'style':'background-image:url('+$.ctx()+'/resources/img/artist/'+v.imgName+'.'+v.ext+');'}),
								$('<div/>').addClass('sj-acc-img-cnt').html(v.artistName)
						).appendTo($accUl);
					});
					
				});
			}
		}
};

sj.service = {
		dj_pl : x=>{
			$('#sj-dj-csl').remove();
			$.getJSON($.ctx()+'/dj/'+x, d=>{
				
				$('<div/>')
				.attr({id:'sj-dj-csl'})
				.addClass('container').append(
						$('<div/>').addClass('row').append(
								$('<div/>')
								.addClass('col-xs-12 sj-dj-carousel').append(
										$('<h2/>').attr('style','margin-left: 1.2rem;').addClass('my-4').html('DJ PLAYLIST'),
										$('<div/>').attr({id : 'djCarousel'}).addClass('carousel slide')
								).on('click','.sj-dj-item',function(e){
									
									$('#djCarousel').carousel('pause');
									
									let $this = $(this);
									
									if($this.find('h4').text() != $('#sj-dt-container .sj-songs-info-title>h4').text()){
										$('#sj-dj-detail').empty();
										sj.service.dj_pld($this.attr('id'));
										$.getJSON($.ctx()+'/dj/hashs/'+$.cookie('loginID')+'/'+$this.children('label').html());
									}else{
										$('#sj-dj-detail').remove();
									}
									
								})
						)
				).appendTo($('#djSec'));
				
				let djArr = d.djlist; 
				console.log('carousel length :: '+djArr.length);
				
				if(djArr.length >= 3){
					let $item = $('<div/>').addClass('carousel-inner').appendTo($('#djCarousel'))
					
					$.each(djArr,(i,v)=>{
						$('<div/>')
						.addClass('item'+((i===0)?' active':'')).append(
								$('<div/>')
								.attr({id:v.articleSeq})
								.addClass('col-md-4 col-sm-6 col-xs-12 sj-dj-item').append(
										$('<label/>').attr({'style':'display:none;'}).html(v.hash),
										$('<div/>')
										.addClass('sj-bg-img img-responsive')
										.attr({
											'style':'height:100%;background-image: url('+$.ctx()+'/resources/img/'+v.imgName+'.'+v.ext+');'
										}),
										$('<div/>').addClass('sj-dj-item-content').append(
												$('<div/>').addClass('sj-dj-content-txt').append(
														$('<h4/>').html(v.title),
														$('<p/>').html(v.memberId),
														$('<p/>').html(v.hashtag),
														$('<div/>').addClass('bg-gradients')
												)
										)
								)
						).appendTo($item);
					});
					
					$('<a/>')
					.attr({href:'#djCarousel', 'data-slide':'prev'})
					.addClass('left carousel-control')
					.append(
							$('<i/>').addClass('glyphicon glyphicon-chevron-left')
					).appendTo($('#djCarousel'));
					$('<a/>')
					.attr({href:'#djCarousel', 'data-slide':'next'})
					.addClass('right carousel-control')
					.append(
							$('<i/>').addClass('glyphicon glyphicon-chevron-right')
					).appendTo($('#djCarousel'));
					
				}else{
					
					$('#djCarousel').removeClass('carousel slide');
					let $item = $('<div/>').appendTo($('#djCarousel'))
					
					$.each(djArr,(i,v)=>{
						$('<div/>').append(
								$('<div/>')
								.attr({id:v.articleSeq})
								.addClass('col-md-4 col-sm-6 col-xs-12 sj-dj-item').append(
										$('<div/>')
										.addClass('sj-bg-img img-responsive')
										.attr({
											'style':'height:100%;background-image: url('+$.ctx()+'/resources/img/'+v.imgName+'.'+v.ext+');'
										}),
										$('<div/>').addClass('sj-dj-item-content').append(
												$('<div/>').addClass('sj-dj-content-txt').append(
														$('<h4/>').html(v.title),
														$('<p/>').html(v.memberId),
														$('<p/>').html(v.hashtag),
														$('<div/>').addClass('bg-gradients')
												)
										)
								)
						).appendTo($item);
					});
					
				}
				
				// Carousel jqeury
				
				$('#djCarousel .carousel-control').click(e=>{
					$('#djCarousel').carousel('cycle');
				});
				$('#djCarousel').carousel({
					  interval: 4000
					})
				$('#djCarousel .item').each(function(){
				  var next = $(this).next();
				  if (!next.length) {
				    next = $(this).siblings(':first');
				  }
				  next.children(':first-child').clone().appendTo($(this));

				  if (next.next().length>0) {
				    next.next().children(':first-child').clone().appendTo($(this));
				  }
				  else {
				    $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
				  }
				});
				
			}); // getJSON end
			
		},
		dj_pld : x=>{
			
			if(!$('#djSec').has('div[id=sj-dj-detail]').length) $('<div/>').attr({id:'sj-dj-detail'}).appendTo($('#djSec'));
			
			$.getJSON($.ctx()+'/dj/'+x+'/musics/'+$.cookie("loginID"), d=>{
				
				let djInfo = d.mlist[0];
				$('<div/>')
				.addClass('sj-padding-5r clearfix')
				.attr({id:'sj-dt-container', 'style':'margin-bottom:0px;'})
				.append(
						$('<div/>').addClass('container').append(
								$('<div/>').addClass('row').append(
										$('<div/>').addClass('col-xs-12').append(
												$('<div/>').addClass('sj-music-content sj-d-flex sj-flex-wrap').append(
														$('<div/>')
														.addClass('sj-music-content-img sj-h-100 sj-bg-img')
														.attr({'style':'background-image: url('+$.ctx()+'/resources/img/'+djInfo.imgName+'.'+djInfo.ext+');'}),
														$('<button/>').addClass('close')
														.attr({'aria-label':'Close','style':'position: absolute; right: 5px; z-index: 11; color:#383A3F; font-size:2.5em'})
														.html('<span aria-hidden="true">&times;</span>')
														.click(e=>{
															$('#sj-dj-detail').remove();
														}),
														$('<div/>').addClass('sj-music-content-songs sj-h-100').append(
																$('<div/>').addClass('sj-music-songs-info sj-mb-10 sj-d-flex sj-flex-wrap sj-align-items-center sj-justify-content-between').append(
																		$('<div/>').addClass('sj-songs-info-title').append(
																				$('<h4/>').html(djInfo.title),
																				$('<h6/>').html(djInfo.memberId),
																				$('<h6/>').html(djInfo.hashtag)
																		)
																),
																$('<div/>').addClass('sj-songs-meta').append(
																		$('<label/>').addClass('check-con').append(
																				$('<input/>').attr({type:'checkbox',name:'allCheck'})
																				.click(function(e){
																					let $this = $(this);
																					$('.sj-music-item .check-con input:checkbox').prop('checked',($this.is(':checked')?true:false));
																				}),
																				$('<span/>').addClass('sj-checkmark')
																		),
																		$('<div/>').addClass('sj-dj-meta-title').append($('<p/>').html('제목')),
																		$('<div/>').addClass('sj-dj-meta-artist').append($('<p/>').html('아티스트')),
																		$('<button/>').addClass('btn btn-secondary').html('전체듣기')
																		.click(e=>{
																			sj.service.music_player($('.sj-music-item .check-con input:checkbox'));
																		}),
																		$('<button/>').addClass('btn btn-secondary').html('선택듣기')
																		.click(e=>{
																			sj.service.music_player($('.sj-music-item .check-con input:checkbox:checked'));
																		})
																),
																$('<div/>').addClass('sj-music-list-area sj-pl-scroll').attr({id:'dj-playlist-d'})
														)
												)
										)
								)
						)
				).appendTo($('#sj-dj-detail'));
				
				
				let $pl = $('<div/>').addClass('sj-music-playlist').appendTo($('#dj-playlist-d'));
				
				$.each(d.mlist,(i, v)=>{
					$('<div/>').addClass('single-music').append(
							$('<div/>').addClass('sj-music-item').append(
									$('<label/>').addClass('check-con').append(
											$('<input/>').attr({type:'checkbox', value:v.musicSeq, name:'musicCk'})
											.click(e=>{
												$('.check-con input[name=allCheck]:checkbox')
												.prop('checked',
														$('.sj-music-item .check-con input:checkbox').length
																=== $('.sj-music-item .check-con input:checked').length
																? true : false);
											}),
											$('<span/>').addClass('sj-checkmark')
									),
									$('<div/>').addClass('sj-dj-meta-title sj-text-crop').append($('<span/>').html(v.musicTitle)),
									$('<div/>').addClass('sj-dj-meta-artist sj-text-crop').append($('<span/>').html(v.artistName)),
									$('<div/>').addClass('btn-group').append(
											$('<button/>').addClass('btn ').append(
													$('<span/>').addClass('glyphicon glyphicon-play')
											).click(e=>{
												jt.player(v.musicSeq);
											}),
											$('<button/>').addClass('btn '+((v.type == 'u')?'active':'')).append(
													$('<span/>').addClass('glyphicon glyphicon-heart')
											).click(function(e){
												let $this = $(this);
												if($this.hasClass('active')){
													$this.removeClass('active');
													if($.cookie("loginID")=='sound') $.getJSON($.ctx()+'/foryou/delML/'+v.musicSeq+'/'+v.genreSeq);
												}else{
													$this.addClass('active');
													if($this.siblings().hasClass('active')) $this.siblings().removeClass('active');
													if($.cookie("loginID")=='sound') $.getJSON($.ctx()+'/foryou/putML/'+v.musicSeq+'/'+v.genreSeq);
												} 
											}),
											$('<button/>').addClass('btn '+((v.type == 'd')?'active':'')).append(
													$('<span/>').addClass('glyphicon glyphicon-thumbs-down')
											).click(function(e){
												let $this = $(this);
												if($this.hasClass('active')){
													$this.removeClass('active');
													if($.cookie("loginID")=='sound') $.getJSON($.ctx()+'/foryou/delMH/'+v.musicSeq);
												}else{
													$this.addClass('active');
													if($this.siblings().hasClass('active')){
														if($.cookie("loginID")=='sound') $.getJSON($.ctx()+'/foryou/putMH/'+v.musicSeq+'/'+v.genreSeq);
														$this.siblings().removeClass('active');
													}else{
														if($.cookie("loginID")=='sound') $.getJSON($.ctx()+'/foryou/putMH/'+v.musicSeq);
													}
												} 
											})
									)
							)
					).appendTo($pl)
				});
			}); // getJSON end
		},
		fy_album_dt : x=>{
			$('#for-album-dt').empty();
			
			$('<div/>').addClass('sj-music-songs-info sj-mb-10 sj-d-flex sj-flex-wrap sj-align-items-center sj-justify-content-between').append(
					$('<div/>').addClass('sj-songs-info-title').append(
							$('<h4/>').html(x[0].albumTitle),
							$('<h6/>').html(x[0].artistName)
					)
			).appendTo($('#for-album-dt'));
			$('<div/>').addClass('sj-songs-meta').append(
					$('<label/>').addClass('check-con').append(
							$('<input/>').attr({type:'checkbox',name:'allCheckAlbumDt'})
							.click(function(e){
								let $this = $(this);
								$('.sj-music-item .check-con input[name=albumCk]:checkbox').prop('checked',($this.is(':checked')?true:false));
							}),
							$('<span/>').addClass('sj-checkmark')
					),
					$('<div/>').addClass('sj-meta-title').append($('<p/>').html('제목')),
					$('<div/>').addClass('sj-meta-artist').append($('<p/>').html('아티스트')),
					$('<button/>').addClass('btn btn-secondary').html('전체듣기')
					.click(e=>{
						sj.service.music_player($('.sj-music-item .check-con input[name=albumCk]:checkbox'));
					}),
					$('<button/>').addClass('btn btn-secondary').html('선택듣기')
					.click(e=>{
						sj.service.music_player($('.sj-music-item .check-con input[name=albumCk]:checkbox:checked'));
					})
			).appendTo($('#for-album-dt'));
			
			$('<div/>').addClass('sj-music-list-area sj-pl-scroll').attr({id:'fy-al-dtmusic'}).appendTo($('#for-album-dt'));
			
			let $pl = $('<div/>').addClass('sj-music-playlist').appendTo($('#fy-al-dtmusic'));
			
			$.each(x,(i,v)=>{
				
				$('<div/>').addClass('single-music').append(
						$('<div/>').addClass('sj-music-item row').append(
								$('<label/>').addClass('check-con').append(
										$('<input/>').attr({type:'checkbox',name:'albumCk',value:v.musicSeq}).click(e=>{
											$('.check-con input[name=allCheckAlbumDt]:checkbox')
											.prop('checked',
													$('.sj-music-item .check-con input[name=albumCk]:checkbox').length
															=== $('.sj-music-item .check-con input[name=albumCk]:checked').length
															? true : false);
										}),
										$('<span/>').addClass('sj-checkmark')
								),
								$('<div/>').addClass('col-xs-4 sj-text-crop').append($('<p/>').html(v.musicTitle)),
								$('<div/>').addClass('col-xs-2 sj-text-crop').append(
										$('<p/>').html(v.artistName)
								),
								$('<div/>').addClass('col-xs-2 sj-text-crop').append($('<p/>').html(v.albumTitle)),
								$('<div/>').addClass('btn-group col-xs-3').append(
										$('<button/>').addClass('btn btn-default').append(
												$('<span/>').addClass('glyphicon glyphicon-play')
										).click(e=>{
											jt.player(v.musicSeq);
										}),
										$('<button/>').addClass('btn btn-default').append(
												$('<span/>').addClass('glyphicon glyphicon-heart')
										).click(function(e){
											if($(this).hasClass('active')){
												$(this).removeClass('active');
											}else{
												$(this).addClass('active');
											} 
										}),
										$('<button/>').addClass('btn btn-default').append(
												$('<span/>').addClass('glyphicon glyphicon-thumbs-down')
										)
								)
						)
				).appendTo($pl)
			});
		},
		fy_music_li : x=>{
			$('#fy-music-list').empty();
				
			let $pl = $('<div/>').addClass('sj-music-playlist').appendTo($('#fy-music-list'));
			$.each(x,(i,v)=>{
				
				$('<div/>').addClass('single-music').append(
						$('<div/>').addClass('sj-music-item row').append(
								$('<label/>').addClass('check-con').append(
										$('<input/>').attr({type:'checkbox',name:'musicCk',value:v.musicSeq}).click(e=>{
											$('.check-con input[name=allCheckMusic]:checkbox')
											.prop('checked',
													$('.sj-music-item .check-con input[name=musicCk]:checkbox').length
															=== $('.sj-music-item .check-con input[name=musicCk]:checked').length
															? true : false);
										}),
										$('<span/>').addClass('sj-checkmark')
								),
								$('<div/>').addClass('sj-fym-title sj-text-crop').append($('<p/>').html(v.musicTitle)),
								$('<div/>').addClass('sj-fym-artist sj-text-crop').append(
										$('<p/>').html(v.artistName)
								),
								$('<div/>').addClass('sj-fym-album sj-text-crop').append($('<p/>').html(v.albumTitle)),
								$('<div/>').addClass('btn-group').append(
										$('<button/>').addClass('btn').append(
												$('<span/>').addClass('glyphicon glyphicon-play')
										).click(e=>{
											jt.player(v.musicSeq);
										}),
										$('<button/>').addClass('btn').append(
												$('<span/>').addClass('glyphicon glyphicon-heart')
										).click(function(e){
											if($(this).hasClass('active')){
												$(this).removeClass('active');
											}else{
												$(this).addClass('active');
											} 
										}),
										$('<button/>').addClass('btn').append(
												$('<span/>').addClass('glyphicon glyphicon-thumbs-down')
										)
								)
						)
				).appendTo($pl)
			
			});
			
		},
		music_player:x=>{
			let seqs = '';
			$.each(x,(i,v)=>{
				seqs += v.value + ((i < x.length-1)?',':'');
			});
			console.log(seqs);
			jt.player(seqs);
		}
};


