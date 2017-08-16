package chat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import utils.CharsetSwitch;
import utils.GetCurrentDate;
import database.InsertDB;
/*
 * 提交QQ留言
 */
public class SendQQ extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
		/*	
		String sender = request.getParameter("iqqsender");
		String receiver = request.getParameter("iqqrecv");
		String comment = request.getParameter("icomment");
		String date = request.getParameter("idate");*/
		/*******编码转换**********/
	/*	sender = CharsetSwitch.ISO_To_Utf8(sender);
		receiver = CharsetSwitch.ISO_To_Utf8(receiver);
		comment = CharsetSwitch.ISO_To_Utf8(comment);
		date = CharsetSwitch.ISO_To_Utf8(date);
		String msg = sender + receiver + comment + date;*/
		
	//	out.println("<script>");
		//	out.println("alert('留言发送成功!');");
	//	out.println("window.location.href='"+ url +"'");
	///	out.println("</script>");
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	           /********获取参数**************/
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-type", "text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
	
		/**************使用ajax来提交表单数据**********/
		String json = getJsonString(request);
		System.out.println(json);
		/************解析json数据**********/
		JsonParser parser = new JsonParser();//创建json解析器
		JsonObject object = (JsonObject) parser.parse(json);
		String sender = object.get("sender").getAsString();
		String receiver = object.get("receiver").getAsString();
		String comment = object.get("comment").getAsString();
		String date = object.get("date").getAsString();
		
		HttpSession session = request.getSession();
		String type = (String) session.getAttribute("type");
		//out.println("<script>alert('"+ msg +"')</script>");
		/******进行数据库操作********/
		String sql = "";
		String url = "";
		if(type.equals("parent"))
		{
			/*****家长给老师留言*****/
			sql = "insert into parentsend(parent_send, teacher_recv, comment, date)"
					+ "values('"+ sender +"', '"+ receiver +"', '"+ comment +"', '"+ date +"')";
			url = "/school/parent_qq.jsp";
		}else if(type.equals("teacher"))
		{
			/******老师给家长留言*******/
			sql =  "insert into teachersend(teacher_send, parent_recv, comment, date)"
					+ "values('"+ sender +"', '"+ receiver +"', '"+ comment +"', '"+ date +"')";
		   url = "/school/teacher_chat.jsp";
		}
		InsertDB.insertData(sql);
    
	   /*************给前台ajax回调函数返回数据**************/
		String result = "成功插入数据了";
		out.println(result);
	}
	
	public String getJsonString(HttpServletRequest request)
	{
		StringBuffer json = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = request.getReader();
			while((line=reader.readLine()) != null)
			{
				json.append(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return json.toString();
		
	}

}
