/**
 * 永辉 javascript
 */

function editParentTable(id)
{
	/*******让编辑控件可见***********/
	$("#newParentTable").css({"display":"inline"});
	$("#operflag").html("update");
	
	var rows = id.parentNode.parentNode.rowIndex;
	$("#addTable tr:eq(1) td:eq(0) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(0)").html());
	$("#addTable tr:eq(1) td:eq(1) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(1)").html());
	$("#addTable tr:eq(1) td:eq(2) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(2)").html());
	$("#addTable tr:eq(1) td:eq(3) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(3)").html());
	/***********把id禁止输入*********/
	$("#addTable tr:eq(1) td:eq(0) .form-control").attr("disabled", true);
}

function editTeacherTable(id)
{
	/*******让编辑控件可见***********/
	$("#newTeacherTable").css({"display":"inline"});
	$("#operflag").html("update");
	
	var rows = id.parentNode.parentNode.rowIndex;
	$("#addTable tr:eq(1) td:eq(0) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(0)").html());
	$("#addTable tr:eq(1) td:eq(1) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(1)").html());
	$("#addTable tr:eq(1) td:eq(2) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(2)").html());
	$("#addTable tr:eq(1) td:eq(3) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(3)").html());
	$("#addTable tr:eq(1) td:eq(4) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(4)").html());
	$("#addTable tr:eq(1) td:eq(5) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(5)").html());
	$("#addTable tr:eq(1) td:eq(6) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(6)").html());
	/***********把id禁止输入*********/
	$("#addTable tr:eq(1) td:eq(0) .form-control").attr("disabled", true);
}

function editLeaveTable(id)
{
	/*******让编辑控件可见***********/
	$("#newLeaveTable").css({"display":"inline"});
	$("#operflag").html("update");
	
	var rows = id.parentNode.parentNode.rowIndex;
	$("#addLeaveTable tr:eq(1) td:eq(0) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(0)").html());
	$("#addLeaveTable tr:eq(1) td:eq(1) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(1)").html());
	$("#addLeaveTable tr:eq(1) td:eq(2) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(2)").html());
	$("#addLeaveTable tr:eq(1) td:eq(3) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(3)").html());
	/***********把id禁止输入*********/
	$("#addLeaveTable tr:eq(1) td:eq(0) .form-control").attr("disabled", true);
}


function editHomeworkTable(id)
{
	/*******让编辑控件可见***********/
	$("#newHomeworkTable").css({"display":"inline"});
	$("#operflag").html("update");
	
	var rows = id.parentNode.parentNode.rowIndex;
	$("#addTable tr:eq(1) td:eq(0) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(0)").html());
	$("#addTable tr:eq(1) td:eq(1) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(1)").html());
	$("#addTable tr:eq(1) td:eq(2) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(2)").html());
	$("#addTable tr:eq(1) td:eq(3) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(3)").html());
	/***********把id禁止输入*********/
	$("#addTable tr:eq(1) td:eq(0) .form-control").attr("disabled", true);
}


function editScoreTable(id)
{
	/*******让编辑控件可见***********/
	$("#newScoreTable").css({"display":"inline"});
	$("#operflag").html("update");
	
	var rows = id.parentNode.parentNode.rowIndex;
	$("#addTable tr:eq(1) td:eq(0) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(0)").html());
	$("#addTable tr:eq(1) td:eq(1) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(1)").html());
	$("#addTable tr:eq(1) td:eq(2) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(2)").html());
	/***********把id禁止输入*********/
	$("#addTable tr:eq(1) td:eq(0) .form-control").attr("disabled", true);
	
}

