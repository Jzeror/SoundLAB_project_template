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
								$('<div/>').addClass("ls_lineCh Panel panel-dafalt container").append(
										 $('<div/>').attr({id :'chart_title'}).html('안녕!'),
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
																 $('<a/>').attr({id : 'wklChr'}).html('일간'))
																 .click(()=>{ 
																	 alert('wklChr click'); 
																	 	let dayChart = 'dayChart';
																		$.getJSON(sh.ctx()+'/music/top50/'+dayChart,d=>{
																			$('#topTable').empty();
																			 ls.top50table(d);
																	 })
																	 }),
														 $('<li/>').append(
																$('<a/>').attr({id : 'dayChr'}).html('주간'))
																.click(()=>{ 
																	alert('dayChr click'); 
																	 let weelChart = 'weekChart';
																		$.getJSON(sh.ctx()+'/music/top50/'+weelChart,d=>{
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
						        	  data.addColumn('number', d[0].ARTIST_NAME);
							          data.addColumn('number', d[1].ARTIST_NAME);
							          data.addColumn('number', d[2].ARTIST_NAME);	  
							          for(let i=0; i <5; i++){	
							          data.addRows([
							            [d[i].VIEW_DATE*1,  d[i].PER, d[i+1].PER, d[i+2].PER],
							            [d[i+1].VIEW_DATE*1,  d[i].PER, d[i+1].PER, d[i+2].PER],
							            [d[i+2].VIEW_DATE*1,  d[i].PER, d[i+1].PER, d[i+2].PER]
							          ]);
							          }
							         
							          
							         
							          
							          let options = {
							        	        title: '1위 : '+d[0].PER+'2위 : '+d[1].PER+'3위 : '+d[2].PER,
							        	        subtitle: '현재시간 : '+new Date().toLocaleString(),
							        	        fontSize : 20,
							        	        width: 900,
							        	        height: 350,
							        	   
							        	        axes: {
							        	          x: {
							        	            0: {side: 'bottom'}
							        	          }
							        	        }
							        	      };
							          
							          
							          var chart = new google.charts.Line(document.getElementById('line_top_x'));
							       
							          chart.draw(data, google.charts.Line.convertOptions(options))
							          .appendTo($('#line_top_x'));
							  }		
					})
					//차트 내부 점유율 타이틀
					$('<div/>').append(
							
					).appendTo('#chart_title');
					
					
					
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
									
									$('<div/>').attr({id : 'ls_newAlLe'})
											
									,
									$('<div/>').attr({id : 'ls_newAlRi'}).html('최신앨범 인기곡').append(
											$('<table/>').append(
													$('<tbody/>').append(
															$('<tr/>').attr({id : 'ls_alTable_tr'}).append(
																			$('<th/>').attr({style : 'width:5%'}).append(
																					$('<input/>').attr({type : 'checkbox', id :'allAlCheck' }).attr({style : 'width:15px'}),
																					$('<label for="allAlCheck">')
																			
																	),
																	$('<th/>').attr('width','3%').html('NO'),
																	$('<th/>').attr('width','10%').html('앨범사진'),
																	$('<th/>').attr('width','20%').html('제목'),
																	$('<th/>').attr('width','10%').html('아티스트'),
																	$('<th/>').attr('width','10%').html('앨범명'),
																	$('<th/>').attr('width','5%').html('듣기')
																	
															)
													)
											)
									)
							).appendTo($albumSec);
							
							ls.new_alList(d);
							$('<div/>').attr({id : 'morePage'}).addClass("ls_album_panel container").append(
									$('<button/>').attr({id : 'al_morePage'}).addClass("btn btn-brand btn-primary").html('더보기')
									.click(()=>{ 
									 alert('al_morePage click'); 
									 
									 })		
							).appendTo($albumSec);
					
				 //캐러셀
				  let item = $('<div/>').addClass('carousel-inner')
				  item.appendTo($('#alCarousel'));
				  
				  let newal = [
					  {src : '선미_가시나.jpg',
							musTtl : '사이렌',
							atist : '선미',
							title : 'WARNING'
						},
						{src : '로이킴_그때_헤어지면_돼.jpg',
							musTtl : '우리 그만하자',
							atist : '로이킴',
							title : '우리 그만하자'
						},
						{src : 'VIBE_가을타나봐.jpg',
							musTtl : '가을 타나 봐 ',
							atist : '바이브',
							title : '가을 타나 봐 '
						},
						{src : '윤종신_좋니.jpg',
							musTtl : '좋니',
							atist : '윤종신',
							title : '좋니'
						},
						{src : 'IU_삐삐.jpg',
							musTtl : '삐삐',
							atist : '아이유',
							title : '삐삐'
						},
						{src : '폴킴_키스_먼저_할까요.jpg',
							musTtl : '모든 날, 모든 순간',
							atist : '폴킴',
							title : '키스 먼저 할까요?'}
					];
				  
				 $.each(newal,(i,v)=>{ $('<div/>').addClass('item'+((i===0)?' active':'')).append(
						  $('<div/>').addClass('col-md-3 col-sm-6 col-xs-12 ls-dj-item').append( 
								  $('<img/>').attr({src : $.ctx()+'/resources/img/album/'+v.src}).addClass('img-responsive'),
								  $('<div/>').attr({style :'height ="40%"'}).addClass('ls-dj-item-content').append(
										  $('<div/>').addClass('ls-dj-content-txt').append( 
												  $('<h4/>').html(v.title), 
												  $('<p/>').html(v.musTtl), 
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
							$('<td/>').html(d[i].MUSIC_TITLE).click(()=>{
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
												$('<div/>').addClass('ls_card__title').html(d[i].ARTIST_NAME),
												$('<p>').addClass('ls_card__text').html(d[i].ALBUM_TITLE),
												$('<div/>').append(
														$('<button/>').addClass('ls_btn btn--block card__btn').html('전체듣기')
														.click(()=>{ 
															 alert('전체듣기 click'); 
															 
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
		}
	
}



