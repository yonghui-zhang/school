package news;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import database.InsertDB;
import utils.GetCurrentDate;
import utils.JsonString;
/*
 * 新闻的提交
 */
public class SubmitNews extends HttpServlet {

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
		
		String newscontent = object.get("newscontent").getAsString();
		String filename = object.get("filename").getAsString();
		String title = object.get("newstitle").getAsString();
		String date = GetCurrentDate.getTime() ;
		
		HttpSession session = request.getSession();
		String teacher = (String) session.getAttribute("user"); 
		/***********在项目根目录新建html文件进行保存*******************/
	//	String path = request.getRealPath("/") + "news";//被废弃
		String path = this.getServletContext().getRealPath("/news");
		System.out.println(path);
	//	String filepath = path + "\\1.html";
		String filepath = path + "\\" + filename;
		File filehtml = new File(filepath);
		if(filehtml.exists())
		{
			System.out.println("不能创建重复的文件");
			return ;
		}
		filehtml.createNewFile();
		/***************创建一个html新闻模版*********************/
		StringBuilder builder = new StringBuilder();//创建一个字符串缓冲区
		builder.append("<!DOCTYPE html>");
		builder.append("\n");
		builder.append("<html>");
		builder.append("\n");
		builder.append("<head>");
		builder.append("\n");
		builder.append("<title>"+ title +"</title>");
		builder.append("\n");
		builder.append("</head>");
		builder.append("\n");
		builder.append("<body>");
		builder.append("\n");
		newscontent = imgPathChange(newscontent);
		builder.append(newscontent);//加入获取的新闻内容
		/**********加入页脚信息************/
		builder.append("<span>"+ teacher +"老师  发布于  "+ date +"</span>");
		builder.append("</body>");
		builder.append("\n");
		builder.append("</html>");
		builder.append("\n");
		
		FileWriter fileWriter = new FileWriter(filehtml);
		fileWriter.write(builder.toString());
		fileWriter.close();
		String str = builder.toString();
	
		/*******把新闻的标题和创建时间以及html文件路径插入数据库**********/
		String sql = "insert into news(title, newspath, date) values('"+ title +"', '"+ filename +"', '"+ date +"')";
		InsertDB.insertData(sql);
	}
	/*
	 * 对文章中的图片路径进行更改
	 */
	public String imgPathChange(String newscontent)
	{
		/*********看存在不存在图片***********/
		if(newscontent.indexOf("/school2") != -1)
		{
			newscontent = newscontent.replaceAll("/school2", "..");
		}
		return newscontent;
	}

}
