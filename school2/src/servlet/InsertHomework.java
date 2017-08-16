package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utils.JsonString;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import database.InsertDB;
/*
 * 家庭作业表
 */
public class InsertHomework extends HttpServlet {

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
		
		String oper = object.get("oper").getAsString();
		String course = object.get("course").getAsString();
		String teacher = object.get("teacher").getAsString();
		String homework = object.get("homework").getAsString();
		String date = object.get("date").getAsString();
		
		String sql = "";
		if(oper.equals("insert"))
		{
			sql = "insert into homework(course, teacher, homework, date)"
					+ "values('"+course+"', '"+teacher+"', '"+homework+"', '"+date+"')";
		}else if(oper.equals("update"))
		{
			sql = "update homework set teacher='"+teacher+"', homework='"+homework+"', date='"+date+"' where course='"+course+"'";
		}
		InsertDB.insertData(sql);
	}

}
