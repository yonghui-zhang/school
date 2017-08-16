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
 * �ҳ������
 */
public class InsertParent extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		/*************��ȡajax�ύ������*****************/
		String json = JsonString.getJsonString(request);
		System.out.println(json);
		
		JsonParser parser = new JsonParser();//����json������
		JsonObject object = (JsonObject) parser.parse(json);
		
		String oper = object.get("oper").getAsString();
		String name = object.get("name").getAsString();
		String phone = object.get("phone").getAsString();
		String childname = object.get("childname").getAsString();
		String relation = object.get("relation").getAsString();
		
		
		String sql = "";
		if(oper.equals("insert"))
		{
			sql = "insert into parentInfo(name, phone, childname, relation)"
					+ "values('"+name+"', '"+phone+"', '"+childname+"', '"+relation+"')";
		}else if(oper.equals("update"))
		{
			sql = "update parentInfo set phone='"+phone+"', childname='"+childname+"', relation='"+relation+"'"
							+ "where name='"+name+"'";
		}
		InsertDB.insertData(sql);
	}

}
