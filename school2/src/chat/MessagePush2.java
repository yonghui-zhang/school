package chat;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import refresh.MessageRefresh;
import refresh.MessageRefresh2;
import utils.ArrayListSort;
import database.ConnDB;
import database.SelectDB;
/*
 * 消息推送
 */
public class MessagePush2 {

	private Statement statement = ConnDB.connDatabase();//数据库连接
	private Statement statement2 = ConnDB.connDatabase();//数据库连接
	/*
	 * 获得新插入的留言消息
	 */
	public ArrayList getNewMessageData(String type, String sender, String receiver)
	{
		
		if(type.equals("teacher"))
		{
			
			String sql = "select * from parentsend where parent_send='"+ sender 
					+"' and teacher_recv='"+ receiver +"'";
			ResultSet rs = SelectDB.selectData2(sql, statement);
			String sql2 = "select * from teachersend where teacher_send='"+ receiver 
					+"' and parent_recv='"+ sender +"'"; 
			ResultSet rs2 = SelectDB.selectData2(sql2, statement2);
			/***查询头像***/
			String sql3 = "select headimg from parentInfo where name='"+ sender +"'";
			ResultSet rs3 = SelectDB.selectData(sql3);
			String sql4 = "select headimg from teacherInfo where name='"+ receiver +"'";
			ResultSet rs4 = SelectDB.selectData(sql4);
			ArrayList<CombineSend> data = new ArrayList<CombineSend>();//数据库家长发送消息的最新查询
			/**********获得新数据**********/
			try {
				String parentimg = "";
				/*******获取家长头像**********/
				if(rs3.next())
				{
					parentimg = rs3.getString("headimg");
				}
				String teacherimg = "";
				if(rs4.next())
				{
					teacherimg = rs4.getString("headimg");
				}
				while(rs.next())
				{
					CombineSend cs = new CombineSend();
					cs.setSend(rs.getString("parent_send"));
					cs.setRecv(rs.getString("teacher_recv"));
				    cs.setComment(rs.getString("comment"));
					cs.setDate(rs.getString("date"));
					cs.setHeadimg(parentimg);
					data.add(cs);
				}
				while(rs2.next())
				{
					CombineSend cs = new CombineSend();
					cs.setSend(rs2.getString("teacher_send"));
					cs.setRecv(rs2.getString("parent_recv"));
				    cs.setComment(rs2.getString("comment"));
					cs.setDate(rs2.getString("date"));
					cs.setHeadimg(teacherimg);
					data.add(cs);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			if(data.size() > 0)
			{
				data = ArrayListSort.getSortedList(data);//排序list
				/********截取新消息**********/
				data = MessageRefresh2.getNewList(data, type, sender, receiver);
			}
			return data;
		}else if(type.equals("parent"))
		{
			String sql = "select * from parentsend where parent_send='"+ receiver 
					+"' and teacher_recv='"+ sender +"'";
			ResultSet rs = SelectDB.selectData2(sql, statement);
			String sql2 = "select * from teachersend where teacher_send='"+ sender
					+"' and parent_recv='"+ receiver +"'"; 
			ResultSet rs2 = SelectDB.selectData2(sql2, statement2);
			/***查询头像***/
			String sql3 = "select headimg from parentInfo where name='"+ receiver +"'";
			ResultSet rs3 = SelectDB.selectData(sql3);
			String sql4 = "select headimg from teacherInfo where name='"+ sender +"'";
			ResultSet rs4 = SelectDB.selectData(sql4);
			ArrayList<CombineSend> data = new ArrayList<CombineSend>();//数据库家长发送消息的最新查询
			/**********获得新数据**********/
			try {
				String parentimg = "";
				/*******获取家长头像**********/
				if(rs3.next())
				{
					parentimg = rs3.getString("headimg");
				}
				/*******获取老师头像********/
				String teacherimg = "";
				if(rs4.next())
				{
					teacherimg = rs4.getString("headimg");
				}
				while(rs.next())
				{
					CombineSend cs = new CombineSend();
					cs.setSend(rs.getString("parent_send"));
					cs.setRecv(rs.getString("teacher_recv"));
				    cs.setComment(rs.getString("comment"));
					cs.setDate(rs.getString("date"));
					cs.setHeadimg(parentimg);
					data.add(cs);
				}
				while(rs2.next())
				{
					CombineSend cs = new CombineSend();
					cs.setSend(rs2.getString("teacher_send"));
					cs.setRecv(rs2.getString("parent_recv"));
				    cs.setComment(rs2.getString("comment"));
					cs.setDate(rs2.getString("date"));
					cs.setHeadimg(teacherimg);
					data.add(cs);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			if(data.size() > 0)
			{
				data = ArrayListSort.getSortedList(data);//排序list
				/********截取新消息list*****/
				data = MessageRefresh2.getNewList(data, type, sender, receiver);
			}
			return data;
		}
		return null;
	}
}
