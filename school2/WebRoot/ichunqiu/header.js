$(function(){
	ChangeMark();
	if(uid == ''){

	}else{
		//gm();
	}
	//联系客服
	$('.borbox .lianxi').mouseenter(function(e){
		e.preventDefault();
		var left=this.getBoundingClientRect().left;
		var top=this.getBoundingClientRect().top;
		left = left-160;
		top = top-130;
		$('.kefulianxi').css('left',left+'px').css('top',top+'px').css('display','block');		
	});
	$('.borbox .lianxi').mouseout(function(){
		$('.kefulianxi').hide();
	});
	tips();
	//搜索
	$(".searchbtn").click(function(){
		var msg = $("#searchmsg").val();
		window.location.href=icq_site_url+"search/"+encodeURI(encodeURI(msg));
		return;
	});
	$('.new_search_down').keydown(function(e){
		var curKey = e.which;
		if(curKey == 13){
			var msg = $("#searchmsg").val();
			window.location.href=icq_site_url+"search/"+encodeURI(encodeURI(msg));
			return;
		}
	});

	//搜索的回车事件
	$('.headersearchbox').keydown(function(e){
		var curKey = e.which;
		if(curKey == 13){
			var msg = $(".searchmsg").val();
			window.location.href=icq_site_url+"search/"+encodeURI(encodeURI(msg));
			return;
		}
	});

	// $(".dl").click(function(){
	// 	ShowLoginDialog(base_url,resource_url);
	// });

	//我要讲课跳转
	$(".wantjk").click(function(){
		//if(uid == ''){
		//	ShowLoginDialog(base_url,resource_url);
		//	return;
		//}else{
		//	window.location.href=base_url+"jk";
		//}
	});
	$(".quit").click(function(){
		quit();
	});
	
	if(uid != null && uid.length > 0){
		$('.borbox').show();
		//selsysmsg();
	}else{
		$('.borbox').eq(0).hide();
	}
	
	$(".totop").mouseenter(function(){
		var topoffset = '';
		$(this).css("background","url('"+resource_url+"resources/images/tophg.png') no-repeat");
		topoffset = $(document).scrollTop();
		if(topoffset >= 200){
			$(this).click(function(){
			$(".borbox").css("display","none");
			$(this).css("height","82px");
			$(this).css("background","url('"+resource_url+"resources/images/jiasu.png') no-repeat");
			$(".totop").unbind("mouseleave");
			$("html,body").animate({scrollTop:$(".headerbox").offset().top},1000,function(){
					var juli = $(document).scrollTop();
					if(juli == 0){
						$(".totop").unbind("click");
					}
					$(".totop").css("background","url('"+resource_url+"resources/images/top.png') no-repeat");
					$(".totop").css("height","65px");
					if(uid != null && uid.length > 0){
						$(".borbox").show();
					}else{
						$(".borbox").eq(1).show();
						$(".borbox").eq(2).show();
					}
					$(".totop").mouseleave(function(){
						$(this).css("background","url('"+resource_url+"resources/images/top.png') no-repeat");
						$(this).css("height","65px");
						if(uid != null && uid.length > 0){
							$(".borbox").css("display","block");
						}else{
							$(".borbox").eq(1).show();
							$(".borbox").eq(2).show();
						}
						$(this).unbind("click");
					});
				});
			});
		}
	});
	$(".totop").mouseleave(function(){
		$(this).css("background","url('"+resource_url+"resources/images/top.png') no-repeat");
		$(this).css("height","65px");
		if(uid != null && uid.length > 0){
			$(".borbox").css("display","block");
		}else{
			$(".borbox").eq(1).show();
			$(".borbox").eq(2).show();
		}
		$(this).unbind("click");
	});
	

	//判断是否提示过修改头像
	headerpic();
	

	$(".studyroad").hover(function(){
		$(".roadbox").css("display","block");
		$(".roadbox").css("color","#ffffff");
	},function(){
		$(".roadbox").css("display","none");
	});
	
	$(".new_search").hover(function(){
	},
	function(){
		$(".new_search_down input").blur();
	});
});

function selsysmsg(){
	$.ajax({
		url: base_url+"user/selmsg",
		type: "POST",
		success:function(obj){
			var res = (new Function("return"+obj+";"))();
			try{
				if(res.status == 0){
					$('.edot').css('display','none');
				}else if(res.status == 1){
					if($(".xx-num").length>0){//判断是否是个人中心页面
						$(".xx-num").css("display","block");//个人中心  系统消息 右侧显示未读信息
						$(".xx-num").html(res.count);
					}
					$('.edot').css('display','block');
					$('.btnbox .email').addClass('have-email');
				}
			}catch(e){

			}
		},
		error: function(data) {}
	});
}

function tips(){
	// $('.headeruname').unbind('click').bind('click',function(e){
		// e.preventDefault();
	
	// 	if($("#mymenu").is(":visible")){
	// 		$("#mymenu").hide();
	// 	}else{
	// 		$("#mymenu").show();
	// 	}
	// });
	// 
	// $("#mymenu").show();
	$(".headerubox").hover(function(){
		$("#mymenu").css("display","block");
	},function(){
		$("#mymenu").css("display","none");
	});
}


function ChangeMark()
{
	/*判断是哪个页面并改变头部样式*/
	var mark = $(".mark").val();
	if(mark == 0){//首页
		$(".headernav").eq(0).css("color","#050505").css("backgroundColor","#F9B728");
	}else if(mark == 1){//全部课程
		$(".headernav").eq(1).css("color","#050505").css("backgroundColor","#F9B728");
	}else if(mark == 2){//我要讲课
		$(".headernav").eq(2).css("color","#050505").css("backgroundColor","#F9B728");
	}else if(mark == 3){//在线挑战
		$(".headernav").eq(3).css("color","#050505").css("backgroundColor","#F9B728");
	}else if(mark == 4){//安全百科
		$(".headernav").eq(4).css("color","#050505").css("backgroundColor","#F9B728");
	}else if(mark == 5){//企安殿
		$(".headernav").eq(5).css("color","#050505").css("backgroundColor","#F9B728");
	}else if(mark == 99){
		// $(".loginboxs").css("display","none");
	}
}

function headerpic(){
	if(uid !== ''){
		var icn = $(".headeruserpic").attr("src");//取得用户头像路径
		var stand = resource_url+"resources/upload/images/DefaultUserIcon.png";//默认头像路径
		var alt=getCookie("alt");//取得cookie中是否弹出更换头像提示框的值  alt的值  alt=y表示已经提示过 alt=n表示没有提示过
		if(icn == stand){
			if(alt == null || alt == 'n'){
				delCookie("alt",'');
				setCookie("alt",'y');
				changeupic(base_url,resource_url);
			}
		}
	}
}

function gm(){
	$.ajax({
		url: base_url+"login/getgm",
		type: "POST",
		success:function(obj){
			if(obj !== null){
				var res = eval("("+obj+")");
				if(res.status == 1){
					$("#hidiv").html(res.result);
				}
			}
		},
		error: function(data) {}
	});
}

function quit(){
	$.ajax({
		url: base_url+"login/logout",
		type: "POST",
		success:function(obj){
			if(obj !== null){
				var res = eval("("+obj+")");
				if(res.status == 1){
					$("#hidiv").html("");
					$("#hidiv").html(res.result);
					setTimeout("window.location.href=base_url+'login'",500);
					

					
				}
			}
		},
		error: function(data) {}
	});
}