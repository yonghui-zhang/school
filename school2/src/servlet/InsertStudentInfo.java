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
 * ѧ����Ϣ����������޸�
 */
public class InsertStudentInfo extends HttpServlet {

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
		String sid = object.get("sid").getAsString();
		String name = object.get("name").getAsString();
		String sex = object.get("sex").getAsString();
		String birth = object.get("birth").getAsString();
		String gotime = object.get("gotime").getAsString();
		String parentname = object.get("parentname").getAsString();
		String phone = object.get("phone").getAsString();
		String homeaddress = object.get("homeaddress").getAsString();
		String sjob = object.get("sjob").getAsString();
		String sql = "";
		if(oper.equals("insert"))
		{
			sql = "insert into studentInfo(sid, name, sex, birth, gotime, parentname, phone, homeaddress, sjob)"
					+ "values('"+sid+"', '"+name+"', '"+sex+"', '"+birth+"', '"+gotime+"', '"+parentname+"', '"+phone+"',"
							+ "'"+homeaddress+"', '"+sjob+"')";
		}else if(oper.equals("update"))
		{
			sql = "update studentInfo set name='"+name+"', sex='"+sex+"', birth='"+birth+"', gotime='"+gotime+"',"
					+ "parentname='"+parentname+"', phone='"+phone+"', homeaddress='"+homeaddress+"', sjob='"+sjob+"' "
							+ "where sid='"+sid+"'";
		}
		InsertDB.insertData(sql);
	}

}
