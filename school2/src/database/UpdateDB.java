package database;

import java.sql.SQLException;
import java.sql.Statement;

public class UpdateDB {
	
	public static void UpdateData(String sql)
	{
		Statement statement = null;
		statement = ConnDB.connDatabase();
		try {
			statement.executeUpdate(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
