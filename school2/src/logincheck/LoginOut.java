package logincheck;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import database.SelectDB;
import refresh.MapKey;
import refresh.Message;
import refresh.MessageRefresh;
import refresh.MessageRefresh2;
import refresh.ParentMessage;
import refresh.TeacherMessage;

/*
 * 退出登录
 */
public class LoginOut extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		HttpSession session = request.getSession(false);
		if(session == null)
		{
			response.sendRedirect("/school2/index.jsp");///school
			return ;
		}
		String user = (String) session.getAttribute("user");
		String type = (String) session.getAttribute("type");
		/***************清空HashMap中的消息记录为0**************/
		if(type.equals("teacher"))
		{
			String sql = "select name from parentInfo";
			ResultSet rs = SelectDB.selectData(sql);
			MapKey key = new MapKey();

			key.setReceiver(user);
			try {
				while(rs.next())
				{
					key.setSender(rs.getString("name"));
					Message message = MessageRefresh2.messageMap.get(key);
					if(message != null)
					{
						message.setMessage(0);
					}
					
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}else if(type.equals("parent")){
			
			String sql = "select name from teacherInfo";
			ResultSet rs = SelectDB.selectData(sql);
			MapKey key = new MapKey();

			key.setReceiver(user);
			try {
				while(rs.next())
				{
					key.setSender(rs.getString("name"));
					Message message = MessageRefresh2.messageMap.get(key);
					if(message != null)
					{
						message.setMessage(0);
					}
					
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		session.removeAttribute("user");
		session.removeAttribute("type");
		response.sendRedirect("/school2/index.jsp");///school
		
	}

}
