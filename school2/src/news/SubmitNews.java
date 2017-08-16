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
 * ���ŵ��ύ
 */
public class SubmitNews extends HttpServlet {

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
		
		String newscontent = object.get("newscontent").getAsString();
		String filename = object.get("filename").getAsString();
		String title = object.get("newstitle").getAsString();
		String date = GetCurrentDate.getTime() ;
		
		HttpSession session = request.getSession();
		String teacher = (String) session.getAttribute("user"); 
		/***********����Ŀ��Ŀ¼�½�html�ļ����б���*******************/
	//	String path = request.getRealPath("/") + "news";//������
		String path = this.getServletContext().getRealPath("/news");
		System.out.println(path);
	//	String filepath = path + "\\1.html";
		String filepath = path + "\\" + filename;
		File filehtml = new File(filepath);
		if(filehtml.exists())
		{
			System.out.println("���ܴ����ظ����ļ�");
			return ;
		}
		filehtml.createNewFile();
		/***************����һ��html����ģ��*********************/
		StringBuilder builder = new StringBuilder();//����һ���ַ���������
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
		builder.append(newscontent);//�����ȡ����������
		/**********����ҳ����Ϣ************/
		builder.append("<span>"+ teacher +"��ʦ  ������  "+ date +"</span>");
		builder.append("</body>");
		builder.append("\n");
		builder.append("</html>");
		builder.append("\n");
		
		FileWriter fileWriter = new FileWriter(filehtml);
		fileWriter.write(builder.toString());
		fileWriter.close();
		String str = builder.toString();
	
		/*******�����ŵı���ʹ���ʱ���Լ�html�ļ�·���������ݿ�**********/
		String sql = "insert into news(title, newspath, date) values('"+ title +"', '"+ filename +"', '"+ date +"')";
		InsertDB.insertData(sql);
	}
	/*
	 * �������е�ͼƬ·�����и���
	 */
	public String imgPathChange(String newscontent)
	{
		/*********�����ڲ�����ͼƬ***********/
		if(newscontent.indexOf("/school2") != -1)
		{
			newscontent = newscontent.replaceAll("/school2", "..");
		}
		return newscontent;
	}

}
