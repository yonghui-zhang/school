"use strict";
/* 振荡器（时钟滴答）
 * callback			：其 中的对象变量请使用闭包方式使用
 * run				：开始运行
 * clockTickFlag	：开始运行后如果该值为真就再次发起callback
 * interval			: 触发间隔时间
 * overstep			：最多执行次数,当该次数到达后停住运行,相当于超时时间，不同的是这里是次数
 * close			: 开始运行后随时可以通过close终止定时器
 */
function ClockTick(callback){
	var self = this; 
	var timeid = 0;
	this.overstep		= 10000;	//
	this.clockTickFlag	= true;	//
	this.interval		= 100;
	this.callback		= callback||function(){};
	 
	var tick = function(){
//		self.overstep --;
		if( self.clockTickFlag ){
			self.clockTickFlag = false;
			self.callback();
		}
//		if(self.overstep < 1 ){
//			self.overstep = 0;
//			self.close();
//			alert("ClockTick 已超时");
//		}
	};
	
	this.run = function(callback){
		this.callback = callback||function(){};
		this.close();
		tick();
		timeid = setInterval(tick,this.interval);
		return this;
	};
	
	this.close = function(){
		if(timeid){
			clearInterval(timeid);
			timeid = 0;
		}
		return this;
	};
	
	this.setOverstep = function(v){
		this.overstep = v;
		return this;
	};
	
	this.setInterval = function(v){
		this.interval = v;
		return this;
	};
	
	this.getTimeid = function(){
		return timeid;
	};
}


/* 分页
 * skipPageFunction  	：点击分页后调用的方法名称
 * ulSelector			：分页的ul选择器，如#ul .ul等等
 * pageTotal			：总页数
 * pageIndex			：当前页数
 
 */
function pageInit(skipPageFunction,ulSelector,pageTotal,pageIndex)
{
	pageTotal *= 1;
	pageIndex *= 1;
	$(ulSelector+' li').remove();
	var lastCount=0;
	var nextCount=0;
	if(pageIndex==1)
	{
		$(ulSelector).append('<li class="disabled"><a href="javascript:void(0)">首页</a></li>');
		$(ulSelector).append('<li class="disabled"><a href="javascript:void(0)">&laquo;</a></li>');
	}
	else
	{
		$(ulSelector).append('<li><a href="javascript:void(0)" onclick="'+skipPageFunction+'(1)">首页</a></li>');
		$(ulSelector).append('<li><a href="javascript:void(0)" onclick="'+skipPageFunction+'('+(pageIndex-1)+')">&laquo;</a></li>');
	}
	
	if(pageIndex>1)
	{
		lastCount=	pageIndex>4?lastCount=4:pageIndex-1;
		for(var i=0;i<lastCount;i++)
		{
			$(ulSelector).append('<li><a href="javascript:void(0)" onclick="'+skipPageFunction+'('+(pageIndex-lastCount+i)+')">'+(pageIndex-lastCount+i)+'</a></li>')
		}
	}
	$(ulSelector).append("<li class=\"active\"><a href=\"javascript:void(0)\">"+pageIndex+"</a></li>");
	if(pageIndex<pageTotal)
	{
		nextCount=(pageTotal-pageIndex)>4?nextCount=4:(pageTotal-pageIndex);
		for(var i=1;i<=nextCount;i++)
		{
			$(ulSelector).append('<li><a href="javascript:void(0)" onclick="'+skipPageFunction+'('+(pageIndex+i)+')">'+(pageIndex+i)+'</a></li>')
		}
	}
	if(pageIndex==pageTotal||pageTotal==1)
	{
		$(ulSelector).append('<li class="disabled"><a href="javascript:void(0)">&raquo;</a></li>');
		$(ulSelector).append('<li class="disabled"><a href="javascript:void(0)">尾页</a></li>');
	}
	else
	{
		if((pageTotal-pageIndex)>4)
		{
			$(ulSelector).append('<li ><a href="javascript:void(0)" style="border: 0px;background-color: transparent;">......</a></li>');
			$(ulSelector).append('<li ><a href="javascript:void(0)" onclick="'+skipPageFunction+'('+pageTotal+')">'+pageTotal+'</a></li>');
		}
		$(ulSelector).append('<li ><a href="javascript:void(0)" onclick="'+skipPageFunction+'('+(pageIndex+1)+')">&raquo;</a></li>');
		$(ulSelector).append('<li ><a href="javascript:void(0)" onclick="'+skipPageFunction+'('+pageTotal+')">尾页</a></li>');

	}
}


/* 带有遮罩层的弹出层
 * width		：宽度
 * height		：高度
 * closeDisplay	：是否显示关闭按钮
 * title		：标题
 * content		: 内容
 */
function CustomDialog(){
	var self = this; 
	this.closeDisplay=true;
	this.content='';
	this.title='';
	
	this.show=function()
	{
		$("#globalShade,#globalDialog").hide();
		$("#globalShade,#globalDialog").remove();
		
		var html='';
		html+='<div id="globalShade"></div>';
		html+='<div id="globalDialog">';
		html+='<div class="gl_dl_Title">';
		html+='<span class="gl_dl_Tl_Text">'+self.title+'</span>';
		if(self.closeDisplay)
		{
			html+='<span class="gl_dl_Tl_close"></span>';
			//关闭
		}
		html+='</div>';
		html+='<div class="globalDialogContent">'+self.content+'</div>';
		html+='<iframe class="dialogframe" src="about:blank" frameBorder=0 marginHeight=0 marginWidth=0></iframe>';
		html+='</div>';
		
		$('body').append(html);
		
	    var dialogWidt= $('#globalDialog').width();
	    var dialogHeight= $('#globalDialog').height();
	    
	    $("#globalDialog").css({
	    	marginLeft:'-'+dialogWidt/2+'px',
	        marginTop:'-'+dialogHeight/2+'px'
	    });
        
	    
	    $("#globalShade,#globalDialog").show();
		if(self.closeDisplay)
		{
		    $('.gl_dl_Tl_close').on('click',function(){
		    	self.close();
		    });
		}
	};
	
	this.close=function()
	{
		$("#globalShade,#globalDialog").hide();
		$("#globalShade,#globalDialog").remove();
	};	
}

/* 带有遮罩层的弹出层
 * content		               ：内容，可以是html、文字内容
 * closeDisplay		   ：是否显示右上角的关闭小图标
 * okCallback	               ：点击确定按钮触发事件
 * cancelCallback    ：点击取消按钮触发事件
 */
function ConfirmDialog(content,closeDisplay)
{
	var self = this; 
	this.okCallback		= function(){};
	this.cancelCallback	= function(){};
	this.okButtnContent='确定';
	this.cancelButtonContent='取消';
	
	//带有遮罩层的弹出框
	this.customDialog=null;
	
	this.show=function()
	{
		var html='';
		html+='<div id="confirmDialog">';
		html+='<div class="confirmDialog">';
		html+='<div class="confirmText">{hint}</div>';
		html+='<div class="confirmBtnDiv"><a href="javascript:void(0)" class="confirmOk">'+self.okButtnContent+'</a><a href="javascript:void(0)" class="confirmCancel">'+self.cancelButtonContent+'</a></div>';
		html+='</div>';
		html+='<iframe class="dialogframe" src="about:blank" frameBorder=0 marginHeight=0 marginWidth=0></iframe>';
		html+='</div>';		
		
		self.customDialog=new CustomDialog();
		self.customDialog.title='提示';
		self.customDialog.content=html.replace('{hint}',content);
		self.customDialog.closeDisplay=closeDisplay;//标题处是否显示关闭按钮
		//显示
		self.customDialog.show();
		
		$('.confirmOk').on('click', function() {
			self.okCallback();
			self.customDialog.close();
			
		});
		
		$('.confirmCancel').on('click', function() {
			self.cancelCallback();
			self.customDialog.close();
			
		});
	};
	this.close=function()
	{
		self.cancelCallback();
		self.customDialog.close();
	};
	
}

/* 提示类弹出层
 * content		: 内容
 */
function AlertDialog(content,callback){
	$("#globalAlertDialog").remove();
	var html='';
	html+='<div id="globalAlertDialog">';
	html+=content;
	html+='<iframe class="dialogframe" src="about:blank" frameBorder=0 marginHeight=0 marginWidth=0></iframe>';
	html+='</div>';
	var callack1 = callback||function(){};
	$('body').append(html);
	
    var dialogWidt= $('#globalAlertDialog').width();
    var dialogHeight= $('#globalAlertDialog').height();
    
    $("#globalAlertDialog").css({
    	marginLeft:'-'+dialogWidt/2+'px',
        marginTop:'-'+dialogHeight+'px'
    });
    
    $("#globalAlertDialog").fadeToggle("500");
    
    setTimeout(function () 
	{ 
	    $("#globalAlertDialog").fadeToggle("500",function(){
	    	$("#globalAlertDialog").remove();
	    		callack1();
	    });
	}, 3000);
}

/**
 * 封装的简单的成功操作提示框
 */
function SucceedDialog(content,callback){
	AlertDialog('<div><img style="margin-right:5px;" src="'+base_url+'resources/images/ok_icon.png" />'+content+'</div>',callback);
}
/**
 * 封装的简单的失败操作提示框
 */
function FailureDialog(content,callback){
	AlertDialog('<div><img style="margin-right:5px;" src="'+base_url+'resources/images/error_icon.png" />'+content+'</div>',callback);
}

/**
 * 雷达图
 * cavasId:画布id
 * scores得分数组
 * names名称数组
 */
function drawRadar(cavasId,scores,names,fillColor,fillColor2){
	var scores = scores||[0,0,0,0,0,0];
	var names  = names||["科研","管理","开发","基础","极客","保障"];
	var rv = new RadarView({
		id				: cavasId
		,useGuide		: false//是否显示中间的线
		,borderColor	: "#FFF"
		,lineColor		: "#FFF"
		,fillColor		: fillColor//芯颜色
		,fillColor2		: fillColor2//芯阴影颜色
		,fontFamily		: "微软雅黑,黑体,宋体"	//字体，请修改。
	});
	rv.draw(scores,names);
}

