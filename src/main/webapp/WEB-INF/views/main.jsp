<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><!-- jstl.jar 사용하기 위해 한 것 -->
<!doctype html>
<html lang="en">
<head>
     <title>SoundLAB</title> 
     <link rel="shortcut icon" href="${context}/resources/img/favicon.ico" />
     <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
     <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

      <link href="${context}/resources/css/sh.css" rel="stylesheet">
      <link href="${context}/resources/css/jt.css" rel="stylesheet">
      <link href="${context}/resources/css/ls.css" rel="stylesheet">
      <link href="${context}/resources/css/sj.css" rel="stylesheet">

     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
	 <script src="${context}/resources/js/app.js"></script>
	
	 <!-- 해시태그 수정-->
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	

	<!-- 단어구름 -->
	<script src="https://d3js.org/d3.v4.min.js"></script>
    <!-- Random number generator -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/2.4.3/lib/alea.min.js"></script>
    <!-- d3-cloud library -->
    <script src="${context}/resources/js/d3.layout.cloud.js"></script>
	<script src="${context}/resources/js/wordcloud.js"></script>

	
</head>
<body data-spy="scroll" data-target="#header">
<div id="wrapper"></div>
<script> /* 바디 안에 넣음, 전역메소드로 처리한 것 */
app.init('${context}');
</script>
</body>
</html>