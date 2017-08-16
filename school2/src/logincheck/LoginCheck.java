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
		/*********登录时先检查Session是否有值，有的话禁止登录*********/
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-type", "text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		if(session != null)
		{
			if(session.getAttribute("user") != null)
			{
				out.println("<script>");
				out.println("alert('用户:"+(session.getAttribute("user"))+" 在登录中，请注销该用户再登录!');");
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
		/********普通方法校验************/
	//	String[] user = UserCheck.check(username, password);
		/***********PreparedStatement预编译防御sql注入***************/
		String[] user = UserCheck2.check(username, password);
	    if(user[1].equals(""))
	    {
	    	/**不存在该用户，再次跳转到登录界面，并给予提示**/
	    	out.println("<script>");
	    	out.println("alert('用户名或者密码错误!');");
	    //	response.sendRedirect("/school/login.html");
	    	out.println("window.location.href='/school2/login.html'");///school
	    	out.println("</script>");
	    }else{
	    	/****存在名为user的用户，进行传值跳转***/
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
