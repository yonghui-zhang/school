package logincheck;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import database.ConnDB;
import database.SelectDB;

/*
 * 用户身份验证, 利用PreparedStatement预编译，防御SQL注入攻击
 */
public class UserCheck2 {
	
	public static String adminCheck(Connection conn, String username, String password)
	{
		String sql = "select adminname from admin, adminInfo where admin.id=adminInfo.id and admin= ? and password= ?";
		ResultSet rs = null;
		try {
			PreparedStatement prepareStatement = conn.prepareStatement(sql);
			prepareStatement.setString(1, username);
			prepareStatement.setString(2, password);
			
			rs = prepareStatement.executeQuery();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		if(rs != null)
		{
			try {
				if(rs.next())
				{
				   return rs.getString("adminname");
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return "";
	}
	public static String teacherCheck(Connection conn, String username, String password)
	{
		String sql = "select name from teacher, teacherInfo where teacher.id=teacherInfo.id and username= ? and password= ?";
		ResultSet rs = null;
		try {
			PreparedStatement prepareStatement = conn.prepareStatement(sql);
			prepareStatement.setString(1, username);
			prepareStatement.setString(2, password);
			
			rs = prepareStatement.executeQuery();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		if(rs != null)
		{
			try {
				if(rs.next())
				{
				   return rs.getString("name");
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return "";
	}
	public static String parentCheck(Connection conn, String username, String password)
	{
		String sql = "select name from parent, parentInfo where parent.id=parentInfo.id and username= ? and password= ?";
		ResultSet rs = null;
		try {
			PreparedStatement prepareStatement = conn.prepareStatement(sql);
			prepareStatement.setString(1, username);
			prepareStatement.setString(2, password);
			
			rs = prepareStatement.executeQuery();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		if(rs != null)
		{
			try {
				if(rs.next())
				{
				   return rs.getString("name");
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return "";
	}
	
	public static String[] check(String username, String password)
	{
		Connection conn = ConnDB.getConnection();
		Statement statement = ConnDB.connDatabase();
		String[]  names= new String[2];
		names[1] = "";
		names[0] = "";
		
		names[1] = adminCheck(conn, username, password);
		if(!names[1].equals(""))
		{
			names[0] = new String("admin");
			return names;
		}
		names[1] = teacherCheck(conn, username, password);
		if(!names[1].equals(""))
		{
			names[0] = new String("teacher");
			return names;
		}
		names[1] = parentCheck(conn, username, password);
		if(!names[1].equals(""))
		{
			names[0] = new String("parent");
			return names;
		}
		return names;
	}

}
