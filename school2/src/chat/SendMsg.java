package chat;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import database.InsertDB;
import utils.CharsetSwitch;
import utils.GetCurrentDate;
/*
 * 进行发留言
 */
public class SendMsg extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		/********获取参数*********/
		String requestURI = request.getRequestURI();
		String receiver = request.getParameter("name");
		String comment = request.getParameter("comment");
		HttpSession session = request.getSession();
		String sender = (String) session.getAttribute("user");
		String date = GetCurrentDate.getTime();
		String type = (String) session.getAttribute("type");
		
        receiver = CharsetSwitch.ISO_To_Utf8(receiver);
        comment = CharsetSwitch.ISO_To_Utf8(comment);
		/******进行数据库操作********/
		String sql = "";
		String url = "";
		if(type.equals("parent"))
		{
			/*****家长给老师留言*****/
			sql = "insert into parentsend(parent_send, teacher_recv, comment, date)"
					+ "values('"+ sender +"', '"+ receiver +"', '"+ comment +"', '"+ date +"')";
			url = "/school/parent_chat.jsp";
		}else if(type.equals("teacher"))
		{
			/******老师给家长留言*******/
			sql =  "insert into teachersend(teacher_send, parent_recv, comment, date)"
					+ "values('"+ sender +"', '"+ receiver +"', '"+ comment +"', '"+ date +"')";
		   url = "/school/teacher_chat.jsp";
		}
		InsertDB.insertData(sql);
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-type", "text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		out.println("<script>");
		out.println("alert('留言发送成功!');");
		out.println("window.location.href='"+ url +"'");
		out.println("</script>");
	}

}
