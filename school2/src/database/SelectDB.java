package database;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SelectDB{

	public static ResultSet selectData(String sql)
	{
	   //    String sql = "select * from student3";
	       Statement statement = null;
	       ResultSet rs = null;
	       try {
		       statement = ConnDB.connDatabase();
		       rs = statement.executeQuery(sql);
		       return rs;
		   } catch (SQLException e) {
					e.printStackTrace();
	       }
		return rs;
	}
	public static ResultSet selectData2(String sql, Statement statement)
	{
	       ResultSet rs = null;
	       try {
		       rs = statement.executeQuery(sql);
		       return rs;
		   } catch (SQLException e) {
					e.printStackTrace();
	       }
		return rs;
	}
}