/**
 * 雷达图(用于多课程叠加)
 */
function drawRadarSubject(cavasId,scores){
	//scores格式:1,1,1,1,1,1-2,2,2,2,2,2-3,3,3,3,3,3。按照-来进行拆分
	//如果每个数组不满6个，下面会顺位补0补至6位
	if(scores!=null&&scores.length>0)
	{
		var scoresArray = scores.split("-");
		//var names  = ["极客","科研","开发","基础","保障","管理"];
		var names  = ["","","","","",""];
		var rv = new RadarView({
			id				: cavasId
			,borderColor	: "#FFF"
			,lineColor		: "#FFF"
			,fontFamily		: "微软雅黑,黑体,宋体",	//字体，请修改。
			use3D:false
			,useShadow:false
			,fillColor:"#FFF"
			,alpha:0.2
		}).draw([0,0,0,0,0,0],names).setOptions({useGuide:false});
		for(var i=0;i<scoresArray.length;i++)
		{
			var value=scoresArray[i].split(",");
			if(value.length<6)
			{
				var valueLength=value.length;
				for(var j=0;j<6-valueLength;j++)
				{
					value.push('0');
				}
			}
			rv.drawBody(value);
		}
	}
}
/**
 * 绘制大雷达图
 * @param cavasId
 * @param scores
 * @param names tag 是否绘制第二层 true绘制 false不绘制
 */
function drawRadars_big(cavasId,scores,names,tag,scores2){
	var scores = scores||[0,0,0,0,0,0];
	var names  = names||["极客","科研","开发","基础","保障","管理"];
	var tag=tag||false;
	var scores2=scores2||"0,0,0,0,0,0";
	
	var maxScore= 10001;
	
	var rv = new RadarView({
		id				: cavasId
		,pedestalBorderColor:"#f1f1f1"//底座边框颜色
		,pedestalBorderWidth:5//底座边框宽
		,bodyBoderColor:"#BFEEFC"//芯边框颜色
		,bodyBoderWidth:1//芯边框宽度
		,useBodyBoder:false//是否使用芯的边框
		,useGuide:false	//鼠标放上后是否显示线
		,fillColor		: "#BFEEFC"//芯填充色
		,fontFamily		: "微软雅黑,黑体,宋体"	//字体，请修改。
		,pedestalFillColor:"#FFFFFF"//底座填充颜色
		,pedestalAlpha:1//底座透明度
		,usePedestalShadow:false//底座使用使用阴影
		,use3D:false//芯是否使用3d效果
		,useShadow:false//芯是否有阴影
		,lineColor:"#CCCCCC"
		,maxScore:maxScore
	});
	rv.draw(scores,names).setOptions({"lineColor":"#CCCCCC"}).drawGuide();
	
	if(tag){
		//绘制第二层的芯边框
		rv.setOptions({
			useGuide:false		
			,useBodyBoder:true
			,useBodyFill:false
			,bodyBoderColor:"#1AC76B"
			,bodyBoderWidth:2
		}).drawBody(scores2).drawGuide();
	}
}

/**
 * 绘制小雷达图
 * @param cavasId
 * @param scores
 * @param names
 * @param pedestalBorderColor
 * @param pedestalBorderWidth
 */
function drawRadars_samll(cavasId,scores,names,pedestalBorderColor,pedestalBorderWidth){
	var scores = scores||[0,0,0,0,0,0];
	var names  = names||["极客","科研","开发","基础","保障","管理"];
	pedestalBorderColor=pedestalBorderColor||"#c8c8c8";
	pedestalBorderWidth=pedestalBorderWidth||2;
	
	var rv = new RadarView({
		id				: cavasId
		,pedestalBorderColor:pedestalBorderColor//底座边框颜色
		,pedestalBorderWidth:pedestalBorderWidth//底座边框宽
		,bodyBoderColor:"#52D7AD"//芯边框颜色
		,bodyBoderWidth:2//芯边框宽度
		,useBodyBoder:true//是否使用芯的边框
		,useGuide:false	//鼠标放上后是否显示线
		,fillColor		: "#e5f9f3"//芯填充色
		,fontFamily		: "微软雅黑,黑体,宋体"//字体，请修改
		,pedestalFillColor:"#FFFFFF"//底座填充颜色
		,pedestalAlpha:1//底座透明度
		,usePedestalShadow:false//底座使用使用阴影
		,use3D:false//芯是否使用3d效果
		,useShadow:false//芯是否有阴影
	});
	rv.draw(scores,names);
}

/**
 * 绘制星星
 */
function drawStart(imgUrl,parent)
{
	$('span[data-start-control=true]',parent).each(function(){
		var startValue=$(this).attr('data-start-value');
		var html='';

		if(startValue==null||startValue.length==0|| startValue!=null||startValue.length>=0)
		{
			if(startValue<=0 ||startValue>=5)
			{
				for(var i=0;i<5;i++)
				{
					html+='<img src="'+imgUrl+'resources/images/Star_golden.png"/>';
				}
			}
			else
			{
				html='';
				var godel_tmp='<img src="'+imgUrl+'resources/images/Star_golden.png"/>';
				var gray_tmp='<img src="'+imgUrl+'resources/images/Star_gray.png"/>';
				var half='<img src="'+imgUrl+'resources/images/Star_harf.png"/>';
				var godel='';
				var gray='';
				if(startValue-parseInt(startValue)>0){
					for(var j=1;j<=parseInt(startValue);j++){
						godel=godel+godel_tmp;
					}
					godel=godel+half;
					for(var j=(parseInt(startValue)+2);j<=5;j++){
						gray=gray+gray_tmp;
					}
				}else {
					for(j=1;j<=parseInt(startValue);j++){
						godel=godel+godel_tmp;
					}
					for(j=(parseInt(startValue)+1);j<=5;j++){
						gray=gray+gray_tmp;
					}
				}
				html= godel+gray;
				
			}
			$(this).html('');
			$(this).append(html);
		}
	});
}

//在LoginDialog之上进行的封装
function ShowLoginDialog(base_url,resource_url)
{
	LoginDialog(base_url,resource_url,true,true,true);
}

//在LoginDialog之上进行的封装
function ForceLoginDialogPage(base_url,resource_url)
{
	LoginDialog(base_url,resource_url,true,true,false);
}

//在RegisterDialog之上进行的封装
function ShowRegisterDialog(base_url,resource_url)
{
	RegisterDialog(base_url,resource_url,true);
}


$('.zc').on('click',function(){
	$('#user_login_dialog').remove();
	ShowRegisterDialog(base_url,resource_url);
	$('#userEmail').focus();
});

