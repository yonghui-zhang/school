package database;

import java.sql.SQLException;
import java.sql.Statement;

public class DeleteDB {
	
	public static void deleteData(String sql)
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
