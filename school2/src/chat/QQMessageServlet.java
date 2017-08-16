package chat;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import utils.JsonString;
/*
 * ������Ϣ��̨��ѯ
 */
public class QQMessageServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		  doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		/*************��ǰ̨ajax��ȡ����***************/
		String json = JsonString.getJsonString(request);
		System.out.println(json);
		
		JsonParser parser = new JsonParser();//����json������
		JsonObject object = (JsonObject) parser.parse(json);
		
		String sender = object.get("sender").getAsString();
		String receiver = object.get("receiver").getAsString();
		
		HttpSession session = request.getSession();
		String type = (String) session.getAttribute("type");
		/**********��̨���ݿ��ѯ****************/
	//	MessagePush messagePush = MessagePush.getMessagePush();
		MessagePush messagePush = new MessagePush();
		String returnJson = "";
		if(type.equals("teacher"))
		{
			ArrayList<ParentSend> list = messagePush.getNewMessageData(type, sender, receiver);
			/***********���췵��json����**************/
		    if(list.size() > 0)
		    {
		    	StringBuffer stringBuff = new StringBuffer("{\"parentMsg\":[");
				
				for(ParentSend parentSend : list)
				{
				    stringBuff.append("{\"parent_send\":\""+parentSend.getParent_send()+"\", \"comment\":\""+parentSend.getComment()+"\", \"date\":\""+parentSend.getDate()+"\"},");
				}
				returnJson = stringBuff.toString();
				returnJson = returnJson.substring(0, returnJson.length()-1);
				returnJson = returnJson + "]}";
		    }else{
		    	returnJson = "no new data";
		    }
			
		//	stringBuff.append("]}");
			
			
		}else if(type.equals("parent"))
		{
			ArrayList<TeacherSend> list = messagePush.getNewMessageData(type, sender, receiver);
			/***********���췵��json����**************/
			if(list.size() > 0)
			{
				StringBuffer stringBuff = new StringBuffer("{\"teacherMsg\":[");
				
				for(TeacherSend teacherSend : list)
				{
					stringBuff.append("{\"teacher_send\":\""+teacherSend.getTeacher_send()+"\", \"comment\":\""+teacherSend.getComment()+"\", \"date\":\""+teacherSend.getDate()+"\"},");
				}
				returnJson = stringBuff.toString();
				returnJson = returnJson.substring(0, returnJson.length()-1);
				returnJson = returnJson + "]}";
			}else{
				returnJson = "no new data";
			}
			
	//		stringBuff.append("]}");
			
		}
		  /********��ȡ����**************/
		response.setCharacterEncoding("utf-8");
	//	response.setContentType("application/json");
		response.setHeader("Content-type", "text/html;charset=utf-8");
	///	returnJson = "aaa{\"sender\":\"��쿺�\"}";
		System.out.println(returnJson);
	    PrintWriter out = response.getWriter();
		out.println(returnJson);
	//    out.println("������");
	//	out.flush();
	//	out.close();
	}

}
