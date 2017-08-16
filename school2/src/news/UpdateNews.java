package news;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utils.JsonString;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
/*
 * 更新新闻
 */
public class UpdateNews extends HttpServlet {

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
		
		String newspath = object.get("newspath").getAsString();
		/***********在项目根目录取出特定名称的html文件用于修改使用************/
		String path = this.getServletContext().getRealPath("/news");
		System.out.println(path);
		String filepath = path + "\\" + newspath;
		File filehtml = new File(filepath);
		
		String srchtml = getNewsHtml(filehtml);
		/********取出Ueditor可以识别的html部分********/
		String html = srchtml.substring(srchtml.lastIndexOf("<body>")+6, srchtml.lastIndexOf("</body>"));
		/********给ajax前台响应数据**************/
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-type", "text/html;charset=utf-8");
		String returnJson = "{\"root\":[{\"srchtml\":\"" + html + "\"}]}";
		System.out.println(returnJson);
	    PrintWriter out = response.getWriter();
		out.println(returnJson);
	}
	private String getNewsHtml(File file)
	{
		FileInputStream fin = null;
		StringBuilder builder = null;
		if(file.length() > 0)
		{
			try {
				fin = new FileInputStream(file);
			} catch (FileNotFoundException e) {
			
				e.printStackTrace();
			}
			InputStreamReader streamReader = new InputStreamReader(fin);
			BufferedReader reader = new BufferedReader(streamReader);
			String line;
			builder = new StringBuilder();
			try {
				while((line=reader.readLine())!=null)
				{
					builder.append(line);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				reader.close();
				fin.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return builder.toString();
			
		}
		return "";
		
	}

}
