<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="database.SelectDB, java.sql.ResultSet, utils.FloatValue"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="utf-8"/>
<title>管理员后台管理系统</title>
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
				<strong>管理员后台管理</strong>
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
							<a href="admin_pass.jsp">修改密码</a>
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>
							<i class="icon-columns"></i>人员管理<i class="icon-angle-right"></i>
						</dt>
						<dd>
							<a href="admin_teacher.jsp">教师管理</a>
						</dd>
						<dd>
							<a href="admin_student.jsp">学生管理</a>
						</dd>
						<dd>
							<a href="admin_parent.jsp">家长管理</a>
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>
							<i class="icon-inbox"></i>新闻管理<i class="icon-angle-right"></i>
						</dt>
						<dd>
							<a href="admin_edit.jsp">发表新闻</a>
						</dd>
						<dd>
							<a href="index.jsp">所有新闻</a>
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>
							<i class="icon-table"></i>消息中心<i class="icon-angle-right"></i>
						</dt>
						<dd>
							<a href="index.jsp">所有消息</a>
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
						<a><i class="icon-user"></i>管理员:<em><%=session.getAttribute("user")%></em></a>
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
						<h2 class="title">教师信息管理</h2>
					</header>
					<hr>
				</section>
				<table id="tablelist" class="table mb-15">
					<thead>
						<tr>
							<th>姓名</th>
							<th>性别</th>
							<th>职务</th>
							<th>年龄</th>
							<th>电话</th>
							<th>邮箱</th>
							<th>家庭住址</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<%
			          String sql = "select * from teacherInfo";
			          ResultSet rs = SelectDB.selectData(sql);
			          try{
			             while(rs.next())
			             {
			        %>
						<tr class="cen">
							<td><%=rs.getString("name")%></td>
							<td><%=rs.getString("sex")%></td>
							<td><%=rs.getString("job")%></td>
							<td><%=rs.getString("age")%></td>
							<td><%=rs.getString("phone")%></td>
							<td><%=rs.getString("mail")%></td>
							<td><%=rs.getString("address")%></td>
							<td>
								<a title="编辑" onclick="editTeacherTable(this)" class="mr-5">编辑</a>
								<a title="删除" onclick="deleteTeacherTable(this)">删除</a>
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
				    <input type="button" value="新增" id="newTeacher" class="submit btn btn-default">
				    <!-- 编辑表格和新建都是这个表格 -->
				    <div style="display:none;" id="newTeacherTable" class="form-group has-feedback">
				    <table id="addTable" class="table mb-15">
				      <tr>
				            <th>姓名</th>
							<th>性别</th>
							<th>职务</th>
							<th>年龄</th>
							<th>电话</th>
							<th>邮箱</th>
							<th>家庭住址</th>
							<th>操作</th>
				      </tr>
				      <tr class="cen">
							<td><input style="width:100px;" type="text" class="form-control"></td>
							<td><input style="width:100px;" type="text" class="form-control"></td>
							<td><input style="width:100px;" type="text" class="form-control"></td>
							<td><input style="width:100px;" type="text" class="form-control"></td>
							<td><input style="width:100px;" type="text" class="form-control"></td>
							<td><input style="width:100px;" type="text" class="form-control"></td>
							<td><input style="width:100px;" type="text" class="form-control"></td>
							<td>
								<input type="button" value="提交" id="submitTeacher" class="submit btn btn-default">
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

