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

public class InsertScore extends HttpServlet {

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
		String studentname = object.get("studentname").getAsString();
		String course = object.get("course").getAsString();
		String score = object.get("score").getAsString();
		
		String sql = "";
		if(oper.equals("insert"))
		{
			sql = "insert into score(studentname, course, score)"
					+ "values('"+studentname+"', '"+course+"', '"+score+"')";
		}else if(oper.equals("update"))
		{
			sql = "update score set course='"+course+"', score='"+score+"' where studentname='"+studentname+"'";
		}
		InsertDB.insertData(sql);
	}

}