//显示登陆窗口,原始方法
function LoginDialog(base_url,resource_url,show_close,showRegister,gotoIndex)
{
	var host = window.location.host;
	if(host.indexOf('gschunqiu') > 0)
	{
		window.location.href= base_url+'guoshi/log';
		return;
	}
	$("#globalShade_login").remove();
	$("#user_login_dialog").remove();
	
	$('body').append('<div id="globalShade_login" style="z-index: 1007;"></div>');
	$("#globalShade_login").show();
	var timenow = new Date().getTime();
	var html='';
	html+='<div class="tccBox">';
		
		// html+='<div class="bg"></div>';
		html+='<div class="loginBox">';
			html+='<div class="loginconBox">';
				html+='<b class="closeB"></b>';
				html+='<div class="logo"><img src="'+resource_url+'resources/images/new/logo.png"/></div>';
				html+='<div class="login-content ">';
				html+='<div class="form">';
					html+='<form id="loginFrm" method="post" onkeydown="javascript:if(event.keyCode==13){return false;}">';
						html+='<div class="errtit"><label class="error"></label></div>';
						html+='<div class="form-group clearfix">';
							html+='<div class="usernameBox">';
								
								html+='<span class="glyphicon glyphicon-user"></span>';
								html+='<em></em>';
								html+='<input style="display:none" type="text">';
								html+='<input style="display:none" type="password">';
								html+='<input type="text" autocomplete="off" maxlength="60" name="username"  class="form-control" id="username" placeholder="请输入账号(手机或邮箱)">';
								html+='<ul class="on_changes">';
								html+='<li email="@qq.com"></li>';
								html+='<li email="@163.com"></li>';
								html+='<li email="@126.com"></li>';
								html+='<li email="@hotmail.com"></li>';
								html+='<li email="@sina.com"></li>';
								html+='<li email="@gmail.com"></li>';
								// html+='<li email="@21cn.com"></li>';
								// html+='<li email="@hotmail.com"></li>';
								// html+='<li email="@vip.qq.com"></li>';
								// html+='<li email="@yahoo.com"></li>';
								// html+='<li email="@tom.com"></li>';
								// html+='<li email="@vip.163.com"></li>';
								// html+='<li email="@188.com"></li>';
								// html+='<li email="@msn.com"></li>';
								// html+='<li email="@net263.com"></li>';
								// html+='<li email="@189.cn"></li>';
								// html+='<li email="@139.com"></li>';
								// html+='<li email="@integritytech.com.cn"></li>';
								html+='</ul>';
							html+='</div>';
							html+='<div class="errorMsg" align="left"></div>';
						html+='</div>';

						html+='<div class="form-group clearfix">';
							html+='<div class="passwordBox">';
								html+='<span class="glyphicon glyphicon-lock"></span>';
								html+='<em></em>';
								html+='<input type="password" autocomplete="off" maxlength="60" name="password" class="form-control" id="password" placeholder="请输入密码">';
							html+='</div>';
							html+='<div class="errorMsg" align="left"></div>';
						html+='</div>';

						html+='<div class="form-group clearfix" id="yzmdiv">';
							html+='<div class="yzmBox">';
								html+='<span class="glyphicon yzmicn"></span>';
								html+='<em></em>';
								html+='<input id="yzm" name="yzm" maxlength="6" class="form-control verifyCode" value="" placeholder="请输入验证码">';
								html+='<div class="yzmImg">';
									html+='<img src="'+base_url+'login/verify_image?d='+timenow+';"/>';
									html+='<a href="javascript:void(0)" class="change">换一张</a>';
								html+='</div>';
							html+='</div>';
							html+='<div class="errorMsg" id="errormsg_yzm" align="left"></div>';
						html+='</div>';

						html+='<div class="form-group clearfix">';
							html+='<div class="checkbox">';
								html+='<label>';
									html+='<input type="checkbox" name="autologin" value="1" class="autologin">下次自动登录';
								html+='</label>';
								html+='<span class="pull-right"><a href="'+base_url+'login/findpwd">忘记密码？</a></span>';
							html+='</div>';
						html+='</div>';

						html+='<div class="form-group">';
							html+='<button type="submit" class="btn loginBtn">登录</button>';
						html+='</div>';

						html+='<div class="form-group reminderDiv">';
							html+='<p><a href="javascript:void(0)" class="nowRegister">还没有账号？立即注册</a></p>';
						html+='</div>';

					html+='</form>';
				html+='</div>';
			html+='</div>';			
		html+='</div>';
	html+='</div>';
	
	$('body').append(html);
	CheckLoginDialog();
	$(".zccloseB").click(function(){
		$(".tccBox").remove();
	});

	$(".nowRegister").click(function(){
		$(".tccBox").remove();
		ShowRegisterDialog(base_url,resource_url);
	});

	$(".closeB").click(function(){
		$(".tccBox").remove();
		$("#globalShade_login").remove();
	});

	$(".change").click(function(){
		var timenow = new Date().getTime();
		$(".yzmImg").find("img").attr("src",base_url+"login/verify_image?d="+timenow);
	});

	$(".yzmImg").find("img").click(function(){
		var timenow = new Date().getTime();
		$(".yzmImg").find("img").attr("src",base_url+"login/verify_image?d="+timenow);
	});
	
	$(".loginBox").keydown(function(e){ 
		var curKey = e.which; 
		if(curKey == 13)
		{ 
			$('.loginBtn').click(); 
		} 
	}); 
	
	$('#goto_registerbtn').on('click',function(){
		$('#user_login_dialog').remove();
		ShowRegisterDialog(base_url,resource_url);
		$('#userEmail').focus();
	});
	
	//强制刷新一次验证码
	$('#user_login_dialog #verify_code').click();	

	//邮箱下拉菜单提示
	$.fn.extend({
		"changeTips":function(value){
			value = $.extend({
				divTip:""
			},value);
			
			//获取登录框的位置，然后对下拉提示的位置进行设定
			var left=$('.usernameBox').position().left+$('#username').position().left;
			var top = $('.usernameBox').position().top-49+$('#username').position().top;
			// $('.on_changes').css('left',left+'px');
			// $('.on_changes').css('top',top+'px');
			//变量提出来
			var fronts = "";//存放含有“@”之前的字符串
			var preFronts = "";//若fronts过长的话，存放截取之后的内容
			var taifronts = "";//带@符号的后缀
			
			var $this = $(this);
			var indexLi = 0;
			
			//点击document隐藏下拉层
			$(document).click(function(event){
				if($(event.target).attr("class") == value.divTip || $(event.target).is("li")){
					var liVal = $(event.target).text();
					taifronts=liVal.substring(liVal.indexOf("@"));
					$this.val(fronts+taifronts);
					blus();
				}else{
					blus();
				}
			});
			
			//隐藏下拉层
			function blus(){
				$(value.divTip).hide();
			}
			
			var sta = false;
			//键盘上下执行的函数
			function keychang(up){
				if(up == "up"){
					if(indexLi == 0){
						indexLi = $(value.divTip).children().length-1;
					}else{
						indexLi--;
					}
				}else{
					if(indexLi ==  $(value.divTip).children().length-1){
						indexLi = 0;
					}else{
						if(sta){
							indexLi++;
						}else{
							sta = true;
						}
						
					}
				}
				$(value.divTip).children().eq(indexLi).addClass("active").siblings().removeClass();	
			}
			
			//值发生改变时
			function valChange(){
				
				var tex = $this.val();//输入框的值
				var af = /@/;
				//返回包括@符号及其以后的串
				var regMail = new RegExp(tex.substring(tex.indexOf("@")));//有“@”之后的字符串,注意正则字面量方法，是不能用变量的。所以这里用的是new方式。
				
				//让提示层显示，并对里面的LI遍历
				if($.trim($this.val())==""){
					blus();
				}else{
					//根据判断输入的内容来决定是否显示下拉提示内容
					if(!af.test(tex)){//输入内容没有@符号
						return false;
					}
					//输入内容包含@符号,则进行截取,取得@符号之前的内容
					fronts = tex.substring(tex.indexOf("@"),0);
					if(fronts.length>16){
						preFronts=fronts.substring(0, 16)+'...';
					}else{
						preFronts=fronts;
					}
					
					$(value.divTip).show().children().each(function(index) {
						var valAttr = $(this).attr("email");
						//当输入的值有“@”的时候
						if(af.test(tex)){
							//如果含有“@”就截取输入框这个符号之前的字符串
							$(this).text(preFronts+valAttr);
							//判断输入的值“@”之后的值，是否含有和LI的email属性
							if(regMail.test($(this).attr("email"))){
								taifronts=valAttr;
								$(this).show();
							}else{
								$(this).hide();
							}
						}else{//当输入的值没有“@”的时候
							$(this).text(tex+valAttr);
						}
	                });
				}	
			}
			
			
			//输入框值发生改变的时候执行函数，这里的事件用判断处理浏览器兼容性;
			if($.browser.msie){
				$(this).bind("propertychange",function(){
					valChange();
				});
			}else{
				$(this).bind("input",function(){
					valChange();
				});
			}
			

			//鼠标点击和悬停LI
			$(value.divTip).children().hover(function(){
				indexLi = $(this).index();//获取当前鼠标悬停时的LI索引值;
				if($(this).index()>=0){
					$(this).addClass("active").siblings().removeClass();
					$this.focus();
					$this.blur();
				}	
			});
					
		
			//按键盘的上下移动LI的背景色
			$this.keydown(function(event){
				if(event.which == 38){//向上
					keychang("up");
					event.preventDefault();
					event.stopPropagation();
				}else if(event.which == 40){//向下
					keychang();
					event.preventDefault();
					event.stopPropagation();
				}else if(event.which == 13){ //回车
					var liVal = $(value.divTip).children().eq(indexLi).text();
					$this.val(liVal);
					$this.focus();
					$this.blur();
					blus();
				}
			});				
		}	
	});
	$("#username").changeTips({
		divTip:".on_changes"
	});

}
	

function CheckLoginDialog(){
	//登陆验证
	$("#loginFrm").validate({
		submitHandler:function(form){
			$('#user_register_dialog #form_errormsg').text('');
			var username=$('#username').val();
			var password=$('#password').val();
			
			var yzm='';
			var vTag='';
			if($('#yzmdiv').css('display')!='none'){
				yzm=$('#user_login_dialog #yzm').val();
				// vTag=$('#user_login_dialog #vTag').val();
			}		
			var remeberMe = $("input[name='autologin']:checked").val();
			if(remeberMe == undefined){
				remeberMe = 0;
			}

			$.post( base_url+"loginCtl/dialog_login", {username:username,password:password,yzm:yzm,rem:remeberMe}, function(data){
			
				if(data==null)
				{
					$('.errtit').css('display','block');
					$('.errtit').find("label").css('display','block');
					$('.errtit').html('用户名或密码错误！');
					$('#user_login_dialog #yzm').val('');
					$('#user_login_dialog #verify_code').click();
				}
				try
				{
					var json= (new Function(' return ' + data + ';'))();
					if(json.status==10)
					{

						var rul=json.result;
						var url = base_url+"login/findvation/"+rul;
						window.location.href=url;
					}
					if(json.status==1)
					{
						// console.log(json.result);
						// return;
						// document.write(json.result);
						// return;
						$('#user_login_dialog .errorMsg').css('display','none');
							$("#globalShade_login").remove();
							$('#user_login_dialog').css('display','none');
							var hash = window.location.hash;
							var url = window.location.href;
							url=url.replace(hash, "");
							window.location = url;
							// if(json.result[0].userIcon == 'resources/upload/images/DefaultUserIcon.png'){
							// 	var alt=getCookie("alt");
							// 	if(alt == null || alt == 'n'){
							// 		delCookie("alt",'');
							// 		setCookie("alt",'n');
							// 		window.location = url;
							// 	}else{
							// 		window.location = url;
							// 	}
							// }else{
							// 	delCookie("alt",'');
							// 	setCookie("alt",'y');
							// 	window.location = url;
							// }						
					}
					else
					{
						if(json.count>0){//显示验证码
							$('#yzmdiv').css('display','block');
						}
						$('.errtit').css('display','block');
						$('.errtit').find("label").css('display','block');
						$('.errtit').find("label").html(json.msg);
						//登陆失败后重新刷新验证码
						$('#user_login_dialog #yzm').val('');
						$('#user_login_dialog #verify_code').click();
					}
				}
				catch(e)
				{
					$('.errtit').css('display','block');
					$('.errtit').find("label").css('display','block');
					$('.errtit').find("label").html('用户名或密码错误！');
					$('#user_login_dialog #yzm').val('');
					$('#yzmdiv').css('display','block');
					$('#user_login_dialog #verify_code').click();
				}
			});
		}	
		,rules:{
			password:{
				required: true,
			},
			username:{
				required: true,
			},
		},
		messages:{
			password: {
                required: "请您输入密码"
            },
            username: {
                required: "请您输入账号",
            }
		},
		errorPlacement:function(error, ele){
			error.appendTo($(ele).parent().parent().find(".errorMsg"));			
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass).removeClass(validClass);			
			$(element).parent().addClass("errorDiv");		
		},
		unhighlight: function(element, errorClass, validClass) {
			$(".errtit").find("label").html("");
			$(element).removeClass(errorClass).addClass(validClass);			
			$(element).parent().removeClass("errorDiv");			
		}
	});
}



