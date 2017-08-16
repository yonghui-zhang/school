<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="database.SelectDB, java.sql.ResultSet"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">
<head>
<meta charset="utf-8">
<title></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
<meta name="author" content="" />
<!-- css -->
<link href="css/bootstrap.min.css" rel="stylesheet" />
<link href="css/fancybox/jquery.fancybox.css" rel="stylesheet">
<link href="css/jcarousel.css" rel="stylesheet" />
<link href="css/flexslider.css" rel="stylesheet" />
<link href="js/owl-carousel/owl.carousel.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet" />
 
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
<script src="js/jquery" type="text/javascript"></script>

<!-- 自己写的js -->
<script type="text/javascript" src="js/myjs.js"></script>

<script src="js/jquery-1.7.2.min.js"></script>
<script src="js/scroll.js"></script>


<style>
  .newslan a{
     display:block;
     text-decoration:none;
  }
  .newslan{
     height:200px;
     overflow:hidden;
  }
</style>

</head>
<body>
<div id="wrapper" class="home-page">
	<!-- start header -->
	<header>
        <div class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.html"><img src="img/logo.png" alt="logo"/></a>
                </div>
                <div class="navbar-collapse collapse ">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="index.html"><font size="4">首页</font></a></li> 
						<li><a href="news.html"><font size="4">新闻公告</font></a></li>
						<li><a href="activitys.html"><font size="4">班级活动</font></a></li>
                        <li><a href="about.html"><font size="4">关于我们</font></a></li>
						
						<a href="login.html">登录</a>
						<span>|</span>
						<a href="register.html">注册</a>
                    </ul>
                </div>
            </div>
        </div>
	</header>
	<!-- end header -->
	<section id="banner">
	 
	<!-- Slider -->
        <div id="main-slider" class="flexslider">
            <ul class="slides">
              <li>
                <img src="img/slides/1.jpg" alt="" />
                <div class="flex-caption container">
                    <h3>Success Oriented</h3> 
					<p>Doloribus omnis minus temporibus perferendis ipsa<br/> architecto non, magni quam</p> 
					<a href="#" class="btn btn-theme">Read More</a>
                </div>
              </li>
              <li>
                <img src="img/slides/2.jpg" alt="" />
                <div class="flex-caption container">
                    <h3>Education Genius</h3> 
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing<br/> elitincidunt eius magni provident.</p> 
					<a href="#" class="btn btn-theme">Read More</a>
                </div>
              </li>
            </ul>
        </div>
	<!-- end slider -->
 
	</section>
	
	
	<section class="news-area">
	   <table>
	     <tbody>
		     <tr>
			    <td valign="top">
				 <div id="flowDiv1">
		             <div style="margin-left:30px; margin-top:30px" class="title">
		               <span><font size="5">校园动态</font></span>
					   <a style="margin-left:40px" href="#">查看更多动态>></a>
		             </div>
		             <div id="newlan" style="margin-left:30px; margin-top:10px" class="newslan content">
		             
		             <ul class="textlist">
		              <%
		                 String sql = "select * from news";
			             ResultSet rs = SelectDB.selectData(sql);
			             String URI = "/school2/news/";
			             try{
			               while(rs.next())
			               {
			                 String date = rs.getString("date");
			                 date = date.substring(0, date.lastIndexOf(" "));
		              %>
		               <li>
			              <a href="<%=URI + rs.getString("newspath")%>" target="_blank" title="<%=rs.getString("title")%>"><%=rs.getString("title")%>  <%=date%></a>
			           </li>
			           <%
			              }
			             }catch(Exception e)
			             {
			               e.printStackTrace();
			             }
			           %>
		            </ul>
		            </div>
		            <script>
		               var box=document.getElementById("newlan"),can=true;
                       box.innerHTML+=box.innerHTML;
                       box.onmouseover=function(){can=false};
                       box.onmouseout=function(){can=true};
                       new function (){
                           var stop=box.scrollTop%200==0&&!can;
                           if(!stop)
                           box.scrollTop==parseInt(box.scrollHeight/2)?box.scrollTop=0:box.scrollTop++;
                           setTimeout(arguments.callee,box.scrollTop%200?10:1500);
                       };
		            </script>
	            </div>
				</td>
				<td>
				    <div style="margin-left:30px; margin-bottom:10px; width:600px; height:auto; box-shadow:1px 1px 5px 5px  #888888;">
	      <table>
		     <tbody>
			    <tr>
				  <td>
				    <div style="margin-top:5px">
		             <img alt="Blank" width="180px" height="120px" src="cols/1.jpg"/>
		            </div>
				  </td>
				  <td>
				    <div style="width:300px; margin-left:10px" style="margin-top:5px">
		               <h4><a style="text-decoration:none" href="#">某P2P系统对象自动绑定可任意充值</a></h4>
			           <p>对象自动绑定被许多框架支持（比如Spring MCV）, 它允许将HTTP请求参数自动的绑定到对象。然而攻击者</p>
		            </div>
				  </td>
				</tr>
				<tr>
				 <td>
				    <div style="margin-top:5px;">
		             <img alt="Blank" width="180px" height="120px" src="cols/2.jpg"/>
		            </div>
				  </td>
				  <td>
				    <div style="width:300px; margin-left:10px" style="margin-top:5px">
		               <h4><a style="text-decoration:none" href="#">三个案例看Nginx配置安全</a></h4>
			           <p>之前在Sec-News中推荐了一个开源程序 https://github.com/yandex/gixy ，作</p>
		            </div>
				  </td>
				</tr>
				<tr>
				  <td>
				    <div style="margin-top:5px">
		             <img alt="Blank" width="180px" height="120px" src="cols/3.jpg"/>
		            </div>
				  </td>
				  <td>
				    <div style="width:300px; margin-left:10px" style="margin-top:5px">
		               <h4><a style="text-decoration:none" href="#">基于大数据和机器学习的Web异常参数检测系统Demo实现</a></h4>
			           <p>一、前言 如何在网络安全领域利用数据科学解决安全问题一直是一个火热的话题，讨论算法和实现的文章也不少。前段时间</p>
		            </div>
				  </td>
				</tr>
			 </tbody>
		  </table>
	    </div>
				</td>
				<td valign="top">
				   <div>
		             <div style="margin-left:30px; margin-top:30px;">
		               <span><font size="5">班级活动</font></span>
					   <a style="margin-left:40px" href="#">查看更多活动>></a>
		             </div>
		             <div id="newlan" style="margin-left:30px; margin-top:10px" class="content">
		             <ul>
		               <li>
			              <a href="#" target="_blank" title="我校将举办2017秋季篮球赛...">我校将举办2017秋季篮球赛...</a>
			           </li>
			           <li>
			              <a href="#" target="_blank" title="欢迎张永辉董事长来我校指导工作...">欢迎张永辉董事长来我校指导工作...</a>
			           </li>
			           <li>
			              <a href="#" target="_blank" title="小孩子不要老玩英雄联盟...">小孩子不要老玩英雄联盟...</a>
			           </li>
			           <li>
			              <a href="#" target="_blank" title="马玉涛麻辣烫出食品安全问题...">马玉涛麻辣烫出食品安全问题...</a>
			           </li>
					   <li>
			                 <a href="#" target="_blank" title="我校将举办2017秋季篮球赛...">我校将举办2017秋季篮球赛...</a>
			              </li>
			              <li>
			                 <a href="#" target="_blank" title="欢迎张永辉董事长来我校指导工作...">欢迎张永辉董事长来我校指导工作...</a>
			              </li>
			              <li>
			                 <a href="#" target="_blank" title="小孩子不要老玩英雄联盟...">小孩子不要老玩英雄联盟...</a>
			              </li>
			              <li>
			                 <a href="#" target="_blank" title="马玉涛麻辣烫出食品安全问题...">马玉涛麻辣烫出食品安全问题...</a>
			              </li>
						  <li>
			                 <a href="#" target="_blank" title="我校将举办2017秋季篮球赛...">我校将举办2017秋季篮球赛...</a>
			              </li>
			              <li>
			                 <a href="#" target="_blank" title="欢迎张永辉董事长来我校指导工作...">欢迎张永辉董事长来我校指导工作...</a>
			              </li>
			              <li>
			                 <a href="#" target="_blank" title="小孩子不要老玩英雄联盟...">小孩子不要老玩英雄联盟...</a>
			              </li>
			              <li>
			                 <a href="#" target="_blank" title="马玉涛麻辣烫出食品安全问题...">马玉涛麻辣烫出食品安全问题...</a>
			              </li>
						  <li>
			                 <a href="#" target="_blank" title="我校将举办2017秋季篮球赛...">我校将举办2017秋季篮球赛...</a>
			              </li>
			              <li>
			                 <a href="#" target="_blank" title="欢迎张永辉董事长来我校指导工作...">欢迎张永辉董事长来我校指导工作...</a>
			              </li>
			              <li>
			                 <a href="#" target="_blank" title="小孩子不要老玩英雄联盟...">小孩子不要老玩英雄联盟...</a>
			              </li>
			              <li>
			                 <a href="#" target="_blank" title="马玉涛麻辣烫出食品安全问题...">马玉涛麻辣烫出食品安全问题...</a>
			              </li>
		            </ul>
		            </div>
		            
	            </div>
				</td>
			 </tr>
		 </tbody>
	   </table>
	  
  </section>
	

	

	
	
	<footer>
	<div class="container">
		<div class="row">
			<div class="col-lg-3">
				<div class="widget">
					<h5 class="widgetheading">联系我们</h5>
					<address>
				    地址：中国黑龙江省大庆市东北石油大学
					 </address>
					<p>
						<i class="icon-phone"></i>联系电话：15776584925<br>
						<i class="icon-envelope-alt"></i>邮箱：1798916974@qq.com
					</p>
				</div>
			</div>
			
			<div class="col-lg-3">
				<div class="widget">
					<h5 class="widgetheading">Quick Links</h5>
					<ul class="link-list">
						<li><a href="#">Latest Events</a></li>
						<li><a href="#">Terms and conditions</a></li>
						<li><a href="#">Privacy policy</a></li>
						<li><a href="#">Career</a></li>
						<li><a href="#">Contact us</a></li>
					</ul>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="widget">
					<h5 class="widgetheading">Latest posts</h5>
					<ul class="link-list">
						<li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></li>
						<li><a href="#">Pellentesque et pulvinar enim. Quisque at tempor ligula</a></li>
						<li><a href="#">Natus error sit voluptatem accusantium doloremque</a></li>
					</ul>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="widget">
					<h5 class="widgetheading">Recent News</h5>
					<ul class="link-list">
						<li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></li>
						<li><a href="#">Pellentesque et pulvinar enim. Quisque at tempor ligula</a></li>
						<li><a href="#">Natus error sit voluptatem accusantium doloremque</a></li>
					</ul>
				</div>
			</div>
			
		</div>
	</div>
	<div id="sub-footer">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="copyright">
						<p>
							Copyright &copy; 2017-2020 辉煌集团 All rights reserved.
						</p>
					</div>
				</div>
				<div class="col-lg-6">
					<ul class="social-network">
						<li><a href="#" data-placement="top" title="Facebook"><i class="fa fa-facebook"></i></a></li>
						<li><a href="#" data-placement="top" title="Twitter"><i class="fa fa-twitter"></i></a></li>
						<li><a href="#" data-placement="top" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
						<li><a href="#" data-placement="top" title="Pinterest"><i class="fa fa-pinterest"></i></a></li>
						<li><a href="#" data-placement="top" title="Google plus"><i class="fa fa-google-plus"></i></a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	</footer>
</div>
<a href="#" class="scrollup"><i class="fa fa-angle-up active"></i></a>
<!-- javascript
    ================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="js/jquery.js"></script>
<script src="js/jquery.easing.1.3.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.fancybox.pack.js"></script>
<script src="js/jquery.fancybox-media.js"></script> 
<script src="js/portfolio/jquery.quicksand.js"></script>
<script src="js/portfolio/setting.js"></script>
<script src="js/jquery.flexslider.js"></script>
<script src="js/animate.js"></script>
<script src="js/custom.js"></script>
<script src="js/owl-carousel/owl.carousel.js"></script>
</body>
</html>
