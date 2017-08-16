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
 * 删除新闻
 */
public class DeleteNews extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		/*************获取ajax提交的数据*****************/
		String json = JsonString.getJsonString(request);
		System.out.println(json);
		
		JsonParser parser = new JsonParser();//创建json解析器
		JsonObject object = (JsonObject) parser.parse(json);
		
		String newsname = object.get("newspath").getAsString();
		/***********在项目根目录删除指定的html新闻网页************/
		String path = this.getServletContext().getRealPath("/news");
		System.out.println("删除新闻的目录:" + path);
		String filepath = path + "\\" + newsname;
		File filehtml = new File(filepath);
		/************删除html文件***************/
		if(filehtml.exists())
		{
			filehtml.delete();
		}
		/************删除数据库中对于该新闻的记录**************/
		String sql = "delete from news where newspath='"+ newsname +"'";
		DeleteDB.deleteData(sql);
	}

}
