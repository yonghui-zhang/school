package chat;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import database.ConnDB;
import database.SelectDB;

/*
 * ��Ϣ����
 */
public class MessagePush {

	private  int oldParentMsgNum = 0;
	private  int oldTeacherMsgNum = 0;
//	private static MessagePush messagePush = new MessagePush();
	private Statement statement = ConnDB.connDatabase();//���ݿ�����
//	private MessagePush(){}//����ģʽ
/*	public static MessagePush getMessagePush()
	{
		return messagePush;
	}
	*/
	/*
	 * ����²����������Ϣ
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
			   //����������
				try {
					rs.next();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				currentFlag++;
			}
			
			ArrayList<ParentSend> newParentData = new ArrayList<ParentSend>();//���ݿ�ҳ�������Ϣ�����²�ѯ
			/**********���������**********/
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
			   //����������
				try {
					rs.next();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				currentFlag++;
			}
			
			ArrayList<TeacherSend> newTeacherData = new ArrayList<TeacherSend>();//���ݿ���ʦ������Ϣ�����²�ѯ
			/**********���������**********/
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
