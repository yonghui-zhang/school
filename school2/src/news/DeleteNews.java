package news;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utils.JsonString;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import database.DeleteDB;
/*
 * ɾ������
 */
public class DeleteNews extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		/*************��ȡajax�ύ������*****************/
		String json = JsonString.getJsonString(request);
		System.out.println(json);
		
		JsonParser parser = new JsonParser();//����json������
		JsonObject object = (JsonObject) parser.parse(json);
		
		String newsname = object.get("newspath").getAsString();
		/***********����Ŀ��Ŀ¼ɾ��ָ����html������ҳ************/
		String path = this.getServletContext().getRealPath("/news");
		System.out.println("ɾ�����ŵ�Ŀ¼:" + path);
		String filepath = path + "\\" + newsname;
		File filehtml = new File(filepath);
		/************ɾ��html�ļ�***************/
		if(filehtml.exists())
		{
			filehtml.delete();
		}
		/************ɾ�����ݿ��ж��ڸ����ŵļ�¼**************/
		String sql = "delete from news where newspath='"+ newsname +"'";
		DeleteDB.deleteData(sql);
	}

}