//显示注册窗口
function RegisterDialog(base_url,resource_url,show_close)
{
	$("#globalShade_login").remove();
	$("#user_register_dialog").remove();
	var timenow = new Date().getTime();
	$('body').append('<div id="globalShade_login" style="z-index: 1007;"></div>');
	$("#globalShade_login").show();
	
	var html='';
	html+='<div class="tccBox">';
		
		// html+='<div class="bg"></div>';
		html+='<div class="zcloginBox">';
			html+='<div class="zcloginconBox">';
				html+='<b class="zccloseB"></b>';
				html+='<div class="switch">';
					html+='<span class="setonSpan">手机注册</span>';
					html+='<span>邮箱注册</a>';
				html+='</div>';
				html+='<div class="zclogin-content">';
					html+='<div class="form">';
						html+='<form id="phoneregForm" method="post" onkeydown="javascript:if(event.keyCode==13){return false;}">';
							html+='<div class="errtit" id="phoneerr"><label class="error"></label></div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="nameBox">';
									html+='<span class="glyphicon glyphicon-user"></span>';
									html+='<em></em>';
									html+='<input style="display:none" type="text">';
									html+='<input style="display:none" type="password">';
									html+='<input type="text" class="form-control name" id="name" name="name" autocomplete="off" maxlength="15" placeholder="请输入您的昵称">';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>  ';
							html+='</div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="phoneBox">';
									html+='<span class="glyphicon glyphicon-phone"></span>';
									html+='<em></em>';
									html+='<input class="form-control phone" id="phone" autocomplete="off" maxlength="11" name="phone" placeholder="请输入您的手机号码">';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="yzmBox">';
									html+='<span class="glyphicon yzmicn"></span>';
									html+='<em></em>';
									html+='<input id="phoneyzm" name="phoneyzm" maxlength="6" class="form-control verifyCode" value="" placeholder="请输入验证码">';
									html+='<div class="yzmImg">';
									html+='<img id="phone_code" src="'+base_url+'login/verify_image?d='+timenow+';"/>';
									html+='<a href="javascript:void(0)" class="change">换一张</a>';
								html+='</div>';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="smscodeBox">';
									html+='<span class="glyphicon duanxin"></span>';
									html+='<em></em>';
									html+='<input id="smscode" name="smscode" maxlength="6" class="form-control smscode" value="" placeholder="短信验证码">';
									html+='<div class="sms" style="margin-left: 5px;">获取验证码</div>';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="zcpasswordBox">';
									html+='<span class="glyphicon glyphicon-lock"></span>';
									html+='<em></em>';
									html+='<input type="password" autocomplete="off" maxlength="20" name="zcpassword" class="form-control phonepwd" id="zcpassword" placeholder="请输入密码">';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							html+='<div class="form-group">';
								html+='<button type="submit" class="btn loginBtn1">注&nbsp;&nbsp;册</button>';
								
							html+='</div>';
							html+='<div class="form-group reminderDiv">';
								html+='<p>已有i春秋账号<a href="javascript:void(0)" class="nowLogin">立即登录</a></p>';
							html+='</div>';
						html+='</form>';
					html+='</div>';
				html+='</div>';
				html+='<div class="zclogin-content emailCon">';
					html+='<div class="form">';
						html+='<form id="emailRegForm" method="post" onkeydown="javascript:if(event.keyCode==13){return false;}">';
							html+='<div class="errtit" id="mailerr"><label class="error"></label></div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="nameBox">';
									html+='<span class="glyphicon glyphicon-user"></span>';
									html+='<em></em>';
									html+='<input style="display:none" type="text">';
									html+='<input style="display:none" type="password">';
									html+='<input type="text" class="form-control name" id="mailname"  maxlength="15" name="name" autocomplete="off" placeholder="请输入您的昵称">';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="emailBox">';
									html+='<span class="glyphicon glyphicon-envelope"></span>';
									html+='<em></em>';
									html+='<input class="form-control phone" id="email" autocomplete="off" maxlength="60" name="email" placeholder="请输入您的邮箱账号">';
									html+='<ul class="on_changes">';
									html+='<li email="@qq.com"></li>';
									html+='<li email="@163.com"></li>';
									html+='<li email="@126.com"></li>';
									html+='<li email="@sina.com"></li>';
									html+='<li email="@hotmail.com"></li>';
									html+='<li email="@gmail.com"></li>';
									// html+='<li email="@21cn.com"></li>';
									// html+='<li email="@hotmail.com"></li>';
									// html+='<li email="@vip.qq.com"></li>';
									// html+='<li email="@yahoo.com"></li>';
									// html+='<li email="@tom.com"></li>';
									// html+='<li email="@vip.163.com"></li>';
									// html+='<li email="@188.com"></li>';
									// html+='<li email="@msn.com"></li>';
									// html+='<li email="@net263.com"></li>';
									// html+='<li email="@189.cn"></li>';
									// html+='<li email="@139.com"></li>';
									// html+='<li email="@integritytech.com.cn"></li>';
									html+='</ul>';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="yzmBox">';
									html+='<span class="glyphicon yzmicn"></span>';
									html+='<em></em>';
									html+='<input id="mailyzm" name="mailyzm" maxlength="6" class="form-control verifyCode" value="" placeholder="请输入验证码">';
									html+='<div class="yzmImg">';
										html+='<img id="mail_code" src="'+base_url+'login/verify_image?d='+timenow+';"/>';
										html+='<a href="javascript:void(0)" class="change">换一张</a>';
									html+='</div>';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="zcpasswordBox">';
									html+='<span class="glyphicon glyphicon-lock"></span>';
									html+='<em></em>';
									html+='<input type="password" autocomplete="off" maxlength="20" name="zcpassword" class="form-control mailpwd" id="zcpassword" placeholder="请输入密码">';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							html+='<div class="form-group">';
								html+='<button type="submit" class="btn loginBtn1">注&nbsp;&nbsp;册</button>';
								
							html+='</div>';
							html+='<div class="form-group reminderDiv">';
								html+='<p>已有i春秋账号<a href="javascript:void(0)" class="nowLogin">立即登录</a></p>';
							html+='</div>';
						html+='</form>';
					html+='</div>';
				html+='</div>';
			html+='</div>';
		html+='</div>';	
	html+='</div>';
	$('body').append(html);

	// checkmailInput(base_url);
	// checkphoneInput(base_url);
	
	$(".nowLogin").click(function(){
		$(".tccBox").remove();
		ShowLoginDialog(base_url,resource_url);
	});

	$(".change").click(function(){
		var timenow = new Date().getTime();
		$(".yzmImg").find("img").attr("src",base_url+"login/verify_image?d="+timenow);
	});

	$(".yzmImg").find("img").click(function(){
		var timenow = new Date().getTime();
		$(".yzmImg").find("img").attr("src",base_url+"login/verify_image?d="+timenow);
	});
	
	$(".zccloseB").click(function(){
		$(".tccBox").remove();
		$("#globalShade_login").remove();
	});
	$(".switch span").click(function(){
		var timenow = new Date().getTime();
		$(".yzmImg").find("img").attr("src",base_url+"login/verify_image?d="+timenow);
		$(this).addClass("setonSpan").siblings("span").removeClass("setonSpan");
		var tabIndex = $(".switch span").index(this); 
		$(".zclogin-content").eq(tabIndex).show().siblings(".zclogin-content").hide();
		$("#phoneerr").css("display","none");
		$("#mailerr").css("display","none");
	}); 

	$(".zcloginBox").keydown(function(e){ 
		var curKey = e.which; 
		if(curKey == 13)
		{ 
			$('.zcloginBox .loginBtn1').click(); 
		} 
	}); 
	
	$(".zcloginBox").keydown(function(e){ 
		var curKey = e.which; 
		if(curKey == 13)
		{ 
			$('.loginBtn').click(); 
		} 
	}); 
	
	//注册验证	
	//点击获取短信验证码按钮
	$('.sms').click(function(){
		//先清除之前的提示信息
		$('.error').html('');
		
		//验证昵称
		var name= $.trim($('#name').val());
		if(name==null || name==''){
			$('#name').addClass('error');
			$('#name').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">请输入您的昵称</label>');
			$('#name').parent('.nameBox').addClass('errorDiv1');
			return false;
		}else{
			//len验证 和内容验证 
			var reg=/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
			if(!reg.test(name)){
				$('#name').addClass('error');
				$('#name').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">只能包括中文、英文字母、数字和下划线</label>');
				$('#name').parent('.nameBox').addClass('errorDiv1');
				return false;
			}
			
			var len = parseInt(name.replace(/[^\x00-\xff]/g, '__').length);
			var tag = false;
			if(len<16 && len>3){
				tag=true;
			}
			if(!tag){
				$('#name').addClass('error');
				$('#name').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">4-15位字符</label>');
				$('#name').parent('.nameBox').addClass('errorDiv1');
				return false;
			}
			
			$('#name').removeClass('error');
			$('#name').parent().parent().find(".zcerrorMsg").html('');
			$('#name').parent('.nameBox').removeClass('errorDiv1');
		}

		//验证手机
		var phone= $.trim($('#phone').val());
		if(phone==null || phone==''){
			$('#phone').addClass('error');
			$('#phone').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">请您输入手机号码</label>');
			$('#phone').parent('.phoneBox').addClass('errorDiv1');
			return false;
		}else{
			//验证手机格式
			var reg=/^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
			if(reg.test(phone)){
				$('#phone').removeClass('error');
				$('#phone').parent().parent().find(".zcerrorMsg").html('');
				$('#phone').parent('.phoneBox').removeClass('errorDiv1');
			}else{
				$('#phone').addClass('error');
				$('#phone').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">手机号码格式不正确</label>');
				$('#phone').parent('.phoneBox').addClass('errorDiv1');
				return false;
			}
		}

		//验证验证码
		var yzm=$.trim($('#phoneyzm').val());
		if(yzm==null || yzm==''){
			$('#phoneyzm').addClass('error');
			$('#phoneyzm').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">请您输入验证码</label>');
			$('#phoneyzm').parent('.phoneBox').addClass('errorDiv1');
			return false;
		}else{
			//验证验证码度
			if(yzm.length!=4){
				$('#phoneyzm').addClass('error');
				$('#phoneyzm').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">请输入4位验证码</label>');
				$('#phoneyzm').parent('.phoneBox').addClass('errorDiv1');
				return false;
			}else{
				$('#phoneyzm').removeClass('error');
				$('#phoneyzm').parent().parent().find(".zcerrorMsg").html('');
				$('#phoneyzm').parent('.phoneBox').removeClass('errorDiv1');
			}
		}
		// checkphonesms();
		$.ajax({
			type: "post",
			url: base_url+"login/chkverifycode",
			data: {vecode:yzm},
			dataType: "json",
			success: function(data) {
				if(data==true){
					//发送短信
					$.ajax({
						type: "get",
						url: base_url+"register/sendMsgRegister",
						data: {phone:phone,phoneyzm:yzm},
						dataType: "json",
						success: function(data) {
							//先清除样式
							// $('#errormsg').html('');
							if(data.status==1){//发送成功
								$('.errtit').css("display","block");
								$('.errtit').find("label").css("display","block");
								$('.errtit').find("label").html(data.msg);
							}else{//发送失败
								$('.errtit').css("display","block");
								$('.errtit').find("label").css("display","block");
								$('.errtit').find("label").html(data.msg);
							}
						},
						error: function(data) {//其他异常
							$('#phoneyzm').val('');
							$('.errtit').css("display","block");
							$('.errtit').find("label").css("display","block");
							$('.errtit').find("label").html('短信发送失败,请稍候重试');
						}
					}); 
				}else{
					$('#phoneyzm').addClass('error');
					$('#phoneyzm').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">验证码错误</label>');
					$('#phoneyzm').parent('.phoneBox').addClass('errorDiv1');
				}
			},
			error: function(data) {//其他异常
			}
		});
	});	

	
	//邮箱下拉菜单提示
	$.fn.extend({
		"changeTips":function(value){
			value = $.extend({
				divTip:""
			},value);
			
			//获取登录框的位置，然后对下拉提示的位置进行设定
			var left=$('.emailBox').position().left+$('#email').position().left;
			var top = $('.emailBox').position().top-49+$('#email').position().top;
			// $('.on_changes').css('left',left+'px');
			// $('.on_changes').css('top',top+'px');
			//变量提出来
			var fronts = "";//存放含有“@”之前的字符串
			var preFronts = "";//若fronts过长的话，存放截取之后的内容
			var taifronts = "";//带@符号的后缀
			
			var $this = $(this);
			var indexLi = 0;
			
			//点击document隐藏下拉层
			$(document).click(function(event){
				if($(event.target).attr("class") == value.divTip || $(event.target).is("li")){
					var liVal = $(event.target).text();
					taifronts=liVal.substring(liVal.indexOf("@"));
					$this.val(fronts+taifronts);
					blus();
				}else{
					blus();
				}
			});
			
			//隐藏下拉层
			function blus(){
				$(value.divTip).hide();
			}
			
			var sta = false;
			//键盘上下执行的函数
			function keychang(up){
				if(up == "up"){
					if(indexLi == 0){
						indexLi = $(value.divTip).children().length-1;
					}else{
						indexLi--;
					}
				}else{
					if(indexLi ==  $(value.divTip).children().length-1){
						indexLi = 0;
					}else{
						if(sta){
							indexLi++;
						}else{
							sta = true;
						}
					}
				}
				$(value.divTip).children().eq(indexLi).addClass("active").siblings().removeClass();
			}
			
			//值发生改变时
			function valChange(){
				
				var tex = $this.val();//输入框的值
				var af = /@/;
				//返回包括@符号及其以后的串
				var regMail = new RegExp(tex.substring(tex.indexOf("@")));//有“@”之后的字符串,注意正则字面量方法，是不能用变量的。所以这里用的是new方式。
				
				//让提示层显示，并对里面的LI遍历
				if($.trim($this.val())==""){
					blus();
				}else{
					//根据判断输入的内容来决定是否显示下拉提示内容
					if(!af.test(tex)){//输入内容没有@符号
						return false;
					}
					//输入内容包含@符号,则进行截取,取得@符号之前的内容
					fronts = tex.substring(tex.indexOf("@"),0);
					if(fronts.length>16){
						preFronts=fronts.substring(0, 16)+'...';
					}else{
						preFronts=fronts;
					}
					
					$(value.divTip).show().children().each(function(index) {
						var valAttr = $(this).attr("email");
						//当输入的值有“@”的时候
						if(af.test(tex)){
							//如果含有“@”就截取输入框这个符号之前的字符串
							$(this).text(preFronts+valAttr);
							//判断输入的值“@”之后的值，是否含有和LI的email属性
							if(regMail.test($(this).attr("email"))){
								taifronts=valAttr;
								$(this).show();
							}else{
								$(this).hide();
							}
						}else{//当输入的值没有“@”的时候
							$(this).text(tex+valAttr);
						}
	                });
				}	
			}
			
			
			//输入框值发生改变的时候执行函数，这里的事件用判断处理浏览器兼容性;
			if($.browser.msie){
				$(this).bind("propertychange",function(){
					valChange();
				});
			}else{
				$(this).bind("input",function(){
					valChange();
				});
			}
			

			//鼠标点击和悬停LI
			$(value.divTip).children().hover(function(){
				indexLi = $(this).index();//获取当前鼠标悬停时的LI索引值;
				if($(this).index()>=0){
					$(this).addClass("active").siblings().removeClass();
					$this.focus();
					$this.blur();
				}	
			});
					
			var hei = $(".on_changes").height();//取得邮箱提示下拉框的高度
			//按键盘的上下移动LI的背景色
			$this.keydown(function(event){
				if(event.which == 38){//向上
					keychang("up");
					event.preventDefault();
					event.stopPropagation();
				}else if(event.which == 40){//向下
					keychang();
					event.preventDefault();
					event.stopPropagation();
				}else if(event.which == 13){ //回车
					var liVal = $(value.divTip).children().eq(indexLi).text();
					$this.val(liVal);
					$this.focus();
					$this.blur();
					blus();
				}
			});				
		}	
	});
	$("#email").changeTips({
		divTip:".on_changes"
	});


jQuery.validator.addMethod("stringCheck", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value);
    }, "只能包括中文、英文字母、数字和下划线");
    //手机格式验证
	jQuery.validator.addMethod("phoneCheck", function (value, element) {
        return this.optional(element) || /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(value);
    }, "手机号码格式不正确");
	//邮箱验证
    jQuery.validator.addMethod("emailCheck", function (value, element) {
    		return this.optional(element) || 
    		/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value);
    }, "邮箱格式不正确");
	//4-15位字符验证
    jQuery.validator.addMethod("lengthCheck", function (value, element) {
		var len = parseInt(value.replace(/[^\x00-\xff]/g, '__').length);
		var tag = false;
		if(len<16 && len>3){
			tag=true;
		}
    	return this.optional(element) || tag;
    }, "4-15位字符，支持汉字、字母、数字及下划线组合");

	//昵称中不允许的敏感词
	// jQuery.validator.addMethod("mgWordCheck", function (value, element) {
	// 	var sparr = new Array();
	// 	sparr = nicknames.toLowerCase().split(",");
	// 	var leng = parseInt(sparr.length);
	// 	var tas = true;
	// 	var val=value.toLowerCase();
	// 	for(var i=0;i<leng;i++){
	// 		if(val.indexOf(sparr[i]) >= 0){
	// 			tas=false;
	// 		}
	// 	}
	// 	jQuery.validator.messages.mgWordCheck = "昵称已经存在,请重新输入!";

	// 	return this.optional(element) || tas;
	// });

	//密码中不允许的特殊字符
	var balckWord='';
    jQuery.validator.addMethod("strCheck", function (value, element) {
    	var sparr = new Array();
    	sparr = special.split(",");
		var leng = parseInt(sparr.length);
		var tas = true;
		for(var i=0;i<leng;i++){
			if(value.indexOf(sparr[i]) >= 0){
				tas=false;
				balckWord = sparr[i];
			}
		}
		
		jQuery.validator.messages.strCheck = "密码中不允许含有 '"+balckWord+"'";

    	return this.optional(element) || tas;
    }, balckWord);


	$("#phoneregForm").validate({
		submitHandler:function(form){
			$('#user_register_dialog #form_errormsg').text('');
			var name = $("#name").val();
			var phone=$('#phone').val();
			var userPwd=$('.phonepwd').val();
			var smscode=$('#smscode').val();
			var yzm=$('#phoneyzm').val();
			$.post( base_url+"registerCtl/dialog_registerUser", {name:name,phone:phone,userPwd:userPwd,smscode:smscode,yzm:yzm}, function(data){
				if(data==null)
				{	
					$('.errtit').css("display","block");
					$('.errtit').find("label").css("display","block");
					$('.errtit').find("label").html("注册失败！");
					$('#phoneyzm').val('');
					$('.change').click();
				}
				try
				{
					var json= (new Function(' return ' + data + ';'))();
					if(json.status==1)
					{
						var url = user_site_url + "register/sendmail";
						window.location.href=url;
						$("#globalShade_login").remove();
						$(".tccBox").remove();
					}
					else
					{
						$('#phoneerr').css("display","block");
						$('#phoneerr').find("label").css("display","block");
						$('#phoneerr').find("label").html(json.msg);
						//登陆失败后重新刷新验证码
						$('#phoneyzm').val('');
						$('.change').click();
					}
				}
				catch(e)
				{	
					$('#phoneerr').css("display","block");
					$('#phoneerr').find("label").css("display","block");
					$('#phoneerr').find("label").html('注册失败！');
					$('#phoneyzm').val('');
					$('.change').click();
				}
			});
	   	} 
		,rules:{
			name:{
				required: true,
				stringCheck: true,
				lengthCheck:true,
				remote:{
					url :base_url+'registerCtl/chkname',
					type:'post',
					data:{
						'name' : function(){
							return $('#name').val();
						}
					},
					beforeSend:function(){
					},
					complete :function(){
					}
				}
			},
			phone:{
				required: true,
				phoneCheck:true,
				remote:{
					url :base_url+'registerCtl/chkphone',
					type:'post',
					data:{
						'phone' : function(){
							return $('#phone').val();
						}
					},
					beforeSend:function(){
					},
					complete :function(){
					}
				}
			},
			zcpassword:{
				strCheck: true,
				required: true,
                rangelength: [6, 20]
			},
			smscode:{
				required: true,
				rangelength: [6, 6]
			},
			phoneyzm:{
				required: true,
				rangelength: [4, 4],
				remote:{
					url :base_url+'login/chkverifycode',
					type:'post',
					data:{
						'vecode' : function(){
							return $('#phoneyzm').val();
						}
					},
					beforeSend:function(){
					},
					complete :function(){
					}
				}
			}			
		},
		messages:{
			name:{
                required: "4-15位字符，支持汉字、字母、数字及下划线组合",
                stringCheck : "4-15位字符，支持汉字、字母、数字及下划线组合",
                rangelength: "4-15位字符，支持汉字、字母、数字及下划线组合",
                remote:jQuery.format("昵称已存在")
            },
			phone:{
				required: "请您输入手机号码",
				phoneCheck:"手机号码格式不正确",
				remote:jQuery.format("手机号已注册")
			},
			zcpassword:{
                required: "请您输入密码",
                rangelength: "用户密码 6～20个字符之间"
            },
			smscode:{
				required: "请您输入短信验证码",
				rangelength: "请输入6位短信码"
			},
			phoneyzm:{
				required: "请您输入验证码",
				rangelength: "请输入4位验证码",
				remote:jQuery.format("验证码错误")
			},
		},
		errorPlacement:function(error, ele){
			$(ele).parent().parent().find(".zcerrorMsg").html('');
			error.appendTo($(ele).parent().parent().find(".zcerrorMsg"));
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass).removeClass(validClass);			
			$(element).parent().addClass("errorDiv1");
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass(errorClass).addClass(validClass);
			$(element).parent().removeClass("errorDiv1");		
			$(element).parent().parent().find('.zcerrorMsg').html('');	
		}
	});	



	$("#emailRegForm").validate({
		submitHandler:function(form){
			$('#user_register_dialog #form_errormsg').text('');
			var name = $("#mailname").val();
			var email=$('#email').val();
			var userPwd=$('.mailpwd').val();
			var yzm=$('#mailyzm').val();
			$.post( base_url+"registerCtl/dialog_registerUserEmail", {name:name,email:email,userPwd:userPwd,yzm:yzm}, function(data){
				if(data==null)
				{	
					$('#mailerr').css("display","block");
					$('#mailerr').find("label").css("display","block");
					$('#mailerr').find("label").html('注册失败！');
					$('#mailyzm').val('');
					$('.change').click();
				}
				try
				{
					var json= (new Function(' return ' + data + ';'))();
					if(json.status==10)
					{
						var reg = new RegExp("/","g");
						var rul=json.result.replace(reg,"*");
						var url = base_url+"login/activation/"+rul;
						window.location.href=url;
					}
					if(json.status==1)
					{
						var le = email.split("@");
						var len = le.length;
						email = email.substring(0,3)+'******@'+le[len-1];
						var url=base_url+"register/dialog_jump/"+email;
						window.location.href=url;
						$("#globalShade_login").remove();
						$(".tccBox").remove();
					}
					else
					{
						$('#mailerr').css("display","block");
						$('#mailerr').find("label").css("display","block");
						$('#mailerr').find("label").html(json.msg);
						//登陆失败后重新刷新验证码
						$('#mailyzm').val('');
						$('.change').click();
					}
				}
				catch(e)
				{
					$('#mailerr').css("display","block");
					$('#mailerr').find("label").css("display","block");
					$('#mailerr').find("label").html('注册失败！');
					$('#mailyzm').val('');
					$('.change').click();
				}
			});
	   	} 
		,rules:{
			name:{
				required: true,
				stringCheck: true,
				lengthCheck:true,
				remote:{
					url :base_url+'registerCtl/chkname',
					type:'post',
					data:{
						'name' : function(){
							return $('#mailname').val();
						}
					},
					beforeSend:function(){
					},
					complete :function(){
					}
				}
			},
			email: {
				required: true,
            	emailCheck: true,
            	remote:{
					url :base_url+'registerCtl/chkmail',
					type:'post',
					data:{
						'email' : function(){
							return $('#email').val();
						}
					},
					beforeSend:function(){
					},
					complete :function(){
					}
				}
        	},
        	zcpassword:{
				required: true,
				strCheck: true,
                rangelength: [6, 20]
			},
			emailyzm:{
				required: true,
				rangelength: [4, 4],
				remote:{
					url :base_url+'login/chkverifycode',
					type:'post',
					data:{
						'vecode' : function(){
							return $('#emailyzm').val();
						}
					},
					beforeSend:function(){
					},
					complete :function(){
					}
				}
			}			
		},
		messages:{
			name:{
                required: "4-15位字符，支持汉字、字母、数字及下划线组合",
                stringCheck : "4-15位字符，支持汉字、字母、数字及下划线组合",
                rangelength: "4-15位字符，支持汉字、字母、数字及下划线组合",
                remote:jQuery.format("昵称已存在")
            },
            email: {
    			required: "请输入Email地址",
    			emailCheck: "请输入正确的email地址",
    			remote:jQuery.format("邮箱已注册")
   			},
			zcpassword:{
                required: "请您输入密码",
                rangelength: "用户密码 6～20个字符之间"
            },
			emailyzm:{
				required: "请您输入验证码",
				rangelength: "请输入4位验证码",
				remote:jQuery.format("验证码错误")
			}
		},
		errorPlacement:function(error, ele){
			$(ele).parent().parent().find(".zcerrorMsg").html('');
			error.appendTo($(ele).parent().parent().find(".zcerrorMsg"));
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass).removeClass(validClass);			
			$(element).parent().addClass("errorDiv1");
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass(errorClass).addClass(validClass);
			$(element).parent().removeClass("errorDiv1");			
		}
	});	
}

