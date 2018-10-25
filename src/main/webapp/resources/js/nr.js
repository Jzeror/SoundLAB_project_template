"use strict";
var nr = nr || {};
nr = (()=>{
	var $ctx,$js,$css,$img, w, $page, $cnts;

	var init =()=>{
        console.log('nr.init ::');
        
        let pink = document.createElement('link');
			pink.rel = 'stylesheet';
			pink.href = $.ctx()+'/resources/css/cssnr/style.pink.css';
			pink.id = 'pinkcss';
			document.head.appendChild(pink);
		
			let nrstyle = document.createElement('link');
			nrstyle.rel = 'stylesheet';
			nrstyle.href = $.ctx()+'/resources/css/cssnr/nr.css';
			nrstyle.id = 'nrcss';
			document.head.appendChild(nrstyle);
		
        $ctx = $.ctx();
        $js = $.js();
        $css = $.css();
        $img = $.img();
        w = $('#wrapper');
        w.empty();
        $page = $('<div/>').attr({id:'page'}).addClass('page');
        w.append(nav(),
        		$page.append(
        				hdr(),
        				$('<div/>').attr({id : 'cnts'})

        		)
    	);
        $cnts = $('#cnts');
        home();
        
    	//버튼=========================================
    	$('#toggle-btn').click(e=>{
             e.preventDefault();
             if ($(window).outerWidth() > 1194) {
                 $('nav.side-navbar').toggleClass('shrink');
                 $('.page').toggleClass('active');
             } else {
                 $('nav.side-navbar').toggleClass('show-sm');
                 $('.page').toggleClass('active-sm');
             }
        });
    	$('#mainBtn').click(()=>{
            nr.init();
       });
    	$('#visitBtn').click(()=>{
            home();
       });
    	$('#prefBtn').click(()=>{
            pref();
       });
    	$('#artistBtn').click(()=>{
            artist();
       });
    	$('#hashBtn').click(()=>{
            hash();
       });
    }; /* init 끝 */

    // ============================= 페이지 ============================
    var home =()=>{
    	console.log('nr.home ::');
    	$cnts.empty();
    	

    	section().addClass("dashboard-counts section-padding").appendTo($cnts);
    	cnt({src:"https://static.thenounproject.com/png/1892501-200.png",
    		strong:"New Clients",
    		span:"새로운 고객 수",
    		num:"25"
    		}).appendTo($("#row"));
    	cnt({src:"https://static.thenounproject.com/png/738103-200.png",
    		strong:"Streaming count",
    		span:"스트리밍 수 ",
    		num:"89083432"
    		}).appendTo($("#row"));
    	section().addClass(" d-flex align-items-md-stretch").appendTo($cnts);
    	alert('slslsls' + $("#row").length);
    	$('<div/>').addClass("col-lg-12 flex-lg-last flex-md-first align-self-baseline").append(
				$('<div/>').addClass("card sales-report").append(
					$('<h2/>').addClass("display h4").html("방문자 통계"),
					$('<p/>').html("차트를 입력해주세요"),
					$('<div/>').attr({id:"visiterChart"})
				)
		).appendTo($("#row"));
    	//nr.stats.cnt_visiter();
    	
    	$.getJSON($ctx+'/admin/visit/cntVisiter',d=>{
			console.log("nr.stats.cnt_visiter 의 제이슨 내부 :::");
			console.log("d.cntv :::"+d);
			var data=[["date","남","여"]];
			/**/
			$.each(d, (k,v)=>{
				console.log('each 안');
				console.log('v.date'+v.date);
				console.log('v.mSumVisit'+v.mSumVisit);
				console.log('v.fSumVisit'+v.fSumVisit);
				 data.push(['10-'+v.date, v.mSumVisit*1, v.fSumVisit*1]);
			});
			
			
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawVisiter);
		    
		    function drawVisiter(){
		    	var dataTbl = google.visualization.arrayToDataTable(data);
		    	var options = {
				          title: 'Company Performance',
				          hAxis: {title: '방문 일자',  titleTextStyle: {color: '#333'}},
				          vAxis: {minValue: 0}
				        };
		    	var chart = new google.visualization.AreaChart(document.getElementById('visiterChart'));
		        chart.draw(dataTbl, options);
		    }
			
			
		});
    };
    
    var pref=()=>{
    	console.log('nr.pref ::');
    	$('nav.side-navbar').toggleClass('show-sm');
        $('.page').toggleClass('active-sm');
    	
        $cnts.empty();
    	//section({cls:"forms"}).appendTo($cnts);
        section().addClass("forms").appendTo($cnts);
    	period().appendTo($("#row"));

    	card({size:"3", title:"10대 장르 선호도", id:"donutchart1",style:""}).appendTo($("#row"));
    	card({size:"3", title:"20대 장르 선호도", id:"donutchart2",style:""}).appendTo($("#row"));
    	card({size:"3", title:"30대 장르 선호도", id:"donutchart3",style:""}).appendTo($("#row"));
    	card({size:"3", title:"40대 장르 선호도", id:"donutchart4",style:""}).appendTo($("#row"));
    	card({size:"12", title:"연령별 아티스트 선호도 TOP3", id:"columnchartAA",style:"height:400px"}).appendTo($("#row"));
    	card({size:"6", title:"성별 장르 선호도", id:"barChartSG",style:""}).appendTo($("#row"));
    	card({size:"6", title:"성별 아티스트 선호도", id:"barChartSA",style:""}).appendTo($("#row"));
    	nr.chart.age_genre(1);
    	nr.chart.age_genre(2);
    	nr.chart.age_genre(3);
    	nr.chart.age_genre(4);
    	setTimeout(()=>{
    		nr.chart.age_artist();
    	},1000);
    	setTimeout(()=>{
    		nr.chart.age_artist();
    	},2000);
    	setTimeout(()=>{
    		nr.chart.sex_artist();
    	},3000);
    	setTimeout(()=>{
    		nr.chart.sex_genre();
    	},4000);
	
    };
    var artist=()=>{
    	console.log('nr.artist ::');
    	$cnts.empty();

    	//section({cls:"forms"}).appendTo($cnts);
    	section().addClass("forms").appendTo($cnts);
    	
    	period().appendTo($("#row"));
    	select().appendTo($("#row"));
    	card({size:"12", title:"아티스트분석", id:"artiCha", style:"height:500px"}).appendTo($("#row"))
    		/*.append(arti())*/
    		;
    	card({size:"6", title:"노이름", id:"no",style:""}).appendTo($("#row"));//성별에 따른 아티스트 선호도
    	table().appendTo($("#row"));
    	
    };
    var hash=()=>{
    	console.log('nr.hash ::');
    	$cnts.empty();
    	$('<h2/>').html("==== 해시태그 페이지 ====").appendTo($cnts);
    	section().addClass("forms").appendTo($cnts);
    	$('<div/>').attr({id:"chart_div"}).appendTo($("#row"));
    	/*$cnts.append(
    			$('<h2/>').html("==== 해시태그 페이지 ===="),
    			$('<div/>').attr({id:"chart_div"})
    			);*/
    	hashtree();
    	
    	
    	/*<div id="chart_div"></div>*/
    };
    
    
    
    
 // ============================= 구성 ============================
    
 // ============================= 차트 ============================
    /*var visitChart=()=>{
    	google.charts.load("current", {packages:['corechart']});
    	google.charts.setOnLoadCallback(drawChart);
    	function drawChart() {
    	      var data = google.visualization.arrayToDataTable([
    	        ["날짜", "남","여" ],
    	        ["월", 10, 20 ],
    	        ["화", 10, 20 ],
    	        ["수", 40, 20 ],
    	        ["목", 10, 20 ],
    	        ["금", 10, 20 ],
    	        ["토", 10, 40 ],
    	        ["일", 30, 20 ]
    	   
    	      ]);

    	      var view = new google.visualization.DataView(data);
    	      view.setColumns([0, 1,
    	                       { calc: "stringify",
    	                         sourceColumn: 1,
    	                         type: "string",
    	                         role: "annotation" },
    	                       2]);

    	      var options = {
    	    		  	title : "방문자 통계",
    	    	        width: 600,
    	    	        height: 400,
    	    	        legend: { position: 'top', maxLines: 3 },
    	    	        bar: { groupWidth: '75%' },
    	    	        isStacked: true,
    	    	      };
    	      var chart = new google.visualization.ColumnChart(document.getElementById("visitCha"));
    	      chart.draw(view, options);
    	  }
    	<div id="visitCha" style="width: 900px; height: 300px;"></div>
    };*/
    
    /* ============= 해시트리 ============= */
    var hashtree=()=>{
    	 google.charts.load('current', {'packages':['treemap']});
    	 google.charts.setOnLoadCallback(drawChart);
         function drawChart() {
         var data = new google.visualization.DataTable();
         data.addColumn('string', 'ID');
         data.addColumn('string', 'Parent');
         data.addColumn('number', 'Number Of Lines');
         data.addRows([
           ['해시태그', null, 0],
           ['뮤직스타일', '해시태그', null],
           ['계절&날씨', '해시태그', null],
           ['상황&장소', '해시태그', null],
           ['감정&기분', '해시태그', null],
           ['장르', '해시태그', null],
     			
           ['신나는', '뮤직스타일', 32],
           ['트로피컬', '뮤직스타일', 78],
           ['잔잔한', '뮤직스타일', 56],
           ['어쿠스틱', '뮤직스타일', 23],
           ['열정적인', '뮤직스타일', 49],
           ['감성적인', '뮤직스타일', 51],
   				
           ['봄', '계절&날씨', 21],
           ['여름', '계절&날씨', 56],
           ['가을', '계절&날씨', 49],
           ['겨울', '계절&날씨', 29],
           ['눈오는날', '계절&날씨', 11],
           ['비오는날', '계절&날씨', 25],
                   
           ['드라이브', '상황&장소', 78],
           ['출근', '상황&장소', 23],
           ['휴식', '상황&장소', 46],
           ['독서', '상황&장소', 31],
           ['헬스', '상황&장소', 57],
           ['편집숍', '상황&장소', 33],
           ['카페', '상황&장소', 29],
           ['클럽', '상황&장소', 61],
           
           ['사랑/기쁨', '감정&기분', 46],
           ['스트레스', '감정&기분', 89],
           ['이별', '감정&기분', 42],
           ['고백', '감정&기분', 35],
           ['새벽', '감정&기분', 57],
           ['눈물', '감정&기분', 28],
           ['기분전환', '감정&기분', 51],
           
           ['가요', '장르', 76],
           ['Pop', '장르', 52],
           ['R&B', '장르', 41],
           ['OST', '장르', 24],
           ['Hiphop', '장르', 69],
           ['Classic', '장르', 11],
         ]);
         var tree = new google.visualization.TreeMap(document.getElementById('chart_div'));
         var options = {
           highlightOnMouseOver: true,
           fontSize: 20,
           maxDepth: 1,
           maxPostDepth: 2,
           minColor: '#edf8fb',
           midColor: '#9ebcda',
           maxColor: '#8c6bb1',
           headerHeight: 15,
           showScale: true,
           height: 500,
           useWeightedAverageForAggregation: true
         };
           tree.draw(data, options);
         }
    	/* ============= 해시트리 ============= */
    	 
    	 
    };
    
    var table=()=>{
    	let tbl=$('<table/>').addClass("table table-striped").append(
    			$('<thead/>').append(
    					$('<tr/>').append(
	    					$('<th/>').html("#"),
	    					$('<th/>').html("검색어"),
	    					$('<th/>').html("검색횟수"),
	    					$('<th/>').html("구분")
	    					)),
				$('<tbody/>').append(
						//반복
						$('<tr/>').append(
							$('<th scope="row"/>').html("x.1"),
	    					$('<td/>').html("x.방탄소년단"),
	    					$('<td/>').html("x.123건"),
	    					$('<td/>').html("x.아티스트")
    					),
    					$('<tr/>').append(
    							$('<th scope="row"/>').html("x.2"),
    	    					$('<td/>').html("x.BTS"),
    	    					$('<td/>').html("x.765건"),
    	    					$('<td/>').html("x.아티스트")
        					),
    					$('<tr/>').append(
    							$('<th scope="row"/>').html("x.3"),
    	    					$('<td/>').html("x.IDOL"),
    	    					$('<td/>').html("x.555건"),
    	    					$('<td/>').html("x.노래")
        					)
					)
    	);
    	let tdiv=$('<div/>').addClass("col-lg-6").append(
    			$('<div/>').addClass("card").append(
    					$('<div/>').addClass("card-header").append(
    							$('<h4/>').html("x.테이블이름")),
						$('<div/>').addClass("card-body").append(
								$('<div/>').attr({id:"tblRes"}).addClass("table-responsive").append(tbl))
					)
				);
    	return tdiv;
    };

    var section=()=>{
		return $('<section/>').append(
					$('<div/>').addClass("container-fluid").append(
						$('<div/>').attr({id:"row"}).addClass("row")));
	};
	
	var section2=()=>{
		return $('<section/>').append(
					$('<div/>').addClass("container-fluid").append(
						$('<div/>').attr({id:"row2"}).addClass("row")));
	};
    
	

    var period=()=>{
    	let period = 
    		$('<div/>').attr({id:'periodcard'}).addClass("card").appendTo($cnts);
    	$('<div/>').attr({id:'period'}).addClass("card-body").appendTo($('#periodcard'));
				$('<form/>').addClass("form-inline").attr({id:'periodForm'}).appendTo($('#period'));
					$('<div/>').addClass("form-group").attr({id:'startDiv'}).appendTo($('#periodForm'));
						$('<input/>').attr({type:'date', name:'startDate', id:'startDate'}).addClass("mr-3 form-control").appendTo($('#startDiv'));
					$('<div/>').addClass("form-group").attr({id:'endDiv'}).appendTo($('#periodForm'));
						$('<input/>').attr({type:'date', name:'endDate', id:'endDate'}).addClass("mr-3 form-control").appendTo($('#endDiv'));
					$('<div/>').addClass("form-group").attr({id:'submitDiv'}).appendTo($('#periodForm'));
						$('<div/>').addClass("form-group").attr({id:'submitDiv'}).appendTo($('#periodForm'));
						$('<a/>').addClass("nrBtn")
						/*.addClass("mr-3 btn btn-primary")*/
						.html('조회').appendTo($('#submitDiv'));
						/*$('<btn/>').addClass("mr-3 btn btn-primary")
						.attr({id:"submitBtn", type:"btn"})
						.html('조회').appendTo($('#submitDiv'));*/
        return period;
    }
    
    var select=()=>{
    	let sel = $('<div/>').addClass("form-group row").append(
    			$('<label/>').addClass("col-sm-2 form-control-label").html("아티스트 선택"),
				$('<form/>').append(
					$('<div/>').addClass("col-sm-3 mb-3").append(
    					$('<select/>').addClass("form-control").attr({id:"artist_name" ,name:"account"}).append(
	    					$('<option/>').html("방탄소년단"),
	    					$('<option/>').html("트와이스"),	
	    					$('<option/>').html("레드벨벳"),
	    					$('<option/>').html("블랙핑크")
	    					)
    					),
    				$('<button/>').addClass("form-group nrBtn").html("선택").attr({id:"artiBtn"})
    					.click(e=>{
    						$.getJSON($ctx+'/admin/artist/'+$('#artist_name').val(),d=>{
    							console.log('제이슨 들어옴 : '+$('#artist_name').val());
    							var artiGS = [['곡 명','스트리밍 수','좋아요 수','앨범 명','스트리밍*좋아요']];
    							let tempS=30000;
    							
    							
    							$.each(d.GS, function(k, v){
    								/*let tempG=Math.floor(Math.random()*100);*/
    								artiGS.push([v.musicTitle, v.sumStr+tempS, v.sumGood*10, v.albumTitle, 
    									(v.sumStr+tempS)*(v.sumGood)]);
    								tempS=tempS-30;
    							});
    							console.log(artiGS);
    							
    							google.charts.load("current", {packages:["corechart"]});
    							google.charts.setOnLoadCallback(drawChart);
    							function drawChart() {
    							      var data = google.visualization.arrayToDataTable(artiGS);
    							      var options = {
    							        title: $('#artist_name').val()+'의 스트리밍 수와 좋아요 수 상관관계 ',
    							        hAxis: {title: '스트리밍 수'
    							        	},
    							        vAxis: {title: '좋아요 수'},
    							        bubble: {
    							          textStyle: {
    							            fontSize: 12,
    							            fontName: 'Times-Roman',
    							            color: 'green',
    							            bold: true,
    							            italic: true
    							          }
    							        }
    							      };
    							      var chart = new google.visualization.BubbleChart(document.getElementById('artiCha'));
    							      chart.draw(data, options);
    							    }
    						});
    					})
				)
				);
    	
    	
    		/*//서치 = input타입
    		$('<div/>').addClass("navbar-form navbar-left").append(
    			$('<div/>').addClass("form-group").append(
    					$('<input/>').addClass("form-control").attr({type:"text",placeholder:"Search for artist"})),
				$('<button/>').addClass("mr-3 btn btn-primary").attr({type:"submit"}).html("Search")
    					);
    	*/
    	
    	return sel;
    };
    
    
    
   /* var cnt=()=>$('<div/>').addClass("col-md-4 col-6").append(
			$('<div/>').addClass("wrapper count-title d-flex").append(
				$('<div/>').addClass("icon").append(
					$('<i/>').addClass("fa fa-user")	
				),
				$('<div/>').addClass("name").append(
					$('<strong/>').addClass("text-uppercase").html("New Clients"),
					$('<br/>'),
					$('<span/>').html("새로운 고객 수"),
					$('<div/>').addClass("count-number").html("25")
				)
			));dd*/
    
    
    
    
    var cnt=x=>$('<div/>').addClass("col-md-6").append(
			$('<div/>').addClass("wrapper count-title d-flex").append(
					$('<div/>').addClass("col-md-3").append(
						$('<img/>').addClass("main-img").attr({src:x.src})
					),
					$('<div/>').addClass("name col-md-3").append(
						$('<strong/>').addClass("text-uppercase").html(x.strong),
						$('<br/>'),
						$('<span/>').html(x.span),
						$('<div/>').addClass("count-number").html(x.num)
					)
			));
    
	var visit=()=>{
		let visit=
			$('<div/>').addClass("col-lg-12 flex-lg-last flex-md-first align-self-baseline").append(
				$('<div/>').addClass("card sales-report").append(
					$('<h2/>').addClass("display h4").html("방문자 통계"),
					$('<p/>').html("차트를 입력해주세요"),
					$('<div/>').attr({id:"visiterChart"})
				)
			);
		/*visitChart();*/
		return visit;
	};
	/*<div id="visitCha" style="width: 900px; height: 300px;"></div>*/
	
	//size:6, title:~~분석, 
	var card=x=>{
		let card=$('<div/>').addClass("col-lg-"+x.size).append(
				$('<div/>').addClass("card line-chart-example").append(
				$('<div/>').addClass("card-header d-flex align-items-center").append(
						$('<h4/>').html(x.title)
						),
				$('<div/>').addClass("card-body").append(
						$('<div/>').attr({id:x.id, style:x.style}))
				)
			);
		return card;
	};
    
	var nav = ()=>{
		console.log('nr.nav ::');
		let $nav = $('<nav/>');
		 $($nav).addClass("side-navbar").append(
					$('<div/>').addClass("side-navbar-wrapper").append(
							$('<div/>').addClass("sidenav-header d-flex align-items-center justify-content-center").append(
								$('<div/>').addClass("sidenav-header-inner text-center").append(
									$('<img/>')
									/*.addClass("img-fluid ")*/
									.attr({
										src:$.img()+"/logo_admin.png",
										alt:"SoundLAB 로고",
										style:"resize: both;"
										,
									})
								),
								$('<div/>').addClass("sidenav-header-logo").append(
									$('<a/>').addClass("brand-small text-center").attr({href:"#"}).append(
										$('<strong/>').html("S"),
										$('<strong/>').addClass("text-primary").html("L")
									)
								)
										
							),
							$('<div/>').addClass("main-menu").append(
									$('<h5/>').addClass("sidenav-heading").html("MAIN"),
									$('<ul/>').addClass("side-menu list-unstyled").attr({id:"side-main-menu"}).append(
										$('<li/>').append(
											$('<a/>').attr({id:"visitBtn", href:"#"}).append(
												$('<i/>').addClass("fa fa-bar-chart").html('  방문통계'))),
										$('<li/>').append(
											$('<a/>').attr({id:"prefBtn", href:"#"}).append(
												$('<i/>').addClass("fa fa-bar-chart").html('  선호도'))),
										$('<li/>').append(
											$('<a/>').attr({id:"artistBtn", href:"#"}).append(
												$('<i/>').addClass("fa fa-bar-chart").html('  아티스트'))),
										$('<li/>').append(
											$('<a/>').attr({id:"hashBtn", href:"#"}).append(
												$('<i/>').addClass("fa fa-bar-chart").html('  해시태그')))
									)
								)
						)		
		);
		return $nav;
	};
	var hdr =()=>{
		let $header =$('<header/>').addClass("header");
		let $nav = $('<nav/>').appendTo($header);
		$nav.addClass("navbar").append(
			$('<div/>').addClass("container-fluid").append(
				$('<div/>').addClass("navbar-holder d-flex align-items-center justify-content-between").append(
					$('<div/>').addClass("navbar-header").append(
						$('<a/>').addClass("menu-btn").attr({id:"toggle-btn",href:"#"}).append(
							$('<i/>').addClass("fa fa-bars")).attr({style:"font-size:20px"}),
						$('<a/>').addClass("navbar-brand").attr({href:"#"}).append(
							$('<div/>').addClass("brand-text d-none d-md-inline-block").append(
								$('<span/>').html("ADMIN"),
								$('<strong/>').addClass("text-primary").html("SoundLAB")))
					),
					$('<ul/>').addClass("nav-menu list-unstyled d-flex flex-md-row align-items-md-center").append(
						$('<li/>').addClass("nav-item").append(
							$('<a/>').addClass("nav-link logout").attr({id:"logoutBtn",href:"#",style:"float:right"}).append(
								$('<span/>').addClass("d-none d-sm-inline-block").html("Logout")
								.click(e=>{
									$('#pinkcss').remove();
									$('#nrcss').remove();
									sh.service.login();
								}),
								$('<i/>').addClass("fa fa-sign-out")
							)))
				)
			)
		);
		return $header;
	};

	return {
		init : init
		
	};
})();

