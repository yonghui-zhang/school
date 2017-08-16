package logincheck;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import database.ConnDB;
import database.SelectDB;

public class LoginCheck extends HttpServlet {


	private static final long serialVersionUID = -4729431760785859146L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		/*********��¼ʱ�ȼ��Session�Ƿ���ֵ���еĻ���ֹ��¼*********/
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-type", "text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		if(session != null)
		{
			if(session.getAttribute("user") != null)
			{
				out.println("<script>");
				out.println("alert('�û�:"+(session.getAttribute("user"))+" �ڵ�¼�У���ע�����û��ٵ�¼!');");
				out.println("window.location.href='/school2/index.jsp'");///school
				out.println("</script>");
				return ;
			}	
		}
		String username = request.getParameter("username").trim();
		String password = request.getParameter("password").trim();
		//System.out.println("username:" + username);
		//System.out.println("password:" + password);
		
	
	//	out.write("username:" + username);
	//	out.write("password:" + password);
		/********��ͨ����У��************/
	//	String[] user = UserCheck.check(username, password);
		/***********PreparedStatementԤ�������sqlע��***************/
		String[] user = UserCheck2.check(username, password);
	    if(user[1].equals(""))
	    {
	    	/**�����ڸ��û����ٴ���ת����¼���棬��������ʾ**/
	    	out.println("<script>");
	    	out.println("alert('�û��������������!');");
	    //	response.sendRedirect("/school/login.html");
	    	out.println("window.location.href='/school2/login.html'");///school
	    	out.println("</script>");
	    }else{
	    	/****������Ϊuser���û������д�ֵ��ת***/
	    	//session = request.getSession();
	    	session.setAttribute("user", user[1]);
	    	session.setAttribute("type", user[0]);
	    	if(user[0].equals("admin"))
	    	{
	    		response.sendRedirect("/school2/admin_teacher.jsp");///school
	    	}else if(user[0].equals("teacher"))
	    	{
	    		response.sendRedirect("/school2/teacher_student.jsp");///school
	    	}else if(user[0].equals("parent"))
	    	{  
	    		response.sendRedirect("/school2/parent_teacher.jsp");///school
	    	}
	    	
	    	
	    }
	}
	
}
