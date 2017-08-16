package utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import chat.CombineSend;

/*
 * 按日期字符串对ArrayList进行排序，从小到大排序
 */
public class ArrayListSort {
  
	private static DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public static ArrayList<CombineSend> getSortedList(ArrayList<CombineSend> list)
	{
		/*******冒泡排序********/
		for(int i=0;i<list.size()-1;i++)
		{
			for(int j=0;j<list.size()-i-1;j++)
			{
				CombineSend cs1 = list.get(j);
				CombineSend cs2 = list.get(j+1);
				if(compareDateString(cs1.getDate(), cs2.getDate()) > 0)
				{
				   	list.set(j, cs2);
				   	list.set(j+1, cs1);
				}
			}
		}
		return list;
	}
    private static int compareDateString(String dateString1, String dateString2)
    {
    	Date date1 = null;
    	Date date2 = null;
    	try {
			date1 = format.parse(dateString1);
			date2 = format.parse(dateString2);
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
    	int i = date1.compareTo(date2);
		return i;
    }
	public static void main(String[] args) {
	

	}

}