nr.stats={
		cnt_visiter:()=>{
			console.log("방문자 통계 들어왔씁니다 *");
			
			$.getJSON($.ctx()+'/admin/visit/cntVisiter',d=>{
				console.log("nr.stats.cnt_visiter 의 제이슨 내부 :::"+d);
				/*console.log("d.cntv :::"+d.cntV);
				var data=[["date","남","여"]];
				$.each(d.cntV, (k,v)=>{
					 data.push([v.date, v.mSumVisit, v.fSumVisit ]);
				});
				
				
				google.charts.load('current', {'packages':['corechart']});
			    google.charts.setOnLoadCallback(drawVisiter);
			    
			    function drawVisiter(){
			    	var dataTbl = google.visualization.arrayToDataTable(data);
			    	var options = {
					          title: 'Company Performance',
					          hAxis: {title: '방문 일자',  titleTextStyle: {color: '#333'}},
					          vAxis: {minValue: 0}
					        };
			    	var chart = new google.visualization.AreaChart(document.getElementById('visiterChart'));
			        chart.draw(dataTbl, options);
			    }
				*/
				
			});
			
			/*
			google.charts.load('current', {'packages':['corechart']});
		      google.charts.setOnLoadCallback(drawChart);

		      function drawChart() {
		       

		        var options = {
		          title: 'Company Performance',
		          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
		          vAxis: {minValue: 0}
		        };

		        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
		        chart.draw(data, options);
		      }*/
		}
		
}

