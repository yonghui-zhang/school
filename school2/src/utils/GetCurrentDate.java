package utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/*
 * 获得当前的时间
 */
public class GetCurrentDate {
	
	public static String getTime()
	{
		Date date = new Date();
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = format.format(date);
		return time;
	}
	public static void main(String[] args)
	{
		String dateString1 = "2017-7-8  11:1:34";
		String dateString2 = "2017-7-8  11:29:29";
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			Date date1 = format.parse(dateString1);
			Date date2 = format.parse(dateString2);
			int i = date1.compareTo(date2);
			System.out.println(i);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	
		
	}
}
