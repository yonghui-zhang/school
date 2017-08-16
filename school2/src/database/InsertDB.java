package database;

import java.sql.SQLException;
import java.sql.Statement;

public class InsertDB {

	public static void insertData(String sql)
	{
		Statement statement = null;
		statement = ConnDB.connDatabase();
		try {
			statement.executeUpdate(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
	

	}

}
