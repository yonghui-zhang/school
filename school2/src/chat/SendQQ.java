package chat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import utils.CharsetSwitch;
import utils.GetCurrentDate;
import database.InsertDB;
/*
 * �ύQQ����
 */
public class SendQQ extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
		/*	
		String sender = request.getParameter("iqqsender");
		String receiver = request.getParameter("iqqrecv");
		String comment = request.getParameter("icomment");
		String date = request.getParameter("idate");*/
		/*******����ת��**********/
	/*	sender = CharsetSwitch.ISO_To_Utf8(sender);
		receiver = CharsetSwitch.ISO_To_Utf8(receiver);
		comment = CharsetSwitch.ISO_To_Utf8(comment);
		date = CharsetSwitch.ISO_To_Utf8(date);
		String msg = sender + receiver + comment + date;*/
		
	//	out.println("<script>");
		//	out.println("alert('���Է��ͳɹ�!');");
	//	out.println("window.location.href='"+ url +"'");
	///	out.println("</script>");
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	           /********��ȡ����**************/
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-type", "text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
	
		/**************ʹ��ajax���ύ������**********/
		String json = getJsonString(request);
		System.out.println(json);
		/************����json����**********/
		JsonParser parser = new JsonParser();//����json������
		JsonObject object = (JsonObject) parser.parse(json);
		String sender = object.get("sender").getAsString();
		String receiver = object.get("receiver").getAsString();
		String comment = object.get("comment").getAsString();
		String date = object.get("date").getAsString();
		
		HttpSession session = request.getSession();
		String type = (String) session.getAttribute("type");
		//out.println("<script>alert('"+ msg +"')</script>");
		/******�������ݿ����********/
		String sql = "";
		String url = "";
		if(type.equals("parent"))
		{
			/*****�ҳ�����ʦ����*****/
			sql = "insert into parentsend(parent_send, teacher_recv, comment, date)"
					+ "values('"+ sender +"', '"+ receiver +"', '"+ comment +"', '"+ date +"')";
			url = "/school/parent_qq.jsp";
		}else if(type.equals("teacher"))
		{
			/******��ʦ���ҳ�����*******/
			sql =  "insert into teachersend(teacher_send, parent_recv, comment, date)"
					+ "values('"+ sender +"', '"+ receiver +"', '"+ comment +"', '"+ date +"')";
		   url = "/school/teacher_chat.jsp";
		}
		InsertDB.insertData(sql);
    
	   /*************��ǰ̨ajax�ص�������������**************/
		String result = "�ɹ�����������";
		out.println(result);
	}
	
	public String getJsonString(HttpServletRequest request)
	{
		StringBuffer json = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = request.getReader();
			while((line=reader.readLine()) != null)
			{
				json.append(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return json.toString();
		
	}

}
