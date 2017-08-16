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

import database.DeleteDB;
import database.UpdateDB;

public class DeleteTable extends HttpServlet {

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
		
		String table = object.get("table").getAsString();
		String id = object.get("id").getAsString();
		
 		/**************删除数据*******************/
		String sql = null;
		if(table.equals("studentInfo"))
		{
			 sql = "delete from "+table+" where sid='"+id+"'";
		}else if(table.equals("score"))
		{
			sql = "delete from "+table+" where studentname='"+id+"'";
		}else if(table.equals("homework"))
		{
			sql = "delete from "+table+" where course='"+id+"'";
		}else if(table.equals("leave"))
		{
			sql = "delete from "+table+" where student='"+id+"'";
		}else if(table.equals("teacherInfo"))
		{
			sql = "delete from "+table+" where name='"+id+"'";
		}else if(table.equals("parentInfo"))
		{
			sql = "delete from "+table+" where name='"+id+"'";
		}
	  
		if(sql != null)
		{
			DeleteDB.deleteData(sql);
		}
		

	}

}
