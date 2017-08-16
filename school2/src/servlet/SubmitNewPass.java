package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import utils.JsonString;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import database.UpdateDB;
/*
 * 修改密码
 */
public class SubmitNewPass extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		/*************获取ajax提交的数据*****************/
		String json = JsonString.getJsonString(request);
		System.out.println(json);
		
		JsonParser parser = new JsonParser();//创建json解析器
		JsonObject object = (JsonObject) parser.parse(json);
		
		String newpass = object.get("newpass").getAsString();
		
		HttpSession session = request.getSession();
		String user = (String) session.getAttribute("user"); 
		String type = (String) session.getAttribute("type");
 		/**************修改数据库*******************/
		if(type.equals("admin"))
		{
			String sql = "update admin set password='"+newpass+"'where id=(select id from adminInfo where adminname='"+user+"')";
	        UpdateDB.UpdateData(sql);	
		}else if(type.equals("teacher"))
		{
			String sql = "update teacher set password='"+newpass+"' where id=(select id from teacherInfo where name='"+user+"')";
			UpdateDB.UpdateData(sql);
		}else if(type.equals("parent"))
		{
			String sql = "update parent set password='"+newpass+"' where id=(select id from parentInfo where name='"+user+"')";
		    UpdateDB.UpdateData(sql);
		}
	}
}