function checkphoneInput(base_url)
{
    
}

function checkmailInput(base_url)
{
  
}


function checkphonesms(base_url)
{
    jQuery.validator.addMethod("stringCheck", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value);
    }, "只能包括中文、英文字母、数字和下划线");
    //手机格式验证
	jQuery.validator.addMethod("phoneCheck", function (value, element) {
        return this.optional(element) || /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(value);
    }, "手机号码格式不正确");
	
	$("#phoneregForm").validate({
		rules:{
			name:{
				required: true,
				stringCheck: true,
				rangelength: [4, 15]
			},
			phone:{
				required: true,
				phoneCheck:true
			},
			smscode:{
				required: true,
				rangelength: [6, 6]
			},
			phoneyzm:{
				required: true,
				rangelength: [4, 4],
				remote:{
					url :base_url+'login/chkverifycode',
					type:'post',
					data:{
						'vecode' : function(){
							return $('#phoneyzm').val();
						}
					},
					beforeSend:function(){
					},
					complete :function(){
					}
				}
			}			
		},
		messages:{
			name:{
                required: "4-15位字符，支持汉字、字母、数字及下划线组合",
                stringCheck : "4-15位字符，支持汉字、字母、数字及下划线组合",
                rangelength: "4-15位字符，支持汉字、字母、数字及下划线组合"
            },
			phone:{
				required: "请您输入手机号码",
				phoneCheck:"手机号码格式不正确"
			},
			smscode:{
				required: "请您输入短信验证码",
				rangelength: "请输入6位短信码"
			},
			phoneyzm:{
				required: "请您输入验证码",
				rangelength: "请输入4位验证码",
				remote:jQuery.format("验证码错误")
			},
		},
		errorPlacement:function(error, ele){
			$(ele).parent().parent().find(".zcerrorMsg").html('');
			error.appendTo($(ele).parent().parent().find(".zcerrorMsg"));
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass).removeClass(validClass);			
			$(element).parent().addClass("errorDiv1");
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass(errorClass).addClass(validClass);
			$(element).parent().removeClass("errorDiv1");		
			$(element).parent().parent().find('.zcerrorMsg').html('');	
		}
	});	
}

