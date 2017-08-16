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
 * 老师表插入
 */
public class InsertTeacher extends HttpServlet {

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
		String name = object.get("name").getAsString();
		String sex = object.get("sex").getAsString();
		String job = object.get("job").getAsString();
		String age = object.get("age").getAsString();
		String phone = object.get("phone").getAsString();
		String mail = object.get("mail").getAsString();
		String address = object.get("address").getAsString();
		
		String sql = "";
		if(oper.equals("insert"))
		{
			sql = "insert into teacherInfo(name, sex, job, age, phone, mail, address)"
					+ "values('"+name+"', '"+sex+"', '"+job+"', '"+age+"', '"+phone+"', '"+mail+"', '"+address+"')";
		}else if(oper.equals("update"))
		{
			sql = "update teacherInfo set sex='"+sex+"', job='"+job+"', age='"+age+"',"
					+ "phone='"+phone+"', mail='"+mail+"', address='"+address+"' "
							+ "where name='"+name+"'";
		}
		InsertDB.insertData(sql);
	}

}
