package logincheck;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import database.ConnDB;
import database.SelectDB;

/*
 * 用户身份验证,最好加上过滤程序，防止SQL注入攻击
 */
public class UserCheck {
	
	public static String adminCheck(Statement statement, String username, String password)
	{
		String sql = "select adminname from admin, adminInfo where admin.id=adminInfo.id and admin='"+ username +"' and password='"+ password +"'";
		ResultSet rs = SelectDB.selectData2(sql, statement);
		try {
			if(rs.next())
			{
			   return rs.getString("adminname");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "";
	}
	public static String teacherCheck(Statement statement, String username, String password)
	{
		String sql = "select name from teacher, teacherInfo where teacher.id=teacherInfo.id and username='"+ username +"' and password='"+ password +"'";
		ResultSet rs = SelectDB.selectData2(sql, statement);
		try {
			if(rs.next())
			{  
				return rs.getString("name");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "";
	}
	public static String parentCheck(Statement statement, String username, String password)
	{
		String sql = "select name from parent, parentInfo where parent.id=parentInfo.id and username='"+ username +"' and password='"+ password +"'";
		ResultSet rs = SelectDB.selectData(sql);
		try {
			if(rs.next())
			{
				return rs.getString("name");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public static String[] check(String username, String password)
	{
		Statement statement = ConnDB.connDatabase();
		String[]  names= new String[2];
		names[1] = "";
		names[0] = "";
		
		names[1] = adminCheck(statement, username, password);
		if(!names[1].equals(""))
		{
			names[0] = new String("admin");
			return names;
		}
		names[1] = teacherCheck(statement, username, password);
		if(!names[1].equals(""))
		{
			names[0] = new String("teacher");
			return names;
		}
		names[1] = parentCheck(statement, username, password);
		if(!names[1].equals(""))
		{
			names[0] = new String("parent");
			return names;
		}
		return names;
	}

}