nr.chart={
		age_genre:x=>{
				$.getJSON($.ctx()+'/admin/pref/ageGenre',d=>{
					var data=[['장르','선호도']];
	    	    	$.each(d.AnG, (k,v)=>{
	    	    		if(v.ageGroup==x+"0대"){
	    	    			data.push([v.genreName, v.sumGood]);
	    	    		}
	    	    	});
					google.charts.load("current", {packages:["corechart"]});
		    	    google.charts.setOnLoadCallback(drawAnG);
		    	    
		    	    function drawAnG(){
		    	    	var datas = google.visualization.arrayToDataTable(data);
		    	    	var options =  {
		    			          //title: x+'0대 장르 선호도',
		    			          pieHole: 0.4,
		    			        };
		    	    	var chart = new google.visualization.PieChart(document.getElementById('donutchart'+x));
				        chart.draw(datas, options); 
		    	    }
				});
			
			
    	},
		age_artist:()=>{
			$.getJSON($.ctx()+'/admin/pref/ageArtist',d=>{
				
				var data =[];
				var key=["연령"];
				var g10=["10대"];
				var g20=["20대"];
				var g30=["30대"];
				var g40=["40대"];
				$.each(d.AA,(k,v)=>{
					key.push(v.artistName);
				});
				var unique = key.reduce(function(i,j){
					if(i.indexOf(j)<0) i.push(j);
					return i;
				},[]);
				console.log("unique : "+unique);
				$.each(d.AA, function(k,v){
					if(v.ageGroup=="10대"){
						g10.push(v.sumGood);
						console.log("g10 : "+g10);
					}else if(v.ageGroup=="20대"){
						g20.push(v.sumGood);
						console.log("g20 : "+g20);
					}else if(v.ageGroup=="30대"){
						g30.push(v.sumGood);
						console.log("g30 : "+g30);
					}else if(v.ageGroup=="40대"){
						g40.push(v.sumGood);
						console.log("g40 : "+g40);
					}
				});
				
					data.push(unique,g10,g20,g30,g40);
					console.log("g10 : "+g10);
					console.log("g20 : "+g20);
					console.log("g30 : "+g30);
					console.log("g40 : "+g40);
					console.log("age_artist :data : "+data);
					//차트 시작
					google.charts.load('current', {'packages':['bar']});
					google.charts.setOnLoadCallback(drawAA);
		    	    function drawAA(){
		    	    	var dataTbl = google.visualization.arrayToDataTable(data);
		    	    	var options = {
		    	  	          chart: {
		    	  	            //subtitle: '방탄소년단, 트와이스, 레드벨벳',
		    	  	          }
		    	  	        };
			  	        var chart = new google.charts.Bar(document.getElementById('columnchartAA'));
			  	        chart.draw(dataTbl, google.charts.Bar.convertOptions(options));
		    	    }
				
				
				
				
			});
		},
		sex_genre:()=>{
			$.getJSON($.ctx()+'/admin/pref/sexGenre',d=>{
				console.log("sex_genre 진입 ");
				var data =[];
				var key=["장르"];
				var male=["남"];
				var female=["여"];
				$.each(d.SG,(k,v)=>{
					key.push(v.genreName);
				});
				var unique = key.reduce(function(i,j){
					if(i.indexOf(j)<0) i.push(j);
					return i;
				},[]);
				$.each(d.SG,(k,v)=>{
					if(v.MF==="M"){
						male.push(v.sumGood);
					}else if(v.MF==="F"){
						female.push(v.sumGood);
					}
				});
				data.push(unique,male,female);
				
				//차트 시작
				google.charts.load("current", {packages:["corechart"]});
			    google.charts.setOnLoadCallback(drawSG);
			    function drawSG(){
			    	var dataTbl = google.visualization.arrayToDataTable(data);
			    	var options = {
			    	          isStacked: 'percent',
			    	          height: 300,
			    	          legend: {position: 'top', maxLines: 3},
			    	          hAxis: {
			    	            minValue: 0,
			    	            ticks: [0, .3, .6, .9, 1]
			    	          }
			    	        };
			    	var chart = new google.visualization.BarChart(document.getElementById("barChartSG"));
			        chart.draw(dataTbl, options);
			    }
			});
		},
		sex_artist:()=>{
			$.getJSON($.ctx()+'/admin/pref/sexArtist',d=>{
				console.log("sex_artist: ");
				var data =[];
				var key=["아티스트"];
				var male=["남"];
				var female=["여"];
				$.each(d.SA,(k,v)=>{
					key.push(v.artistName);
				});
				console.log("sex_artist:key: "+key);
				
				var unique = key.reduce(function(i,j){
					if(i.indexOf(j)<0) i.push(j);
					return i;
				},[]);
				console.log("sex_artist:unique : "+unique);
				
				$.each(d.SA,(k,v)=>{
					if(v.MF==="M"){
						male.push(v.sumGood);
					}else if(v.MF==="F"){
						female.push(v.sumGood);
					}
				});
				data.push(unique,male,female);
				
				console.log("sex_artist:M : "+male);
				console.log("sex_artist:F : "+female);
				console.log("sex_artist:data : "+data);
				
				
				//차트 시작
				google.charts.load("current", {packages:["corechart"]});
			    google.charts.setOnLoadCallback(drawSA);
			    function drawSA(){
			    	var dataTbl = google.visualization.arrayToDataTable(data);
			    	var options = {
			    	          isStacked: 'percent',
			    	          height: 300,
			    	          legend: {position: 'top', maxLines: 3},
			    	          hAxis: {
			    	            minValue: 0,
			    	            ticks: [0, .3, .6, .9, 1]
			    	          }
			    	        };
			    	var chart = new google.visualization.BarChart(document.getElementById("barChartSA"));
			        chart.draw(dataTbl, options);
			    }
				
				
			});
		}
		
		
}
    	
			 
		   
		    /*
			
			$('<button/>').addClass("form-group nrBtn").html("선택").attr({id:"artiBtn"})
			.click(e=>{
				$.getJSON($ctx+'/admin/artist/'+$('#artist_name').val(),d=>{
					console.log('제이슨 들어옴 : '+$('#artist_name').val());
					var artiGS = [['곡 명','스트리밍 수','좋아요 수','앨범 명','스트리밍*좋아요']];
					$.each(d.GS, function(k, v){
						artiGS.push([v.musicTitle, v.sumStr*10, v.sumGood*14, v.albumTitle, v.sumStr*v.sumGood*10000]);
					});
					console.log(artiGS);
					
					google.charts.load("current", {packages:["corechart"]});
					google.charts.setOnLoadCallback(drawChart);
					function drawChart() {
					      var data = google.visualization.arrayToDataTable(artiGS);
					      var options = {
					        title: $('#artist_name').val()+'의 스트리밍 수와 좋아요 수 상관관계 ',
					        hAxis: {title: '스트리밍 수'
					        	},
					        vAxis: {title: '좋아요 수'},
					        bubble: {
					          textStyle: {
					            fontSize: 12,
					            fontName: 'Times-Roman',
					            color: 'green',
					            bold: true,
					            italic: true
					          }
					        }
					      };
					      var chart = new google.visualization.BubbleChart(document.getElementById('artiCha'));
					      chart.draw(data, options);
					    }
				});
*/