var sourceval='';
$(function(){
	// 跳转注册页面
	$(".nowRegister").click(function () {
		var referer = $("#http_referer").html();
		$.ajax({
			type: "POST",
			url:base_url+"login/writeLog",
			data:{"referer":referer},
		});
	});

	// 验证码刷新
	$(".yzmImg").find("img").click(function(){
		var timenow = new Date().getTime();
		$(".yzmImg").find("img").attr("src",base_url+"login/verify_image?d="+timenow);
	});

	//企业账号忘记密码点击事件
	$(".qy-forget").on("click",function(){
		$(".forget-notice").show();
	});
	//实时密码加密
	
	$("#password").keyup(function(){
	  sourceval= $(this).val(); 
	});
	$('#password').blur(function(){
		var mixval=fn_login_encryption(sourceval);
		$(this).val(mixval)
	});
	$('#password').focus(function(){		 
		$(this).val(sourceval);
	});
	 $("#password").keydown(function(event) { 
	 	var keyCode = event.keyCode;
	 	if(keyCode==13){
	 		var mixval=fn_login_encryption(sourceval);
			$(this).val(mixval)
	 	}
	 	
	 });
	
	
	// 储存同步论坛登陆标识
	(localStorage.loginsource!='comeinuser')? localStorage.loginsource = 'comeinuser':null;


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
	
	/* 注册验证 */
	$("#loginFrm").validate({
		focusInvalid:false,
		focusCleanup:true,
		onkeyup:false,
		rules:{
			password:{
				required: true,
			},
			username:{
				required: true,
			}
		},
		messages:{
			password: {
                required: "请您输入密码"
            },
            username: {
                required: "请您输入账号"
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
			$(element).removeClass(errorClass).addClass(validClass);			
			$(element).parent().removeClass("errorDiv");			
		}
	});

	/* 企业注册验证 */
	// $("#qy-loginFrm").validate({
	//     focusInvalid:false,
	// 	focusCleanup:true,
	// 	onkeyup:false,
	// 	rules:{
	// 		password:{
	// 			required: true,
	// 		},
	// 		username:{
	// 			required: true,
	// 		},
	// 	},
	// 	messages:{
	// 		password: {
	//             required: "请您输入密码"
	//         },
	//         username: {
	//             required: "请您输入企业账号",
	//         }
	// 	},
	// 	errorPlacement:function(error, ele){
	// 		error.appendTo($(ele).parent().parent().find(".errorMsg"));			
	// 	},
	// 	highlight: function(element, errorClass, validClass) {
	// 		$(element).addClass(errorClass).removeClass(validClass);			
	// 		$(element).parent().addClass("errorDiv");		
	// 	},
	// 	unhighlight: function(element, errorClass, validClass) {
	// 		$(element).removeClass(errorClass).addClass(validClass);			
	// 		$(element).parent().removeClass("errorDiv");			
	// 	}
	// });

	// 切换登陆窗口 - 企业和个人
	// var gr = $(".gr").val();
	// var qy = $(".qy").val();
	
	// if(gr == '' && qy !== ''){
	// 	$(".enterprise-login").click();
	// }else if(gr !== '' && qy == ''){
	// 	$(".personal-login").click();
	// };
	// $(".personal-login").on("click",function(){
	// 	$(".enterprise-login").removeClass("changed");
	// 	$(this).addClass("changed");
	// 	$(".login-content").show();
	// 	$(".qylogin-content").hide();
		
	// 	$(".qynoticemsg").html("");
	// });
	// $(".enterprise-login").on("click",function(){
	// 	$(".personal-login").removeClass("changed");
	// 	$(this).addClass("changed");
	// 	$(".login-content").hide();
	// 	$(".qylogin-content").show();
		
	// 	$(".noticemsg").html("");
	// });

});

