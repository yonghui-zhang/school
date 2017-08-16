function message() {
    var a = $.blinkTitle.show();
    setTimeout(function() {
        $.blinkTitle.clear(a)
    },
    8e3)
}
$(document).ready(function() {
	
    function e() {
   
        var e = new Date,
        f = "";
        f += e.getFullYear() + "-",
        f += e.getMonth() + 1 + "-",
        f += e.getDate() + "  ",
        f += e.getHours() + ":",
        f += e.getMinutes() + ":",
        f += e.getSeconds();
        
        var g = $("#textarea").val();
  
		name =  $(".hd-rt em").text()
        var i = "<div class='message clearfix'><div class='user-logo'><img src='" + b + "'/>" +
        "</div>" + "<div class='wrap-text'>" + "<h5 name='qqsender"+ a +"' class='clearfix'>" +
        name + "</h5>" + "<div name='qqmsg"+ a +"'>" + g + "</div>" + "</div>" + "<div class='wrap-ri'>" 
        + "<div clsss='clearfix'><span name='msgdate"+ a +"'>" + f + "</span></div>" + "</div>" + 
        "<div style='clear:both;'></div>" + "</div>";
        null != g && "" != g ? (/*$(".mes" + a).append(i), */$(".chat01_content").scrollTop($(".mes" + a).height()), 
        		$("#textarea").val(""), message()) 
        		: alert("\u8bf7\u8f93\u5165\u804a\u5929\u5185\u5bb9!")
       
        /**********ajax异步提交表单*********/
  
        var obj = new registerobj(name, d, g, f);
        var jsonstring = JSON.stringify(obj);
        $.ajax({
        	type:"POST",
        	url:"/school2/servlet/SendQQ",///school
        	async:false,
        	data:jsonstring + "\n",
        	success:function(data, textStatus){
        		if(textStatus != "success")
        		{
        			alert("数据插入失败！");
        		}
        	}
        });
        function registerobj(sender, receiver, comment, date)
        {
        	this.sender = sender;
        	this.receiver = receiver;
        	this.comment = comment;
        	this.date = date;
        }
    }
    name =  $(".hd-rt em").text()
    
    var qqflag = -1;
    
    var a = 3,
    b = "img/head/2024.jpg",
    c = "img/head/2015.jpg",
    d = "\u738b\u65ed";
    $(".close_btn").click(function() {
        $(".chatBox").hide()
    }),
    $(".chat03_content li").mouseover(function() {
        $(this).addClass("hover").siblings().removeClass("hover")
    }).mouseout(function() {
        $(this).removeClass("hover").siblings().removeClass("hover")
    }),
    $(".chat03_content li").dblclick(function() {
    	
    	if(qqflag != -1)
    	{
    		clearInterval(qqflag);
    	}
    	
        var b = $(this).index() + 1;
        a = b,
        $(".chat02_bar span").text(a)
        c = "img/head/20" + (12 + a) + ".jpg",
        d = $(this).find(".chat03_name").text(),
        $(".chat01_content").scrollTop(0),
        $(this).addClass("choosed").siblings().removeClass("choosed"),
        $(".talkTo a").text($(this).children(".chat03_name").text()), 
        $(".mes" + b).show().siblings().hide()
       
         /*********添加消息推送***********/
         /***利用ajax发送teacher_send和parent_recv等信息用于查表，
         在后台进行查询后，在回调函数中返回json数据，用于动态显示******/
         var sender = d;//老师  被呼叫者
         var receiver = name;//家长 聊天者
         var obj = new qqselect(sender, receiver);
         var type = $("#type").text();
         var jsonstring = JSON.stringify(obj);
         qqflag = setInterval(function(){
        	 /********清空所有消息********/
        /*     for(var num=0;num<10;num++)
             {
                $(".mes" + num).empty();
             }*/
        	 $.ajax({
             	type:"POST",
             	url:"/school2/servlet/QQMessageServlet2",///school
             	async:false,
             /*	dataType:"json",*/
             	data:jsonstring + "\n",
             	success:function(data, textStatus){
             	//	alert(data);
             		if(data == "no new data")
             		{
             			
             		}else{
             		//    alert(data);
                 		var data = eval("("+ data +")");
                 		/**json解析*/
                 		if(type == "teacher")
                 		{
                 			$.each(data.parentMsg, function(index, item)
                 			{
                 				 function h() { - 1 != item.comment.indexOf("#emo_") && 
                 					 (item.comment = item.comment.replace("#", "<img src='img/").replace("#", ".gif'/>"), h())
                 		         }
                 				 h();
                 			//	 alert(item.comment)
                 				var i = "<div class='message clearfix'><div class='user-logo'><img src='"+item.headimg+"'/>" + 
                 				"</div>" + "<div class='wrap-text'>" + 
                 				"<h5 class='clearfix'>" + item.send + "</h5>" + "<div>" + item.comment + 
                 				"</div>" + "</div>" + "<div class='wrap-ri'>" +
                 				"<div clsss='clearfix'><span>" + item.date + "</span></div>" + 
                 				"</div>" + "<div style='clear:both;'></div>" + "</div>";
                      	        $(".mes" + a).append(i), $(".chat01_content").scrollTop($(".mes" + a).height())
                 			    /***********播放qq消息音效*********/
                      	        $("#qqsound")[0].play();
                 			});
                 			message()
                 			
                 		}else if(type == "parent")
                 		{
                 			$.each(data.teacherMsg, function(index, item)
                 			{
                 				 function h() { - 1 != item.comment.indexOf("#emo_")
                 					 && (item.comment = item.comment.replace("#", "<img src='img/").replace("#", ".gif'/>"), h())
                 		         }
                 				 h();
                 		//		 alert(item.comment)
                 			//	alert(item);
                 			    var i = "<div class='message clearfix'><div class='user-logo'><img src='"+ item.headimg +"'/>" + 
                 			    "</div>" + "<div class='wrap-text'>" + "<h5 class='clearfix'>" + item.send + "</h5>" + 
                 			    "<div>" + item.comment + "</div>" + "</div>" + "<div class='wrap-ri'>" + 
                 			    "<div clsss='clearfix'><span>" + item.date + 
                 			    "</span></div>" + "</div>" + "<div style='clear:both;'></div>" + "</div>";
                      	        $(".mes" + a).append(i), $(".chat01_content").scrollTop($(".mes" + a).height())
                      	      /***********播放qq消息音效*********/
                      	        $("#qqsound")[0].play();
                 			});
                 			message()
                 		}			  
             		}
             	}
             })
              }, 1000);
        
        function qqselect(sender, receiver)
        {
        	this.sender = sender;
        	this.receiver = receiver;
        }
    }),
    $(".ctb01").mouseover(function() {
        $(".wl_faces_box").show()
    }).mouseout(function() {
        $(".wl_faces_box").hide()
    }),
    $(".wl_faces_box").mouseover(function() {
        $(".wl_faces_box").show()
    }).mouseout(function() {
        $(".wl_faces_box").hide()
    }),
    $(".wl_faces_close").click(function() {
        $(".wl_faces_box").hide()
    }),
    $(".wl_faces_main img").click(function() {
        var a = $(this).attr("src");
     //   $("#textarea").val($("#textarea").val()  + "<img src='" + a + "'/>");
        $("#textarea").val($("#textarea").val()  + "#" + a.substr(a.indexOf("img/") + 4, 6)+ "#"),
        $("#textarea").focusEnd(),
        $(".wl_faces_box").hide()
        
    }),
    $(".chat02_bar a").click(function() {
        e()
    }),
    function errortest()
    {
    	alert("xxxxs");
    }
    /**********新闻提交**************/
    $("#newsSubmit").click(function(){
    //	alert("xxxxs");//submit btn btn-default newsSubmit
        /**********新闻内容ajax异步提交表单*********/
    	var ue = UE.getEditor('container');
    	var newscontent = ue.getContent();
    	
    	var filename = $("#filename").val();
    	var newstitle = $("#newstitle").val();
    	if(filename == "")
    	{
    		alert("必须输入保存的文件名!");
    	}else{
    		
    		if(newstitle == "")
        	{
        		alert("必须输入文章的标题！");
        	}else{
        		var obj = new news(newscontent, filename, newstitle);
                var jsonstring = JSON.stringify(obj);
                $.ajax({
                	type:"POST",
                	url:"/school2/servlet/SubmitNews",///school
                	async:false,
                	data:jsonstring + "\n",
                	success:function(data, textStatus){
                		if(textStatus == "success")
                		{
                			alert("新闻发布成功！");
                		}
                	}
                });
        	}
    	}
    	
        function news(newscontent, filename, newstitle)
        {
        	this.newscontent = newscontent;
        	this.filename = filename;
        	this.newstitle = newstitle;
        }
    }),
   
    /************修改新闻***************/
    $("#newsUpdate").click(function(){
        //	alert("xxxxs");//submit btn btn-default newsSubmit
            /**********新闻内容ajax异步提交表单*********/
        
        	var newspath = "1.html";
            var obj = new newsloca(newspath);
            var jsonstring = JSON.stringify(obj);
            $.ajax({
            	type:"POST",
            	url:"/school2/servlet/UpdateNews",///school
            	async:false,
            	data:jsonstring + "\n",
            	success:function(data, textStatus){
            		alert(data);
            		var data = eval("("+ data +")");
            		$.each(data.root, function(idx, items)
                 	{
                 		alert(items.srchtml);
                 //		var value = prompt('插入html代码', '');
                 		var ue = UE.getEditor('container');
                    	ue.execCommand('inserthtml', items.srchtml);
                 		
                   });	
            	}
            });
            function newsloca(newspath)
            {
            	this.newspath = newspath;
            }
        }),
    /************删除新闻****************/
        $("#newsDelete").click(function(){
            //	alert("xxxxs");//submit btn btn-default newsSubmit
                /**********新闻内容ajax异步提交表单*********/
        	
        	 //   var newspath = "1.html";
        	    var newspath = $("#filename").val();
        	    if(newspath == "")
        	    {
        	    	alert("需要指定删除的文件名!");
        	    }else{
        	    	 var obj = new news(newspath);
                     var jsonstring = JSON.stringify(obj);
                     $.ajax({
                     	type:"POST",
                     	url:"/school2/servlet/DeleteNews",///school
                     	async:false,
                     	data:jsonstring + "\n",
                     	success:function(data, textStatus){
                     		if(textStatus == "success")
                     		{
                     			alert("删除新闻成功！");
                     		}	
                     	}
                     });
        	    }
               
                function news(newspath)
                {
                	this.newspath = newspath;
                }
            }),
    document.onkeydown = function(a) {
        var b = document.all ? window.event: a;
        return 13 == b.keyCode ? (e(), !1) : void 0
    },
    $.fn.setCursorPosition = function(a) {
        return 0 == this.lengh ? this: $(this).setSelection(a, a)
    },
    $.fn.setSelection = function(a, b) {
        if (0 == this.lengh) return this;
        if (input = this[0], input.createTextRange) {
            var c = input.createTextRange();
            c.collapse(!0),
            c.moveEnd("character", b),
            c.moveStart("character", a),
            c.select()
        } else input.setSelectionRange && (input.focus(), input.setSelectionRange(a, b));
        return this
    },
    $.fn.focusEnd = function() {
        this.setCursorPosition(this.val().length);
    }
}),
function(a) {
    a.extend({
        blinkTitle: {
            show: function() {
                var a = 0,
                b = document.title;
                if ( - 1 == document.title.indexOf("\u3010")) var c = setInterval(function() {
                    a++,
                    3 == a && (a = 1),
                    1 == a && (document.title = "\u3010\u3000\u3000\u3000\u3011" + b),
                    2 == a && (document.title = "\u3010\u65b0\u6d88\u606f\u3011" + b)
                },
                500);
                return [c, b]
            },
            clear: function(a) {
                a && (clearInterval(a[0]), document.title = a[1])
            }
        }
    })
} (jQuery);