//显示填写手机号窗口
function updataphone(base_url,resource_url,show_close)
{
	$("#globalShade_login").remove();
	$("#user_register_dialog").remove();
	var timenow = new Date().getTime();
	$('body').append('<div id="globalShade_login" style="z-index: 1007;"></div>');
	$("#globalShade_login").show();
	
	var html='';
	
		// html+='<div class="bg"></div>';
		html+='<div class="redgb">';
			html+='<div class="zcloginconBox">';
				html+='<b class="closeBtn"></b>';
				html+='<div class="switch after">';
					
				html+='</div>';
				html+='<div class="zclogin-content">';
					html+='<div class="form">';
						html+='<form id="phoneregForm" method="post" onkeydown="javascript:if(event.keyCode==13){return false;}">';
							html+='<input style="display:none" type="text">';
							html+='<input style="display:none" type="password">';
							html+='<div class="form-group clearfix">';
								html+='<div class="phoneBox">';
									html+='<span class="glyphicon glyphicon-phone"></span>';
									html+='<em></em>';
									html+='<input class="form-control phone" id="phone" autocomplete="off" maxlength="11" name="phone" placeholder="请输入您的手机号码">';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="yzmBox">';
									html+='<span class="glyphicon glyphicon-envelope"></span>';
									html+='<em></em>';
									html+='<input id="phoneyzm" name="phoneyzm" maxlength="6" class="form-control verifyCode" value="" placeholder="请输入验证码">';
									html+='<div class="yzmImg">';
									html+='<img id="phone_code" src="'+base_url+'login/verify_image?d='+timenow+';"/>';
									html+='<a href="javascript:void(0)" class="change">换一张</a>';
								html+='</div>';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							html+='<div class="form-group clearfix">';
								html+='<div class="smscodeBox">';
									html+='<span class="glyphicon glyphicon-envelope"></span>';
									html+='<em></em>';
									html+='<input id="smscode" name="smscode" maxlength="6" class="form-control smscode" value="" placeholder="短信验证码">';
									html+='<div class="sms" style="margin-left: 5px;">获取验证码</div>';
								html+='</div>';
								html+='<div class="zcerrorMsg" align="left"></div>';
							html+='</div>';
							
							html+='<div class="form-group">';
								html+='<button type="submit" class="btn loginBtn1">立即领取</button>';
								html+='<div class="errtit"><label class="error"></label></div>';
							html+='</div>';
							
						html+='</form>';
					html+='</div>';
				html+='</div>';
			html+='</div>';
		html+='</div>';	

	$('body').append(html);

	checkupdatephoneInput(base_url);

	$(".closeBtn").click(function(){
		$(".redgb").remove();
		$("#globalShade_login").remove();
	});
	$(".change").click(function(){
		var timenow = new Date().getTime();
		$(".yzmImg").find("img").attr("src",base_url+"login/verify_image?d="+timenow);
	}); 
	$(".yzmImg").find("img").click(function(){
		var timenow = new Date().getTime();
		$(".yzmImg").find("img").attr("src",base_url+"login/verify_image?d="+timenow);
	});
	//注册验证	
	//点击获取短信验证码按钮
	$('.sms').click(function(){
		//先清除之前的提示信息
		$('.error').html('');
		
		//验证手机
		var phone= $.trim($('#phone').val());
		if(phone==null || phone==''){
			$('#phone').addClass('error');
			$('#phone').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">请您输入手机号码</label>');
			$('#phone').parent('.phoneBox').addClass('errorDiv1');
			return false;
		}else{
			//验证手机格式
			var reg=/^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
			if(reg.test(phone)){
				$('#phone').removeClass('error');
				$('#phone').parent().parent().find(".zcerrorMsg").html('');
				$('#phone').parent('.phoneBox').removeClass('errorDiv1');
			}else{
				$('#phone').addClass('error');
				$('#phone').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">手机号码格式不正确</label>');
				$('#phone').parent('.phoneBox').addClass('errorDiv1');
				return false;
			}
		}

		//验证验证码
		var yzm=$.trim($('#phoneyzm').val());
		if(yzm==null || yzm==''){
			$('#phoneyzm').addClass('error');
			$('#phoneyzm').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">请您输入验证码</label>');
			$('#phoneyzm').parent('.phoneBox').addClass('errorDiv1');
			return false;
		}else{
			//验证验证码度
			if(yzm.length!=4){
				$('#phoneyzm').addClass('error');
				$('#phoneyzm').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">请输入4位验证码</label>');
				$('#phoneyzm').parent('.phoneBox').addClass('errorDiv1');
				return false;
			}else{
				$('#phoneyzm').removeClass('error');
				$('#phoneyzm').parent().parent().find(".zcerrorMsg").html('');
				$('#phoneyzm').parent('.phoneBox').removeClass('errorDiv1');
			}
		}

		$.ajax({
			type: "post",
			url: base_url+"login/chkverifycode",
			data: {vecode:yzm},
			dataType: "json",
			success: function(data) {
				if(data==true){
					//发送短信
					$.ajax({
						type: "get",
						url: base_url+"register/sendMsgRegister",
						data: {phone:phone,phoneyzm:yzm},
						dataType: "json",
						success: function(data) {
							//先清除样式
							$('#errormsg').html('');
							if(data.status==1){//发送成功
								$('.errtit').css("display","block");
								$('.errtit').find("label").css("display","block");
								$('.errtit').find("label").html(data.msg);
							}else{//发送失败
								$('.errtit').css("display","block");
								$('.errtit').find("label").css("display","block");
								$('.errtit').find("label").html(data.msg);
							}
						},
						error: function(data) {//其他异常
							$('#phoneyzm').val('');
							$('.errtit').css("display","block");
							$('.errtit').find("label").css("display","block");

							FailureDialog('短信发送失败,请稍候重试');
						}
					}); 
				}else{
					$('#phoneyzm').addClass('error');
					$('#phoneyzm').parent().parent().find(".zcerrorMsg").html('<label for="phone_account" generated="true" class="error">验证码错误</label>');
					$('#phoneyzm').parent('.phoneBox').addClass('errorDiv1');
				}
			},
			error: function(data) {//其他异常
			}
		});
	});	
}

