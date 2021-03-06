<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="database.SelectDB, java.sql.ResultSet, utils.FloatValue"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="utf-8"/>
<title>教师后台管理</title>
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

<link href="css/style.css" rel="stylesheet" />

<!-- 自己写的js -->
<script type="text/javascript" src="js/myjs.js"></script>
</head>
<body>
<!-- 设置数据头来控制浏览器返回键也重新从服务器取数据 -->
<%
   response.setHeader("Cache-Control", "no-store");
   response.setHeader("Pragrma", "no-cache");
   response.setDateHeader("Expires", 0);
  %>
<div class="main-wrap">
	<div class="side-nav">
		<div class="side-logo">
			<div class="logo">
				<span class="logo-ico">
					<i class="i-l-1"></i>
					<i class="i-l-2"></i>
					<i class="i-l-3"></i>
				</span>
				<strong>教师后台管理</strong>
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
							<a href="teacher_pass.jsp">修改密码</a>
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>
							<i class="icon-columns"></i>班级管理<i class="icon-angle-right"></i>
						</dt>
						<dd>
							<a href="teacher_student.jsp">学生信息管理</a>
						</dd>
						<dd>
							<a href="teacher_score.jsp">学生成绩管理</a>
						</dd>
						<dd>
							<a href="teacher_homework.jsp">家庭作业管理</a>
						</dd>
						<dd>
							<a href="index.jsp">日常活动安排表</a>
						</dd>
						<dd>
							<a href="teacher_leave.jsp">请假管理</a>
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>
							<i class="icon-inbox"></i>联系家长<i class="icon-angle-right"></i>
						</dt>
						<dd>
							<a href="teacher_qq.jsp">给家长留言</a>
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
						<dd>
							<a href="teacher_edit.jsp">发布新通知</a>
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
						<a><i class="icon-user"></i>老师:<em><%=session.getAttribute("user")%></em></a>
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
						<h2 class="title">家庭作业管理</h2>
					</header>
					<hr>
				</section>
				<table id="tablelist" class="table mb-15">
					<thead>
						<tr>
							<th>课程</th>
							<th>教课老师</th>
							<th>作业内容</th>
							<th>布置作业的日期</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
					<%
			          String sql = "select * from homework";
			          ResultSet rs = SelectDB.selectData(sql);
			          try{
			             while(rs.next())
			             {
			        %>
						<tr class="cen">
							<td><%=rs.getString("course")%></td>
							<td><%=rs.getString("teacher")%></td>
							<td><%=rs.getString("homework")%></td>
							<td><%=rs.getString("date")%></td>
							<td>
								<a title="编辑" onclick="editHomeworkTable(this)" class="mr-5">编辑</a>
								<a title="删除" onclick="deleteHomework(this)">删除</a>
							</td>
						</tr>
				      <%
			           }
			            }catch(Exception e)
			            {
			              e.printStackTrace();
			            }
			          %>
					</tbody>
				</table>
				
				    <!-- 添加新增信息模块 -->
				<br/>
				<br/>
				<div class="contact-form contact">
				    <input type="button" value="新增" id="newHomework" class="submit btn btn-default">
				    <!-- 编辑表格和新建都是这个表格 -->
				    <div style="display:none;" id="newHomeworkTable" class="form-group has-feedback">
				    <table id="addTable" class="table mb-15">
				      <tr>
				        <th>课程</th>
							<th>教课老师</th>
							<th>作业内容</th>
							<th>布置作业的日期</th>
							<th>操作</th>
				      </tr>
				      <tr class="cen">
							<td><input style="width:200px;" type="text" class="form-control"></td>
							<td><input style="width:200px;" type="text" class="form-control"></td>
							<td><input style="width:200px;" type="text" class="form-control"></td>
							<td><input style="width:200px;" type="text" class="form-control"></td>
							<td>
								<input type="button" value="提交" id="submitHomework" class="submit btn btn-default">
							</td>
						</tr>
				    </table>
				    <span id="operflag" style="display:none;">xxxx</span>
				    </div>
				</div>
				<br/>
				<br/>           
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