package chat;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import database.ConnDB;
import database.SelectDB;

/*
 * 消息推送
 */
public class MessagePush {

	private  int oldParentMsgNum = 0;
	private  int oldTeacherMsgNum = 0;
//	private static MessagePush messagePush = new MessagePush();
	private Statement statement = ConnDB.connDatabase();//数据库连接
//	private MessagePush(){}//单例模式
/*	public static MessagePush getMessagePush()
	{
		return messagePush;
	}
	*/
	/*
	 * 获得新插入的留言消息
	 */
	public ArrayList getNewMessageData(String type, String sender, String receiver)
	{
		String sql = "";
		if(type.equals("teacher"))
		{
			sql = "select * from parentsend where parent_send='"+ sender +"' and teacher_recv='"+ receiver +"'";
			ResultSet rs = SelectDB.selectData2(sql, statement);
			int currentFlag = 0;
			while(currentFlag < oldParentMsgNum)
			{
			   //跳过老数据
				try {
					rs.next();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				currentFlag++;
			}
			
			ArrayList<ParentSend> newParentData = new ArrayList<ParentSend>();//数据库家长发送消息的最新查询
			/**********获得新数据**********/
			try {
				while(rs.next())
				{
					oldParentMsgNum++;
					ParentSend parentSend = new ParentSend();
					parentSend.setParent_send(rs.getString("parent_send"));
					parentSend.setTeacher_recv(rs.getString("teacher_recv"));
					parentSend.setComment(rs.getString("comment"));
					parentSend.setDate(rs.getString("date"));
					newParentData.add(parentSend);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return newParentData;
		}else if(type.equals("parent"))
		{
			sql = "select * from teachersend where teacher_send='"+ sender +"' and parent_recv='"+ receiver +"'"; 
			ResultSet rs = SelectDB.selectData2(sql, statement);
			int currentFlag = 0;
			while(currentFlag < oldTeacherMsgNum)
			{
			   //跳过老数据
				try {
					rs.next();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				currentFlag++;
			}
			
			ArrayList<TeacherSend> newTeacherData = new ArrayList<TeacherSend>();//数据库老师发送消息的最新查询
			/**********获得新数据**********/
			try {
				while(rs.next())
				{
					oldTeacherMsgNum++;
					TeacherSend teacherSend = new TeacherSend();
					teacherSend.setTeacher_send(rs.getString("teacher_send"));
					teacherSend.setParent_recv(rs.getString("parent_recv"));
					teacherSend.setComment(rs.getString("comment"));
					teacherSend.setDate(rs.getString("date"));
					newTeacherData.add(teacherSend);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return newTeacherData;
		}
		return null;
	}
	
	
	public static void main(String[] args) {
		
	}
}