function checkupdatephoneInput(base_url)
{
    jQuery.validator.addMethod("stringCheck", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value);
    }, "只能包括中文、英文字母、数字和下划线");
    //手机格式验证
	jQuery.validator.addMethod("phoneCheck", function (value, element) {
        return this.optional(element) || /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(value);
    }, "手机号码格式不正确");
	
	$("#phoneregForm").validate({
		submitHandler:function(form){
			$('#user_register_dialog #form_errormsg').text('');
			
			var phone=$('#phone').val();
			
			var smscode=$('#smscode').val();
			var yzm=$('#phoneyzm').val();
			$.post( base_url+"activity/addphone", {phone:phone,smscode:smscode,yzm:yzm}, function(data){
				if(data==null)
				{	
					$('#phoneerr').css("display","block");
					$('#phoneerr').find("label").css("display","block");
					$('#phoneerr').find("label").html("注册失败！");
					$('#phoneyzm').val('');
					$('.change').click();
				}
				try
				{
					var json= (new Function(' return ' + data + ';'))();
					if(json.status==1)
					{
						$("#globalShade_login").remove();
						$(".redgb").remove();
						$(".button1").click();
					}
					else
					{
						$("#globalShade_login").remove();
						$(".redgb").remove();
						FailureDialog(data.msg);
						// $('#phoneerr').css("display","block");
						// $('#phoneerr').find("label").css("display","block");
						// $('#phoneerr').find("label").html(json.msg);
						// //登陆失败后重新刷新验证码
						// $('#phoneyzm').val('');
						// $('.change').click();
					}
				}
				catch(e)
				{	
					$('#phoneerr').css("display","block");
					$('#phoneerr').find("label").css("display","block");
					$('#phoneerr').find("label").html('注册失败！');
					$('#phoneyzm').val('');
					$('.change').click();
				}
			});
	   	}
		,rules:{
			phone:{
				required: true,
				phoneCheck:true
			},
			smscode:{
				required: true,
				rangelength: [6, 6]
			},
			phoneyzm:{
				required: true,
				rangelength: [4, 4],
				remote:{
					url :base_url+'login/chkverifycode',
					type:'post',
					data:{
						'vecode' : function(){
							return $('#phoneyzm').val();
						}
					},
					beforeSend:function(){
					},
					complete :function(){
					}
				}
			}			
		},
		messages:{
			phone:{
				required: "请您输入手机号码",
				phoneCheck:"手机号码格式不正确"
			},
			smscode:{
				required: "请您输入短信验证码",
				rangelength: "请输入6位短信码"
			},
			phoneyzm:{
				required: "请您输入验证码",
				rangelength: "请输入4位验证码",
				remote:jQuery.format("验证码错误")
			},
		},
		errorPlacement:function(error, ele){
			$(ele).parent().parent().find(".zcerrorMsg").html('');
			error.appendTo($(ele).parent().parent().find(".zcerrorMsg"));
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass).removeClass(validClass);			
			$(element).parent().addClass("errorDiv1");
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass(errorClass).addClass(validClass);
			$(element).parent().removeClass("errorDiv1");		
			$(element).parent().parent().find('.zcerrorMsg').html('');	
		}
	});	
}

//显示更换头像提示
function changeupic(base_url,resource_url,show_close,showRegister,gotoIndex)
{
	$("#globalShade_login").remove();
	$("#user_login_dialog").remove();
	
	$('body').append('<div id="globalShade_login" style="z-index: 1007;"></div>');
	$("#globalShade_login").show();
	var timenow = new Date().getTime();
	var html='';
	
		// html+='<div class="bg"></div>';
		html+='<div class="changebox">';
			html+='<div class="changemsgbox">';
				html+='<b class="closeB"></b>';
				html+='<div class="login-content ">';
				html+='<div class="changenotice"></div>';
				html+='<div class="noticehandlebox">';
					html+='<div class="noticechangebtn"></div>';
					html+='<div class="notnow"><span>现在没空</span></div>';
				html+='</div>';
				html+='<div class="changebrick"></div>';
			html+='</div>';			
		html+='</div>';

	
	$('body').append(html);



	$(".closeB").click(function(){
		$(".changebox").remove();
		$("#globalShade_login").remove();
	});

	$(".notnow").click(function(){
		$(".changebox").remove();
		$("#globalShade_login").remove();
	});

	$(".noticechangebtn").on("click",function(){
		window.location.href=base_url+"personal/index";
	});
}

/*js 获取cookie*/
function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
}

/*js 设置cookie*/
function setCookie(c_name,c_value){
	//获取当前时间 
	var date=new Date(); 
	var expiresDays=1; 
	//将date设置为1天以后的时间 
	date.setTime(date.getTime()+expiresDays*24*3600*1000); 
		document.cookie=c_name+"="+escape(c_value)+"; expires="+date.toGMTString()+";path=/"; 
}

