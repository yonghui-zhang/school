package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/*
 * 连接数据库
 */
public class ConnDB {
	
	public static Statement connDatabase2()//43.247.68.242
	{
		  Connection conn;
	      Statement statement = null;
	      String url = "jdbc:sqlserver://43.247.68.242:1433;DatabaseName=school;";
		  try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection(url, "zyh", "123");
			statement = conn.createStatement();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		  return statement;
	}
	public static Statement connDatabase()
	{
		  Connection conn;
	      Statement statement = null;
	      String url = "jdbc:sqlserver://127.0.0.1:1433;DatabaseName=school;";
		  try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection(url, "sa", "sa");
			statement = conn.createStatement();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		  return statement;
	}
	/*
	 * 得到数据库的一个连接
	 */
	public static Connection getConnection()
	{
		 Connection conn = null;
	     String url = "jdbc:sqlserver://127.0.0.1:1433;DatabaseName=school;";
		 try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection(url, "sa", "sa");
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		 return conn;
	}
}
