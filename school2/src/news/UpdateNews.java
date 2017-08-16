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
 * ��������
 */
public class UpdateNews extends HttpServlet {

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
		
		String newspath = object.get("newspath").getAsString();
		/***********����Ŀ��Ŀ¼ȡ���ض����Ƶ�html�ļ������޸�ʹ��************/
		String path = this.getServletContext().getRealPath("/news");
		System.out.println(path);
		String filepath = path + "\\" + newspath;
		File filehtml = new File(filepath);
		
		String srchtml = getNewsHtml(filehtml);
		/********ȡ��Ueditor����ʶ���html����********/
		String html = srchtml.substring(srchtml.lastIndexOf("<body>")+6, srchtml.lastIndexOf("</body>"));
		/********��ajaxǰ̨��Ӧ����**************/
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