function editStudentTable(id)
{   /*******让编辑控件可见***********/
	$("#newStudentTable").css({"display":"inline"});
	$("#operflag").html("update");
	
	var rows = id.parentNode.parentNode.rowIndex;
	$("#addTable tr:eq(1) td:eq(0) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(0)").html());
	$("#addTable tr:eq(1) td:eq(1) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(1)").html());
	$("#addTable tr:eq(1) td:eq(2) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(2)").html());
	$("#addTable tr:eq(1) td:eq(3) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(3)").html());
	$("#addTable tr:eq(1) td:eq(4) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(4)").html());
	$("#addTable tr:eq(1) td:eq(5) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(5)").html());
	$("#addTable tr:eq(1) td:eq(6) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(6)").html());
	$("#addTable tr:eq(1) td:eq(7) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(7)").html());
	$("#addTable tr:eq(1) td:eq(8) .form-control").val($("#tablelist tr:eq("+rows+") td:eq(8)").html());
	/***********把id禁止输入*********/
	$("#addTable tr:eq(1) td:eq(0) .form-control").attr("disabled", true);
}
/*******删除学生表************/
function deleteStudentTable(id)
{
  //  alert("eeee");
    var rows = id.parentNode.parentNode.rowIndex;
    
    var recId = $("#tablelist tr:eq("+rows+") td:eq(0)").html();
	alert(recId);
	$("#tablelist tr:eq("+rows+")").remove();
	/*****删除学生信息表中的对应数据********/
	 var table = "studentInfo";
	 var id = recId;
	 var obj = new deleteTable(table, id);
     var jsonstring = JSON.stringify(obj);
	 $.ajax({
         type:"POST",
         url:"/school2/servlet/DeleteTable",///school
         async:false,
         data:jsonstring + "\n",
         success:function(data, textStatus){
            if(textStatus == "success")
            {
               alert("删除成功！");
            }	
         }
    });
	function deleteTable(table, id)
	{
		this.table = table;
		this.id = id;
	}
}

/*******删除成绩表************/
function deleteScoreTable(id)
{
    var rows = id.parentNode.parentNode.rowIndex;
    
    var recId = $("#tablelist tr:eq("+rows+") td:eq(0)").html();
	alert(recId);
	$("#tablelist tr:eq("+rows+")").remove();
	/*****删除学生信息表中的对应数据********/
	 var table = "score";
	 var id = recId;
	 var obj = new deleteTable(table, id);
     var jsonstring = JSON.stringify(obj);
	 $.ajax({
         type:"POST",
         url:"/school2/servlet/DeleteTable",///school
         async:false,
         data:jsonstring + "\n",
         success:function(data, textStatus){
            if(textStatus == "success")
            {
               alert("删除成功！");
            }	
         }
    });
	function deleteTable(table, id)
	{
		this.table = table;
		this.id = id;
	}
}


/*******删除家庭作业表************/
function deleteHomework(id)
{
    var rows = id.parentNode.parentNode.rowIndex;
    
    var recId = $("#tablelist tr:eq("+rows+") td:eq(0)").html();
	alert(recId);
	$("#tablelist tr:eq("+rows+")").remove();
	/*****删除家庭作业表中的对应数据********/
	 var table = "homework";
	 var id = recId;
	 var obj = new deleteTable(table, id);
     var jsonstring = JSON.stringify(obj);
	 $.ajax({
         type:"POST",
         url:"/school2/servlet/DeleteTable",///school
         async:false,
         data:jsonstring + "\n",
         success:function(data, textStatus){
            if(textStatus == "success")
            {
               alert("删除成功！");
            }	
         }
    });
	function deleteTable(table, id)
	{
		this.table = table;
		this.id = id;
	}
}
/*******删除请假表************/
function deleteLeaveTable(id)
{
    var rows = id.parentNode.parentNode.rowIndex;
    
    var recId = $("#tablelist tr:eq("+rows+") td:eq(0)").html();
	alert(recId);
	$("#tablelist tr:eq("+rows+")").remove();
	/*****删除请假表中的对应数据********/
	 var table = "leave";
	 var id = recId;
	 var obj = new deleteTable(table, id);
     var jsonstring = JSON.stringify(obj);
	 $.ajax({
         type:"POST",
         url:"/school2/servlet/DeleteTable",///school
         async:false,
         data:jsonstring + "\n",
         success:function(data, textStatus){
            if(textStatus == "success")
            {
               alert("删除成功！");
            }	
         }
    });
	function deleteTable(table, id)
	{
		this.table = table;
		this.id = id;
	}
}
/****************删除老师表******************/
function deleteTeacherTable(id)
{
    var rows = id.parentNode.parentNode.rowIndex;
    
    var recId = $("#tablelist tr:eq("+rows+") td:eq(0)").html();
	alert(recId);
	$("#tablelist tr:eq("+rows+")").remove();
	/*****删除请假表中的对应数据********/
	 var table = "teacherInfo";
	 var id = recId;
	 var obj = new deleteTable(table, id);
     var jsonstring = JSON.stringify(obj);
	 $.ajax({
         type:"POST",
         url:"/school2/servlet/DeleteTable",///school
         async:false,
         data:jsonstring + "\n",
         success:function(data, textStatus){
            if(textStatus == "success")
            {
               alert("删除成功！");
            }	
         }
    });
	function deleteTable(table, id)
	{
		this.table = table;
		this.id = id;
	}
}

