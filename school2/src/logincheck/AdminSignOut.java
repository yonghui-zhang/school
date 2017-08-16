package logincheck;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import database.InsertDB;

public class AdminSignOut extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String username = request.getParameter("username").trim();
		String password = request.getParameter("password").trim();
		
		String sql = "insert into admin(admin, password) values('"+ username +"', '"+ password +"')";
		InsertDB.insertData(sql);
		response.sendRedirect("/school/registersuccess.html");
	}

}
