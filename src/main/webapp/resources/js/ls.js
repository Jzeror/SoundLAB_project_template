"use strict";
var ls = ls || {};
ls ={
		chart :x=>{
			$.getJSON(sh.ctx()+'/music/top50/'+x,d=>{
				
				 if(!($("#chartSec").length >0)){ 
						let $chartSec = $('<section/>').attr({id:'chartSec'});
						$chartSec.appendTo($('#contents'))
								// Top100 헤더
								$('<div/>').addClass("ls_char_panel_top Panel panel-dafalt container").append(
										$('<h1/>').html('TOP 100')
								).appendTo($chartSec);
								// 차트
								$('<div/>').attr({id :'chart_title'}).addClass("container").appendTo($chartSec);
								$('<div/>').addClass("ls_lineCh Panel panel-dafalt container").append(
										 
										 $('<div/>').attr({id :'line_top_x'})
								).appendTo($chartSec);
								//nav-sort
								$('<br><br><div/>').attr({id : 'chart-content' }).addClass("ls_char_panel panel panel-dafalt container").append(
										$('<div/>').append(
												 $('<ul/>').addClass("ls_chart_nav nav nav-tabs nav-justified").append(
														 $('<li/>').append(
																 $('<a/>').attr({id : 'liveChr'}).html('실시간'))
																 .click(()=>{ 
																	 alert('liveChr click');
																	 let realChart = 'realChart';
																		$.getJSON(sh.ctx()+'/music/top50/'+realChart,d=>{
																			$('#topTable').empty();
																			 ls.top50table(d);
																	 })
																	 
																 }),
														 $('<li/>').append(
																 $('<a/>').attr({id : 'wklChr'}).html('주간'))
																 .click(()=>{ 
																	 alert('wklChr click'); 
																	 	let weekChart = 'weekChart';
																		$.getJSON(sh.ctx()+'/music/top50/'+weekChart,d=>{
																			$('#topTable').empty();
																			 ls.top50table(d);
																	 })
																	 }),
														 $('<li/>').append(
																$('<a/>').attr({id : 'monthChr'}).html('월간'))
																.click(()=>{ 
																	alert('dayChr click'); 
																	 let monthChart = 'monthChart';
																		$.getJSON(sh.ctx()+'/music/top50/'+monthChart,d=>{
																			$('#topTable').empty();
																			 ls.top50table(d);
																	 })
																	})

												 )
										)
								).appendTo($chartSec);

								$('<div/>').attr({id : 'chart-top50' }).addClass("ls_char_panel Panel panel-dafalt container")
								.appendTo($chartSec);
						
									$('<div/>').attr({id :'ls_panel'}).addClass("ls_char_panel panel panel-default").append(
										
													$('<div/>').addClass("pull-left").attr({id :'pull-left'}).append(
															$('<div/>').addClass("btn-group").append(
																	$('<button/>').attr({id : 'listenChoose'})
																	.addClass("btn btn-default btn-filter").html('선택듣기')
																	.click(()=>{ 
																		 alert('listenChoose click'); 
																		 
																	 }),
																	$('<button/>').attr({id : 'listenAll'})
																	.addClass("btn btn-default btn-filter").html('전체듣기')
																	.click(()=>{ 
																	 alert('listenAll click'); 
																	 
																	 }),
																	$('<button/>').attr({id : 'addToList'})
																	.addClass("btn btn-default btn-filter").html('담기')
																	.click(()=>{ 
																		 alert('addToList click'); 
																		 
																		 })
															)
											)
					).appendTo($('#chart-top50')),
					
					ls.top50table(d),

					$('#allCheck').click(()=>{
		                if($('#allCheck').is(':checked')){
		                    $('input[name = chkBox]:checkbox').prop('checked',true);
		                }else{
		                    $('input[name = chkBox]:checkbox').prop('checked',false);
		                }
		            })
		            
		            //-------------차트-----------------
		           $.getJSON(sh.ctx()+'/music/top50lineChart',d=>{				
							 	google.charts.load('current', {'packages':['line']});
					 			google.charts.setOnLoadCallback(drawChart);
							    function drawChart() {
							    	  var data = new google.visualization.DataTable();
							    	  
							          data.addColumn('number', 'Day');
						        	  data.addColumn('number', d[0].ARTIST_NAME+'/'+d[0].MUSIC_TITLE);
							          data.addColumn('number', d[1].ARTIST_NAME+'/'+d[1].MUSIC_TITLE);
							          data.addColumn('number', d[2].ARTIST_NAME+'/'+d[2].MUSIC_TITLE);
							          
							          
							          for(let i=0; i <18; i=i+3){	
							          data.addRows([
							            [d[i].VIEW_DATE*1,  d[i].PER, d[i+1].PER, d[i+2].PER],
							            [d[i+1].VIEW_DATE*1,  d[i].PER, d[i+1].PER, d[i+2].PER],
							            [d[i+2].VIEW_DATE*1,  d[i].PER, d[i+1].PER, d[i+2].PER]
							          ]);
							          }
							         
							          
							          let options = {
							        	      
							        	        subtitle: '현재시간 : '+new Date().toLocaleString(),
							        	        fontSize : 20,
							        	        width: 1100,
							        	        height: 350,
							        	   
							        	        axes: {
							        	          x: {
							        	            0: {side: 'bottom'}
							        	          }
							        	        }
							        	      };
							          
							          
							          var chart = new google.charts.Line(document.getElementById('line_top_x'));

							          chart.draw(data, google.charts.Line.convertOptions(options));
							  }		
							    $('<div/>').append(
										$('<div/>').addClass('ls_fa-line-chart fa fa-line-chart').html('실시간 점유율'),
										$('<div/>').addClass('rank_time').append(
												$('<ul/>').append(
														$('<li/>').addClass('lank01').append(
																$('<span/>').addClass('none').html('1위'),
																$('<em/>').html(d[0].PER+'%')
																
														),
														$('<li/>').addClass('lank02').append(
																$('<span/>').addClass('none').html('2위'),
																$('<em/>').html(d[1].PER+'%')
														),
														$('<li/>').addClass('lank03').append(
																$('<span/>').addClass('none').html('3위'),
																$('<em/>').html(d[2].PER+'%')
														)
												)
										)
								).appendTo('#chart_title');
					})
					
					
					}
	        	});
		},
				
		album :x=>{
		
			$.getJSON($.ctx()+'/album/newAl/'+x,d=>{
				if(!($("#albumSec").length >0)){ 
					let $albumSec = $('<section/>').attr({id:'albumSec'});
					$albumSec.appendTo($('#contents'))
							// 앨범헤더
							$('<div/>').addClass("ls_album_panel container").append(
									$('<h1/>').html('최신앨범')
							).appendTo($albumSec);
							// 앨범 캐러셀
							$('<div/>').addClass('container').append(
									$('<div/>').addClass('row').append(
											$('<div/>').addClass('col-xs-12').append(
													$('<h2/>').attr('style','margin-left: 1.2rem;').addClass('my-4'),
													$('<div/>').attr({id : 'alCarousel'}).addClass('carousel slide ls_featured-shows-slides')
											
											)
									)
							).appendTo($albumSec);
							ls.alCarousel();
							
							// 앨범 정렬
							$('<br><br><div/>').attr({id : 'album-content' }).addClass("ls_album_panel container").append(
									$('<div/>').append(
											 $('<ul/>').addClass("ls_album_nav nav nav-tabs nav-justified").append(
													 $('<li/>').attr({id : 'ali1'}).append(
															 $('<a/>').attr({href:'#',id : 'ls_alDateSort'}).html('발매일'))
														.click(()=>{ 
																 	alert('발매일 click'); 
																	$.getJSON(sh.ctx()+'/album/newAl/'+'newAl_recent',d=>{
																	
																		ls.new_alList(d);
																	})
									 
															 }),
													 $('<li/>').attr({id : 'ali2'}).append(
															 $('<a/>').attr({href:'#', id : 'ls_alUpSort'}).html('좋아요'))
															 .click(()=>{ 
																 alert('좋아요 click'); 
																 $.getJSON(sh.ctx()+'/album/newAl/'+'newAl_like',d=>{
																		ls.new_alList(d);
																	})
																 	
															 })		
											 )
									)
							).appendTo($albumSec);
							
							
							//컨텐츠
							$('<div/>').attr({id : 'album-Table' }).addClass("ls_album_panel container").append(
									$('<div/>').attr({id : 'ls_newAlLe'}),
									$('<div/>').attr({id : 'ls_newAlRi'})
									
							
							).appendTo($albumSec);
							
							ls.new_alList(d);
							ls.al_comments();
							$('<div/>').attr({id : 'morePage'}).addClass("ls_album_panel container").append(
									$('<button/>').attr({id : 'al_morePage'}).addClass("btn btn-brand btn-primary").html('더보기')
									.click(()=>{ 
									 alert('al_morePage click'); 
									 
									 })		
							).appendTo($albumSec);
					
		
			}
			})
			
			
			
			
			
			
		},
		
		
	
		 top50table :d=>{
				$('<section/>').addClass("ls_topTable table-container").append(
						$('<table/>').addClass("ls_table table ls_table-filter").attr({id :'topTable'})
				).appendTo($('#pull-left'));
				$('<tbody/>').append(
						$('<tr/>').append(
										$('<th/>').attr({style : 'width:5%'}).append(
												$('<input/>').attr({type : 'checkbox', id :'allCheck' }).attr({style : 'width:15px'}),
												$('<label for="allCheck">')
												
												
										
								),
								$('<th/>').attr('width','3%').html('NO'),
								$('<th/>').attr('width','10%').html('앨범사진'),
								$('<th/>').attr('width','20%').html('제목'),
								$('<th/>').attr('width','10%').html('아티스트'),
								$('<th/>').attr('width','10%').html('앨범명'),
								$('<th/>').attr('width','5%').html('듣기'),
								$('<th/>').attr('width','5%').html('하트'),
								$('<th/>').attr('width','5%').html('영상'),
								$('<th/>').attr('width','8%').html('싫어요')
						)
				).appendTo($('#topTable'));
			for(var i =0; i<d.length;i++){

				 $('<tr/>').append(
							$('<td/>').append(
									$('<div/>').addClass('ckbox').append(
											$('<input/>').attr({type : 'checkbox', id :'checkbox'+i, name :'chkBox'}),
											$('<label for="checkbox'+i+'">') 
									)
							),
							$('<td/>').attr('width','5%').html(i+1).append(
							),
							$('<td/>').append(
											$('<img/>').attr({
												src : $.ctx()+'/resources/img/album/'+d[i].IMG,
												id : 'ls_album_photo'
											}).click(()=>{
												alert('앨범 사진 클릭');
											})
							),
							$('<td/>').html(d[i].MUSIC_TITLE).attr({style : 'text-overflow: ellipsis'}).click(()=>{
								alert('제목 클릭');
				
							}),
							$('<td/>').html(d[i].ARTIST_NAME).click(()=>{
								alert('아티스트 클릭');
							}),
							$('<td/>').html(d[i].ALBUM_TITLE).click(()=>{
								alert('앨범명 클릭');
							}),
							$('<td/>').append(
									$('<i/>').addClass('ls_fa fa fa-play-circle-o')
									.click(()=>{
										alert('듣기 클릭');
									})),
							$('<td/>').append(
									$('<i/>').addClass('ls_fa fa fa-heart')
									.click(()=>{
										alert('하트 클릭');
									})),
							$('<td/>').append(
									$('<i/>').addClass('ls_fa glyphicon glyphicon-facetime-video')
									.click(()=>{
										alert('뮤비 클릭');
									})),
							$('<td/>').append(
									$('<i/>').addClass('ls_fa fa fa-thumbs-down')
									.click(()=>{
										alert('싫어요 클릭');
									}))
					).appendTo($('#topTable'));
			 }
			
		},
		new_alList :d=>{
			$('#ls_newA').empty();
			$('<ul/>').addClass('ls_cards').attr({id : 'ls_newA'}).appendTo($('#ls_newAlLe'));
			
			for(let i =0; i<6 ;i++){
						$('<ul/>').addClass('ls_cards__item').append(
								$('<div/>').addClass('ls_card').append(
										$('<div/>').addClass('ls_card__image').append(
												
												$('<img/>').attr({src : $.ctx()+'/resources/img/album/'+d[i].IMG})
												.addClass('ls_alimg').click(()=>{ 
													 alert('앨범사진 click'); 
												 })
										),
										$('<div/>').addClass('ls_card__content').append(
												$('<div/>').addClass('ls_card__title')
												.html(d[i].ARTIST_NAME+' / '+d[i].ALBUM_TITLE),
												$('<div/>').addClass('ls_card__div').append(
														$('<div/>').addClass('ls_card__text').html(d[i].REGI_DATE),
														$('<div/>').addClass('glyphicon glyphicon-thumbs-up')
														.html(d[i].LIKE_COUNT)
												),
												
												$('<div/>').append(
														$('<button/>').addClass('ls_btn btn--block card__btn').html('앨범듣기')
														.click(()=>{ 
															 alert('앨범듣듣기 click'); 
															 
														 }),
														
														$('<button/>').addClass('ls_btn btn--block card__btn').html('담기')
														.click(()=>{ 
															alert('담기 click'); 
																		 
														})
												)
												
										)
								
						)
						).appendTo($('#ls_newA'));
		
			
		}	
				
				
				
			},
			 //캐러셀
		alCarousel:()=>{
			$.getJSON(sh.ctx()+'/album/carousel/',d=>{
			
		
			  let item = $('<div/>').addClass('carousel-inner')
			  item.appendTo($('#alCarousel'));
			  
			 $.each(d,(i,v)=>{ $('<div/>').addClass('item'+((i===0)?' active':'')).append(
					  $('<div/>').addClass('col-md-3 col-sm-6 col-xs-12 ls-dj-item').append( 
							  $('<img/>').attr({src : $.ctx()+'/resources/img/album/'+d[i].IMG}).addClass('img-responsive'),
							  $('<div/>').attr({style :'height ="40%"'}).addClass('ls-dj-item-content').append(
									  $('<div/>').addClass('ls-dj-content-txt').append( 
											  $('<h4/>').html(d[i].ARTIST_NAME), 
											  $('<p/>').html(d[i].MUSIC_TITLE), 
											  $('<div/>').addClass('bg-gradients') ) ) ) )
											  
											  .appendTo(item).click(e=>{
													// 밑에 dj detail 열리는 event 걸기
												});
											});
	
			  	$('<a/>')
				.attr({href:'#alCarousel', 'data-slide':'prev'})
				.addClass('left carousel-control')
				.append(
						$('<i/>').addClass('glyphicon glyphicon-chevron-left')
				).appendTo($('#alCarousel'));
				$('<a/>')
				.attr({href:'#alCarousel', 'data-slide':'next'})
				.addClass('right carousel-control')
				.append(
						$('<i/>').addClass('glyphicon glyphicon-chevron-right')
				).appendTo($('#alCarousel'));
				
				$('#alCarousel').carousel({
					  interval: 2000
					})
		
					$('#alCarousel .item').each(function () {
				        var next = $(this).next();
				        if (!next.length) {
				            next = $(this).siblings(':first');
				        }
				        next.children(':first-child').clone().appendTo($(this));

				    	for (var i=0;i<2;i++) {
							next=next.next();
							if (!next.length) {
								next = jQuery(this).siblings(':first');
							}
							next.children(':first-child').clone().appendTo($(this));
						}
				    });
			})
			
		},
			
			
			
		//댓글
		al_comments :()=>{
			let nickname = ['귀여운 승호찡','승호찡넘넘귀여워','세젤귀승호'];
			 for(let i =0; i < 1;i++){
				 $('<div/>').append(
							$('<div/>').addClass('row').append(
								$('<div/>').addClass('col-md-12').append(
										$('<div/>').addClass('blog-comment').attr({id : 'blog-comment'}).append(
												$('<div/>').addClass('clearfix').append(
														 $('<div/>').addClass('post-comments-add').append(
																 new Date().toLocaleString(),
																 $('<p>').attr({id : nickname[i]}).html(nickname[i]),
																 $('<i>').addClass('pull-right'),
																 $('<input/>').attr({type : 'text',id : 'alcommentText'}).addClass('alInputText'),
																 $('<a/>').addClass('alCommentBtn').html('확인')
																 .click(()=>{
																	 alert('클릭');
																	$.ajax({
																		url : $.ctx()+'/album/alComment',
																		method : 'post',
																		contentType: 'application/json',
																		//member_id,seq_group,msg
																		data : JSON.stringify({
																			memberId: nickname[i],
																			seqGroup : '-1',
																			msg : $('#alcommentText').val()
																		}),
																		success : ()=>{
																			 ls.viewComment();
																			 $('#alcommentText').val('');
																		}
																		
																	})
																 })        
														 )
													)
										),
										$('<hr/>')
										
								)	
							)
						).appendTo($('#ls_newAlRi'))
			 }
			 $('<div/>').addClass('blog-comment').attr({id : 'blog-comment'})	
			 
			ls.viewComment();
				
			
			
			
		},
		viewComment:()=>{
			$('#ls_comments').empty();
			
			$('<div/>').attr({id :'ls_comments'}).appendTo($('#blog-comment'))
			$.getJSON($.ctx()+'/album/viewComment',d=>{
				for(let i=0 ; i<6; i++){
					$('<div/>').addClass('clearfix').append(
							 $('<img/>').attr({src : $.ctx()+'/resources/img/user_1.jpg'})
							 .addClass('avatar'),
							 $('<div/>').addClass('post-comments').append(
									 $('<p>').addClass('meta').html(d[i].REGI_DATE),
									 $('<p>').addClass('meta').html(d[i].MEMBER_ID),
									 $('<i>').addClass('pull-right'),
									 $('<p>').addClass('meta').html(d[i].MSG)
							 )
						).appendTo($('#ls_comments'))
					
				}
				
			})
		
					
				}
		
		
}