/****************删除家长表****************/
function deleteParentTable(id)
{
  //  alert("eeee");
    var rows = id.parentNode.parentNode.rowIndex;
    
    var recId = $("#tablelist tr:eq("+rows+") td:eq(0)").html();
	alert(recId);
	$("#tablelist tr:eq("+rows+")").remove();
	/*****删除学生信息表中的对应数据********/
	 var table = "parentInfo";
	 var id = recId;
	 var obj = new deleteTable(table, id);
     var jsonstring = JSON.stringify(obj);
	 $.ajax({
         type:"POST",
         url:"/school2/servlet/DeleteTable",///school
         async:false,
         data:jsonstring + "\n",
         success:function(data, textStatus){
            if(textStatus == "success")
            {
               alert("删除成功！");
            }	
         }
    });
	function deleteTable(table, id)
	{
		this.table = table;
		this.id = id;
	}
}


$(document).ready(function() {
	
	
	/*************新增或者编辑学生表***************/
	$("#submitStudent").click(function(){
		var oper = $("#operflag").html();
	//	alert(oper);`
		var sid = $("#addTable tr:eq(1) td:eq(0) .form-control").val();
	//	alert(sid);
		var name = $("#addTable tr:eq(1) td:eq(1) .form-control").val();
		var sex = $("#addTable tr:eq(1) td:eq(2) .form-control").val();
		var birth = $("#addTable tr:eq(1) td:eq(3) .form-control").val();
		var gotime = $("#addTable tr:eq(1) td:eq(4) .form-control").val();
		var parentname = $("#addTable tr:eq(1) td:eq(5) .form-control").val();
		var phone = $("#addTable tr:eq(1) td:eq(6) .form-control").val();
		var homeaddress = $("#addTable tr:eq(1) td:eq(7) .form-control").val();
		var sjob = $("#addTable tr:eq(1) td:eq(8) .form-control").val();
		if(sid != "" && name != "" && sex != "" && birth != "" && gotime != "" &&
				parentname != "" && phone != "" && homeaddress != "" && sjob != "")
		{
			var obj = new student(oper, sid, name, sex, birth, gotime, parentname, phone, homeaddress, sjob);
	        var jsonstring = JSON.stringify(obj);
	        $.ajax({
	             type:"POST",
	             url:"/school2/servlet/InsertStudentInfo",///school
	             async:false,
	             data:jsonstring + "\n",
	             success:function(data, textStatus){
	                if(textStatus == "success")
	                {
	                    alert("提交成功！");
	                    $("#newStudentTable").css({"display":"none"});
	                }	
	             }
	        });
		}else{
			alert("任意一项均不能为空！");
		}
		
		function student(oper, sid, name, sex, birth, gotime, parentname, phone, homeaddress, sjob)
		{
			this.oper = oper;
			this.sid = sid;
			this.name = name;
			this.sex = sex;
			this.birth = birth;
			this.gotime = gotime;
			this.parentname = parentname;
			this.phone = phone;
			this.homeaddress = homeaddress;
			this.sjob = sjob;
		}
		
	});
	
	
	$("#newStudent").click(function(){
		$("#newStudentTable").css({"display":"inline"});
		$("#operflag").html("insert");
		
		$("#addTable tr:eq(1) td:eq(0) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(1) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(2) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(3) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(4) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(5) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(6) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(7) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(8) .form-control").val("");
		/***********把id禁止解锁*********/
		$("#addTable tr:eq(1) td:eq(0) .form-control").attr("disabled", false);
	});
/**************************成绩表********************************/
	$("#submitScore").click(function(){
		var oper = $("#operflag").html();
		alert(oper);
		var studentname = $("#addTable tr:eq(1) td:eq(0) .form-control").val();
		var course = $("#addTable tr:eq(1) td:eq(1) .form-control").val();
		var score = $("#addTable tr:eq(1) td:eq(2) .form-control").val();
		
		if(studentname != "" && course != "" && score != "")
		{
			var obj = new scoretable(oper, studentname, course, score);
	        var jsonstring = JSON.stringify(obj);
	        alert(jsonstring);
	        $.ajax({
	             type:"POST",
	             url:"/school2/servlet/InsertScore",///school
	             async:false,
	             data:jsonstring + "\n",
	             success:function(data, textStatus){
	                if(textStatus == "success")
	                {
	                    alert("提交成功！");
	                    $("#newScoreTable").css({"display":"none"});
	                }	
	             }
	        });
		}else{
			alert("任意一项均不能为空！");
		}
		
		function scoretable(oper, studentname, course, score)
		{
			this.oper = oper;
			this.studentname = studentname;
			this.course = course;
			this.score = score;
		}
		
	});
	
	$("#newScore").click(function(){
		$("#newScoreTable").css({"display":"inline"});
		$("#operflag").html("insert");
		
		$("#addTable tr:eq(1) td:eq(0) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(1) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(2) .form-control").val("");
		/***********把id禁止解锁*********/
		$("#addTable tr:eq(1) td:eq(0) .form-control").attr("disabled", false);
	});
	
/************************家庭作业表*******************/	
	$("#submitHomework").click(function(){
		var oper = $("#operflag").html();
		alert(oper);
		var course = $("#addTable tr:eq(1) td:eq(0) .form-control").val();
		var teacher = $("#addTable tr:eq(1) td:eq(1) .form-control").val();
		var homework = $("#addTable tr:eq(1) td:eq(2) .form-control").val();
		var date = $("#addTable tr:eq(1) td:eq(3) .form-control").val();
		
		if(course != "" && teacher != "" && homework != "" && date != "")
		{
			var obj = new homeworktable(oper, course, teacher, homework, date);
	        var jsonstring = JSON.stringify(obj);
	        alert(jsonstring);
	        $.ajax({
	             type:"POST",
	             url:"/school2/servlet/InsertHomework",///school
	             async:false,
	             data:jsonstring + "\n",
	             success:function(data, textStatus){
	                if(textStatus == "success")
	                {
	                    alert("提交成功！");
	                    $("#newHomeworkTable").css({"display":"none"});
	                }	
	             }
	        });
		}else{
			alert("任意一项均不能为空！");
		}
		
		function homeworktable(oper, course, teacher, homework, date)
		{
			this.oper = oper;
			this.course = course;
			this.teacher = teacher;
			this.homework = homework;
			this.date = date;
		}
		
	});
	
	$("#newHomework").click(function(){
		$("#newHomeworkTable").css({"display":"inline"});
		$("#operflag").html("insert");
		
		$("#addTable tr:eq(1) td:eq(0) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(1) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(2) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(3) .form-control").val("");
		
		/***********把id禁止解锁*********/
		$("#addTable tr:eq(1) td:eq(0) .form-control").attr("disabled", false);
	});
	
/************************请假表********************/	
	$("#submitLeave").click(function(){
		var oper = $("#operflag").html();
		alert(oper);
		var student = $("#addLeaveTable tr:eq(1) td:eq(0) .form-control").val();
		var course = $("#addLeaveTable tr:eq(1) td:eq(1) .form-control").val();
		var date = $("#addLeaveTable tr:eq(1) td:eq(2) .form-control").val();
		var reason = $("#addLeaveTable tr:eq(1) td:eq(3) .form-control").val();
		
		if(student != "" && course != "" && date != "" && reason != "")
		{
			var obj = new leavetable(oper, student, course, date, reason);
	        var jsonstring = JSON.stringify(obj);
	        alert(jsonstring);
	        $.ajax({
	             type:"POST",
	             url:"/school2/servlet/InsertLeave",///school
	             async:false,
	             data:jsonstring + "\n",
	             success:function(data, textStatus){
	                if(textStatus == "success")
	                {
	                    alert("提交成功！");
	                    $("#newLeaveTable").css({"display":"none"});
	                }	
	             }
	        });
		}else{
			alert("任意一项均不能为空！");
		}
		
		function leavetable(oper, student, course, date, reason)
		{
			this.oper = oper;
			this.student = student;
			this.course = course;
			this.date = date;
			this.reason = reason;
		}
		
	});
	
	$("#newLeave").click(function(){
		//alert("pppp");
		$("#newLeaveTable").css({"display":"inline"});
		$("#operflag").html("insert");
		
		$("#addLeaveTable tr:eq(1) td:eq(0) .form-control").val("");
		$("#addLeaveTable tr:eq(1) td:eq(1) .form-control").val("");
		$("#addLeaveTable tr:eq(1) td:eq(2) .form-control").val("");
		$("#addLeaveTable tr:eq(1) td:eq(3) .form-control").val("");
		/***********把id禁止解锁*********/
		$("#addLeaveTable tr:eq(1) td:eq(0) .form-control").attr("disabled", false);
	});	
	
/*****************老师表*********************/	
	$("#submitTeacher").click(function(){
		var oper = $("#operflag").html();
		alert(oper);
		var name = $("#addTable tr:eq(1) td:eq(0) .form-control").val();
		var sex = $("#addTable tr:eq(1) td:eq(1) .form-control").val();
		var job = $("#addTable tr:eq(1) td:eq(2) .form-control").val();
		var age = $("#addTable tr:eq(1) td:eq(3) .form-control").val();
		var phone = $("#addTable tr:eq(1) td:eq(4) .form-control").val();
		var mail = $("#addTable tr:eq(1) td:eq(5) .form-control").val();
		var address = $("#addTable tr:eq(1) td:eq(6) .form-control").val();
		
		if(name != "" && sex != "" && job != "" && age != "" &&
				phone != "" && mail != "" && address != "")
		{
			var obj = new teachertable(oper, name, sex, job, age, phone, mail, address);
	        var jsonstring = JSON.stringify(obj);
	        alert(jsonstring);
	        $.ajax({
	             type:"POST",
	             url:"/school2/servlet/InsertTeacher",///school
	             async:false,
	             data:jsonstring + "\n",
	             success:function(data, textStatus){
	                if(textStatus == "success")
	                {
	                    alert("提交成功！");
	                    $("#newTeacherTable").css({"display":"none"});
	                }	
	             }
	        });
		}else{
			alert("任意一项均不能为空！");
		}
		
		function teachertable(oper, name, sex, job, age, phone, mail, address)
		{
			this.oper = oper;
			this.name = name;
			this.sex = sex;
			this.job = job;
			this.age = age;
			this.phone = phone;
			this.mail = mail;
			this.address = address;
		}
		
	});
	
	$("#newTeacher").click(function(){
		//alert("pppp");
		$("#newTeacherTable").css({"display":"inline"});
		$("#operflag").html("insert");
		
		$("#addTable tr:eq(1) td:eq(0) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(1) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(2) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(3) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(4) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(5) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(6) .form-control").val("");
		/***********把id禁止解锁*********/
		$("#addTable tr:eq(1) td:eq(0) .form-control").attr("disabled", false);
	});	
/************************家长表*********************/		
	$("#submitParent").click(function(){
		var oper = $("#operflag").html();
		alert(oper);
		var name = $("#addTable tr:eq(1) td:eq(0) .form-control").val();
		var phone = $("#addTable tr:eq(1) td:eq(1) .form-control").val();
		var childname = $("#addTable tr:eq(1) td:eq(2) .form-control").val();
		var relation = $("#addTable tr:eq(1) td:eq(3) .form-control").val();
		
		if(name != "" && phone != "" && childname != "" && relation != "")
		{
			var obj = new parenttable(oper, name, phone, childname, relation);
	        var jsonstring = JSON.stringify(obj);
	        alert(jsonstring);
	        $.ajax({
	             type:"POST",
	             url:"/school2/servlet/InsertParent",///school
	             async:false,
	             data:jsonstring + "\n",
	             success:function(data, textStatus){
	                if(textStatus == "success")
	                {
	                    alert("提交成功！");
	                    $("#newParentTable").css({"display":"none"});
	                }	
	             }
	        });
		}else{
			alert("任意一项均不能为空！");
		}
		
		function parenttable(oper, name, phone, childname, relation)
		{
			this.oper = oper;
			this.name = name;
			this.phone = phone;
			this.childname = childname;
			this.relation = relation;
		}
		
	});
	
	$("#newParent").click(function(){
		//alert("pppp");
		$("#newParentTable").css({"display":"inline"});
		$("#operflag").html("insert");
		
		$("#addTable tr:eq(1) td:eq(0) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(1) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(2) .form-control").val("");
		$("#addTable tr:eq(1) td:eq(3) .form-control").val("");
		/***********把id禁止解锁*********/
		$("#addTable tr:eq(1) td:eq(0) .form-control").attr("disabled", false);
	});		
	
	
	
	
	 $("#ensurepass").click(function(){
		   /**********新闻内容ajax异步提交表单*********/
		   var newpass = $("#newpass").val();
		   if(newpass == "")
		   {
		       alert("新密码不能为空!");
		    }else{
		        var obj = new newpassword(newpass);
		        var jsonstring = JSON.stringify(obj);
		        $.ajax({
		             type:"POST",
		             url:"/school2/servlet/SubmitNewPass",///school
		             async:false,
		             data:jsonstring + "\n",
		             success:function(data, textStatus){
		                if(textStatus == "success")
		                {
		                    alert("密码修改成功！");
		                }	
		             }
		        });
		    }
	   });
		    	
	   function newpassword(newpass)
	   {
		    this.newpass = newpass;
	   }
	   
	  
})(jQuery);
	