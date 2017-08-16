package chat;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import utils.JsonString;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class QQMessageServlet2 extends HttpServlet {

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
		MessagePush2 messagePush = new MessagePush2();
		String returnJson = "";
		if(type.equals("teacher"))
		{
			ArrayList<CombineSend> list = messagePush.getNewMessageData(type, sender, receiver);
			/***********���췵��json����**************/
			if(list == null)
			{
				return ;
			}
		    if(list.size() > 0)
		    {
		    	StringBuffer stringBuff = new StringBuffer("{\"parentMsg\":[");
				
				for(CombineSend cs : list)
				{
				    stringBuff.append("{\"headimg\":\""+cs.getHeadimg()+"\",\"send\":\""+cs.getSend()+"\", "
				    		+ "\"comment\":\""+
				cs.getComment()+"\", \"date\":\""+cs.getDate()+"\"},");
				}
				returnJson = stringBuff.toString();
				returnJson = returnJson.substring(0, returnJson.length()-1);
				returnJson = returnJson + "]}";
		    }else{
		    	returnJson = "no new data";
		    }
		}else if(type.equals("parent"))
		{
			ArrayList<CombineSend> list = messagePush.getNewMessageData(type, sender, receiver);
			/***********���췵��json����**************/
			if(list == null)
			{
				return;
			}
			if(list.size() > 0)
			{
				StringBuffer stringBuff = new StringBuffer("{\"teacherMsg\":[");
				
				for(CombineSend cs : list)
				{
					stringBuff.append("{\"headimg\":\""+cs.getHeadimg()+"\",\"send\":\""+cs.getSend()
							+"\", \"comment\":\""+cs.getComment()+"\", \"date\":\""+cs.getDate()+"\"},");
				}
				returnJson = stringBuff.toString();
				returnJson = returnJson.substring(0, returnJson.length()-1);
				returnJson = returnJson + "]}";
			}else{
				returnJson = "no new data";
			}
			
		}
		  /********��ȡ����**************/
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-type", "text/html;charset=utf-8");
		System.out.println(returnJson);
	    PrintWriter out = response.getWriter();
		out.println(returnJson);
	}

}
