<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="content-type" charset="text/html;charset=utf-8"/>
<title>家长后台管理</title>
<meta name="keywords"  content="设置关键词..." />
<meta name="description" content="设置描述..." />
<meta name="author" content="DeathGhost" />
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
<link rel="icon" href="images/icon/favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="css2/style.css" />
<script src="javascript/jquery.js"></script>
<script src="javascript/plug-ins/customScrollbar.min.js"></script>
<script src="javascript/plug-ins/echarts.min.js"></script>
<script src="javascript/plug-ins/layerUi/layer.js"></script>
<script src="editor/ueditor.config.js"></script>
<script src="editor/ueditor.all.js"></script>
<script src="javascript/plug-ins/pagination.js"></script>
<script src="javascript/public.js"></script>

<!-- 留言板css -->
<link href="css/bootstrap.min.css" rel="stylesheet" />
<link href="css/fancybox/jquery.fancybox.css" rel="stylesheet">
<link href="css/jcarousel.css" rel="stylesheet" />
<link href="css/flexslider.css" rel="stylesheet" />
<link href="css/style.css" rel="stylesheet" />
</head>
<body>
<div class="main-wrap">
	<div class="side-nav">
		<div class="side-logo">
			<div class="logo">
				<span class="logo-ico">
					<i class="i-l-1"></i>
					<i class="i-l-2"></i>
					<i class="i-l-3"></i>
				</span>
				<strong>家长后台管理</strong>
			</div>
		</div>
		
		<nav class="side-menu content mCustomScrollbar" data-mcs-theme="minimal-dark">
			<ul>
			    <li>
					<dl>
						<dt>
							<i class="icon-dashboard"></i>个人中心<i class="icon-angle-right"></i>
						</dt>
						<dd>
							<a href="parent_pass.jsp">修改密码</a>
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>
							<i class="icon-columns"></i>孩子在校信息<i class="icon-angle-right"></i>
						</dt>
						<dd>
							<a href="parent_course.jsp">孩子的课程表</a>
						</dd>
						<dd>
							<a href="parent_score.jsp">孩子的成绩单</a>
						</dd>
						<dd>
							<a href="parent_homework.jsp">孩子的家庭作业</a>
						</dd>
						<dd>
							<a href="parent_leave.jsp">孩子的考勤情况</a>
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>
							<i class="icon-inbox"></i>联系老师<i class="icon-angle-right"></i>
						</dt>
						<dd>
							<a href="parent_teacher.jsp">教课老师</a>
						</dd>
						<dd>
							<a href="parent_qq.jsp">给老师留言</a>
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>
							<i class="icon-table"></i>消息中心<i class="icon-angle-right"></i>
						</dt>
						<dd>
							<a href="index.jsp">查看学校通知</a>
						</dd>
					</dl>
				</li>				
			</ul>
		</nav>
		
		<footer class="side-footer">© 辉煌集团 版权所有</footer>
		
	</div>
	<div class="content-wrap">
		<header class="top-hd">
			<div class="hd-lt">
				<a class="icon-reorder"></a>
			</div>
			<div class="hd-rt">
				<ul>
					<li>
						<a href="index.jsp" target="_blank"><i class="icon-home"></i>前台访问</a>
					</li>
					
					<li>
						<a><i class="icon-user"></i>家长:<em><%=session.getAttribute("user") %></em></a>
					</li>
					<li>
						<a><i class="icon-bell-alt"></i>系统消息</a>
					</li>
					<li>
						<a href="#" id="JsSignOut"><i class="icon-signout"></i>安全退出</a>
					</li>
				</ul>
			</div>
		</header>
		<main class="main-cont content mCustomScrollbar">
			<div class="page-wrap">
				<!--开始::内容-->
				<section class="page-hd">
					<header>
						<h2 class="title">给老师留言</h2>
					</header>
					<hr>
				</section>
			    <table>
			      <tr>
			         <td>
			           <p>您可以在下方给孩子的老师留言</p>
				       <div style="width:600px; right:50px"class="contact-form">					
		                   <form method="post" action="servlet/SendMsg" id="contactform" class="contact">
						     <div class="form-group has-feedback">
						     <label for="name">Name*</label>
						     <input type="text" class="form-control" name="name" placeholder="">
						     <i class="fa fa-user form-control-feedback"></i>
						     </div>
						     <div class="form-group has-feedback">
						       <label for="message">Message*</label>
						       <textarea class="form-control" rows="6" name="comment" placeholder=""></textarea>
					           <i class="fa fa-pencil form-control-feedback"></i>
					         </div>
						     <input type="submit" value="Submit" id="submit" class="submit btn btn-default">
					       </form>	
					   </div>
			         </td>
			        
			      </tr>
			    </table>
				<!--开始::结束-->
			</div>
		</main>
		<footer class="btm-ft">
			<p class="clear">
				<span class="fl">©Copyright 2017 辉煌集团</span>
			</p>
		</footer>
	</div>
</div>
</body>
</html>

