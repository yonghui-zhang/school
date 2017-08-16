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
<!-- QQ聊天效果 -->
<link rel="stylesheet" type="text/css" href="css/chat.css" />
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/chat.js"></script>
</head>
<body>
<!-- 设置数据头来控制浏览器返回键也重新从服务器取数据 -->
<%
   response.setHeader("Cache-Control", "no-store");
   response.setHeader("Pragrma", "no-cache");
   response.setDateHeader("Expires", 0);
  %>
<div class="main-wrap2">
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
		
		<nav style="width:230px;" class="side-menu content mCustomScrollbar" data-mcs-theme="minimal-dark">
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
         <div class="content-wrap2">
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
						<h2 class="title">给家长留言</h2>
					</header>
					<hr>
				</section>
				   <div class="kePublic">
<!--效果html开始-->
    <div class="content">
        <div class="chatBox">
           <!-- 传递type值 -->
           <span id="type" style="display: none;"><%=session.getAttribute("type")%></span>
             <!-- 播放qq消息接收音效 -->
            <audio id="qqsound">
              <source src="sound/msg.wav" type="audio/wav">
              <source src="sound/msg.mp3" type="audio/mpeg">
            </audio>
           <div class="chatLeft">
                <div class="chat01">
                    <div class="chat01_title">
                        <ul class="talkTo">
                            <li><a href="javascript:;"></a></li></ul>
                        <a class="close_btn" href="javascript:;"></a>
                    </div>
                    <div class="chat01_content">
                        <div class="message_box mes1">
                        </div>
                        <div class="message_box mes2">
                        </div>
                        <div class="message_box mes3" style="display: block;">
                        </div>
                        <div class="message_box mes4">
                        </div>
                        <div class="message_box mes5">
                        </div>
                        <div class="message_box mes6">
                        </div>
                        <div class="message_box mes7">
                        </div>
                        <div class="message_box mes8">
                        </div>
                        <div class="message_box mes9">
                        </div>
                        <div class="message_box mes10">
                        </div>
                    </div>
                </div>
                <div class="chat02">
                    <div class="chat02_title">
                        <a class="chat02_title_btn ctb01" href="javascript:;"></a><a class="chat02_title_btn ctb02"
                            href="javascript:;" title="选择文件">
                            <embed width="15" height="16" flashvars="swfid=2556975203&amp;maxSumSize=50&amp;maxFileSize=50&amp;maxFileNum=1&amp;multiSelect=0&amp;uploadAPI=http%3A%2F%2Fupload.api.weibo.com%2F2%2Fmss%2Fupload.json%3Fsource%3D209678993%26tuid%3D1887188824&amp;initFun=STK.webim.ui.chatWindow.msgToolBar.upload.initFun&amp;sucFun=STK.webim.ui.chatWindow.msgToolBar.upload.sucFun&amp;errFun=STK.webim.ui.chatWindow.msgToolBar.upload.errFun&amp;beginFun=STK.webim.ui.chatWindow.msgToolBar.upload.beginFun&amp;showTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.showTipFun&amp;hiddenTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.hiddenTipFun&amp;areaInfo=0-16|12-16&amp;fExt=*.jpg;*.gif;*.jpeg;*.png|*&amp;fExtDec=选择图片|选择文件"
                                data="upload.swf" wmode="transparent" bgcolor="" allowscriptaccess="always" allowfullscreen="true"
                                scale="noScale" menu="false" type="application/x-shockwave-flash" src="http://service.weibo.com/staticjs/tools/upload.swf?v=36c9997f1313d1c4"
                                id="swf_3140">
                        </a><a class="chat02_title_btn ctb03" href="javascript:;" title="选择附件">
                            <embed width="15" height="16" flashvars="swfid=2556975203&amp;maxSumSize=50&amp;maxFileSize=50&amp;maxFileNum=1&amp;multiSelect=0&amp;uploadAPI=http%3A%2F%2Fupload.api.weibo.com%2F2%2Fmss%2Fupload.json%3Fsource%3D209678993%26tuid%3D1887188824&amp;initFun=STK.webim.ui.chatWindow.msgToolBar.upload.initFun&amp;sucFun=STK.webim.ui.chatWindow.msgToolBar.upload.sucFun&amp;errFun=STK.webim.ui.chatWindow.msgToolBar.upload.errFun&amp;beginFun=STK.webim.ui.chatWindow.msgToolBar.upload.beginFun&amp;showTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.showTipFun&amp;hiddenTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.hiddenTipFun&amp;areaInfo=0-16|12-16&amp;fExt=*.jpg;*.gif;*.jpeg;*.png|*&amp;fExtDec=选择图片|选择文件"
                                data="upload.swf" wmode="transparent" bgcolor="" allowscriptaccess="always" allowfullscreen="true"
                                scale="noScale" menu="false" type="application/x-shockwave-flash" src="http://service.weibo.com/staticjs/tools/upload.swf?v=36c9997f1313d1c4"
                                id="swf_3140">
                        </a>
                        <label class="chat02_title_t">
                            <a href="chat.htm" target="_blank">聊天记录</a></label>
                        <div class="wl_faces_box">
                            <div class="wl_faces_content">
                                <div class="title">
                                    <ul>
                                        <li class="title_name">常用表情</li><li class="wl_faces_close"><span>&nbsp;</span></li></ul>
                                </div>
                                <div class="wl_faces_main">
                                    <ul>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_01.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_02.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_03.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_04.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_05.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_06.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_07.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_08.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_09.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_10.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_11.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_12.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_13.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_14.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_15.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_16.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_17.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_18.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_19.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_20.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_21.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_22.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_23.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_24.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_25.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_26.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_27.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_28.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_29.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_30.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_31.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_32.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_33.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_34.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_35.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_36.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_37.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_38.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_39.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_40.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_41.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_42.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_43.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_44.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_45.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_46.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_47.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_48.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_49.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_50.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_51.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_52.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_53.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_54.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_55.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_56.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_57.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="img/emo_58.gif" /></a></li><li><a href="javascript:;">
                                                <img src="img/emo_59.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="img/emo_60.gif" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="wlf_icon">
                            </div>
                        </div>
                    </div>
                    <div class="chat02_content">
                        <textarea id="textarea"></textarea>
                    </div>
                    <div class="chat02_bar">
                        <ul>
                         
                            <li style="right: 5px; top: 5px;"><a href="#">
                                <img src="img/send_btn.jpg"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="chatRight">
                <div class="chat03">
                    <div class="chat03_title">
                        <label class="chat03_title_t">孩子的家长</label>
                    </div>
                    <div class="chat03_content">
                        <ul>
                         <%
                            String sql = "select * from parentInfo";
                            ResultSet rs = SelectDB.selectData(sql);
                            boolean first = true;
                            try{
                                while(rs.next())
                                {    
                                   if(first)
                                   {
                                     first = false;
                          %>
                             <li class="choosed">
                             <%
                                   }else{
                              %>
                              <li>
                              <%   }
                              %>
                                <label class="online"></label>
                                <a href="javascript:;">
                                    <img src="<%=rs.getString("headimg")%>"></a><a href="javascript:;" class="chat03_name"><%=rs.getString("name")%></a>
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
                </div>
            </div>
            <div style="clear: both;">
            </div>
        </div>
    </div>
<!--效果html结束-->
</div>
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

