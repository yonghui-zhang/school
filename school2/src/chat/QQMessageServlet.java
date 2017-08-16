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
 * 留言消息后台查询
 */
public class QQMessageServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		  doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		/*************从前台ajax获取数据***************/
		String json = JsonString.getJsonString(request);
		System.out.println(json);
		
		JsonParser parser = new JsonParser();//创建json解析器
		JsonObject object = (JsonObject) parser.parse(json);
		
		String sender = object.get("sender").getAsString();
		String receiver = object.get("receiver").getAsString();
		
		HttpSession session = request.getSession();
		String type = (String) session.getAttribute("type");
		/**********后台数据库查询****************/
	//	MessagePush messagePush = MessagePush.getMessagePush();
		MessagePush messagePush = new MessagePush();
		String returnJson = "";
		if(type.equals("teacher"))
		{
			ArrayList<ParentSend> list = messagePush.getNewMessageData(type, sender, receiver);
			/***********构造返回json数据**************/
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
			/***********构造返回json数据**************/
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
		  /********获取参数**************/
		response.setCharacterEncoding("utf-8");
	//	response.setContentType("application/json");
		response.setHeader("Content-type", "text/html;charset=utf-8");
	///	returnJson = "aaa{\"sender\":\"董炜红\"}";
		System.out.println(returnJson);
	    PrintWriter out = response.getWriter();
		out.println(returnJson);
	//    out.println("哈哈哈");
	//	out.flush();
	//	out.close();
	}

}