//删除cookies 
function delCookie(c_name,c_value) 
{ 
    //获取当前时间 
	var date=new Date(); 
	var expiresDays=-1; 
	//将date设置为1天以后的时间 
	date.setTime(date.getTime()+expiresDays*24*3600*1000); 
		document.cookie=c_name+"="+escape(c_value)+"; expires="+date.toGMTString()+";path=/";
}


//将html标签转换为编码
function HtmlspecialcharsJS(str)
{
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/"/g, '&quot;');
	str = str.replace(/'/g, "&#39;");
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	return str;
}

//替换<script>
function stripscript(str) {  
    return str.replace(/<script.*?>.*?<\/script>/ig, '');  
} 

function sendMsg(base_url){

	//验证手机
	var phone= $.trim($('#phone').val());
	if(phone==null || phone==''){
		$('#phone').parent().parent().find(".tmp").addClass("checkErr");
		$('#phone').parent().parent().parent().find(".errorMsg").html('').html('请您输入手机号码');
		return false;
	}else{
		//验证手机格式
		var reg=/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
		if(reg.test(phone)){
			$('#phone').parent().parent().find(".tmp").removeClass("checkErr");
			$('#phone').parent().parent().parent().find(".errorMsg").html('');
		}else{
			$('#phone').parent().parent().find(".tmp").addClass("checkErr");
			$('#phone').parent().parent().parent().find(".errorMsg").html('').html('手机号码格式不正确');
			return false;
		}
	}
	
	//验证验证码
	var yzm=$.trim($('#yzm').val());
	if(yzm==null || yzm==''){
		$('#yzm').parent().parent().find(".tmp").addClass("checkErr");
		$('#yzm').parent().parent().parent().find(".errorMsg").html('').html('请您输入验证码');
		return false;
	}

	$.ajax({
		type: "post",
		url: base_url+"login/chkverifycode",
		data: {vecode:yzm},
		dataType: "json",
		success: function(data) {
			if(data==true){
				//发送短信
				$.ajax({
					type: "get",
					url: base_url+"register/sendMsgRegister",
					data: {phone:phone},
					dataType: "json",
					success: function(data) {
						//先清除样式
						$('#form_errormsg').html('');
						if(data.status==1){//发送成功
							$('#form_errormsg').html(data.msg);
						}else{//发送失败
							$('#form_errormsg').html(data.msg);
						}
						//变换验证码
						$('#yzm').val('');
						var timenow = new Date().getTime();
						$(".verify_code").attr("src",base_url+"login/verify_image?d="+timenow);
					},
					error: function(data) {//其他异常
						$('#yzm').val('');
						$('#form_errormsg').html('').html('短信发送失败');
						var timenow = new Date().getTime();
						$(".verify_code").attr("src",base_url+"login/verify_image?d="+timenow);
					}
				}); 
			}else{
			}
		},
		error: function(data) {//其他异常
		}
	});
}

/**
 * 邮箱下拉提示
 */
function alertEmail(){
	(function($){
		$.fn.extend({
			"changeTips":function(value){
				value = $.extend({
					divTip:""
				},value);
				
				//获取登录框的位置，然后对下拉提示的位置进行设定
				var left = $('#loginbackground').position().left;
				var top = $('#userEmail').position().top;
				$('.on_changes').css('left','40%');
				
				//变量提出来
				var fronts = "";//存放含有“@”之前的字符串
				var preFronts = "";//若fronts过长的话，存放截取之后的内容
				var taifronts = "";//带@符号的后缀
				
				var $this = $(this);
				var indexLi = 0;
				
				//点击document隐藏下拉层
				$(document).click(function(event){
					if($(event.target).attr("class") == value.divTip || $(event.target).is("li")){
						var liVal = $(event.target).text();
						taifronts=liVal.substring(liVal.indexOf("@"));
						$this.val(fronts+taifronts);
						blus();
					}else{
						blus();
					}
				});
				
				//隐藏下拉层
				function blus(){
					$(value.divTip).hide();
				}
				
				//键盘上下执行的函数
				function keychang(up){
					if(up == "up"){
						if(indexLi == 0){
							indexLi = $(value.divTip).children().length-1;
						}else{
							indexLi--;
						}
					}else{
						if(indexLi ==  $(value.divTip).children().length-1){
							indexLi = 0;
						}else{
							indexLi++;
						}
					}
					$(value.divTip).children().eq(indexLi).addClass("active").siblings().removeClass();	
				}
				
				//值发生改变时
				function valChange(){
					
					var tex = $this.val();//输入框的值
					var af = /@/;
					//返回包括@符号及其以后的串
					regMail = new RegExp(tex.substring(tex.indexOf("@")));//有“@”之后的字符串,注意正则字面量方法，是不能用变量的。所以这里用的是new方式。
					
					//让提示层显示，并对里面的LI遍历
					if($.trim($this.val())==""){
						blus();
					}else{
						//根据判断输入的内容来决定是否显示下拉提示内容
						if(!af.test(tex)){//输入内容没有@符号
							return false;
						}
						//输入内容包含@符号,则进行截取,取得@符号之前的内容
						fronts = tex.substring(tex.indexOf("@"),0);
						if(fronts.length>16){
							preFronts=fronts.substring(0, 16)+'...';
						}else{
							preFronts=fronts;
						}
						
						$(value.divTip).show().children().each(function(index) {
							var valAttr = $(this).attr("email");
							//当输入的值有“@”的时候
							if(af.test(tex)){
								//如果含有“@”就截取输入框这个符号之前的字符串
								$(this).text(preFronts+valAttr);
								//判断输入的值“@”之后的值，是否含有和LI的email属性
								if(regMail.test($(this).attr("email"))){
									taifronts=valAttr;
									$(this).show();
								}else{
									$(this).hide();
								}
							}else{//当输入的值没有“@”的时候
								$(this).text(tex+valAttr);
							}
		                });
					}	
				}
				
				
				//输入框值发生改变的时候执行函数，这里的事件用判断处理浏览器兼容性;
				if($.browser.msie){
					$(this).bind("propertychange",function(){
						valChange();
					});
				}else{
					$(this).bind("input",function(){
						valChange();
					});
				}
				

				//鼠标点击和悬停LI
				$(value.divTip).children().hover(function(){
					indexLi = $(this).index();//获取当前鼠标悬停时的LI索引值;
					if($(this).index()>=0){
						$(this).addClass("active").siblings().removeClass();
						$this.focus();
						$this.blur();
					}	
				});
						
			
				//按键盘的上下移动LI的背景色
				$this.keydown(function(event){
					if(event.which == 38){//向上
						keychang("up");
					}else if(event.which == 40){//向下
						keychang();
					}else if(event.which == 13){ //回车
						var liVal = $(value.divTip).children().eq(indexLi).text();
						$this.val(liVal);
						$this.focus();
						$this.blur();
						blus();
					}
				});				
			}	
		});
	})(jQuery);
}

//生成51CTO视频块
function Video51CTO(width,height,url)
{
	var video51='';
	video51 += '<div style="z-index: 1000;" style="width:'+width+'px;">';
	video51 += '<object align="middle" width="100%" pluginspage="http://www.macromedia.com/go/getflashplayer" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" allowscriptaccess="always" id="player_msie" name="ckplayer_a1" style="height:'+height+'px;">';
	video51 += '<param name="allowScriptAccess" value="always">';
	video51 += '<param value="http://edu.51cto.com/static/js/Player.swf?id='+url+'&amp;hlsPD=120&amp;autoplay=1&amp;share=0&amp;light=0" id="movie" name="movie">';
	video51 += '<param value="high" name="quality">';
	video51 += '<param value="playid=player" name="flashvars">';
	video51 += '<param value="transparent" name="wmode">';
	video51 +=  '<param value="true" name="allowFullScreen">';
	video51 += '<embed align="middle" width="'+width+'" allowscriptaccess="always" autostart="false" allowfullscreen="true" quality="high" bgcolor="#000" src="http://edu.51cto.com/static/js/Player.swf?id='+url+'&amp;hlsPD=120&amp;autoplay=1&amp;share=0&amp;light=0" flashvars="playid=player" name="ckplayer000" id="player_other" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="opaque" style="height:'+height+'px;">';
	video51 += '</object>';
	video51 += '</div>';
	return video51;
}


	$(function(){
					
		if($('body').find('.loginMain').length>=1){
						loginHei();
						$(window).resize(function(){
							loginHei();
						})
					}
					
	})
	function loginHei(){
				
			var winHei=$('.loginMain').offset().top;
			var loginMainHeight=$('.loginMain').height();
			var loginMainmt=loginMainHeight/2;
			if($(window).height()<=loginMainHeight+30){
			loginMainmt=30;
			$('.loginMain').css({'top':loginMainmt,'margin-top':0})
			}else{
				$('.loginMain').css({'top':'50%','margin-top':-loginMainmt,'height':loginMainHeight})
			}				
	}

 
var  checkTools={
	 		/*判断是不为null和undefined和空*/
			isNotNull:function(str){		
				//先判断是否undefined
				return (typeof(str) == undefined || str == null || str.length == 0) ? false : true;
			},
			stringCheck : function(str){
				var ruleStr=/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
				return 	this.isNotNull(str) && ruleStr.test(str);			 
			},	
			//验证手机号
			 phoneCheck : function(str){
			 	var ruleStr=/^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
				return 	this.isNotNull(str) &&  ruleStr.test(str);		
			},
		//验证邮箱
		 emailCheck : function(str){
		 	var ruleStr=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			return 	this.isNotNull(str) && ruleStr.test(str);
		},
		//验证字符长度(验证输入字符串长度)
		 strlenCheck : function(str,starNum,overNum){		
					var len = parseInt(str.replace(/[^\x00-\xff]/g, '__').length);
					var tag = false;
					if(len<=overNum && len>=starNum){
						tag=true;
					}
					return 	this.isNotNull(str) &&  tag;
			
		},		
		/*去除空格*/
	 	trimSpace : function(str){
	 		var restr=str.replace(/(^\s*)|(\s*$)/g,'');	 		
			return 	this.isNotNull(str)  &&  restr;
	 	}
}