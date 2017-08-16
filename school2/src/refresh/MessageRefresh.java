package refresh;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import chat.CombineSend;

/*
 * 消息的动态刷新
 */
public class MessageRefresh {
	/******利用单例模式保证这个对象唯一*********/
/*	private MessageRefresh messageRefresh = new MessageRefresh();
	private MessageRefresh(){}
	public MessageRefresh getMessageRefresh()
	{
		return messageRefresh;
	}
	*/
	
	 /*利用HashMap记录数据库中当前的消息数, 这个记录老师给家长发送消息*/
	 /********Map<Parent, (Teacher, messageNum)>**********/
	public static Map<String, TeacherMessage> messageMap = new HashMap<String, TeacherMessage>();
	/*****************这个记录家长给老师发送消息 ****/
	public static Map<String, ParentMessage> messageMap2 = new HashMap<String, ParentMessage>();
	/*
     * 只获得更新的list部分
     */
	public static ArrayList<CombineSend> getNewList(ArrayList<CombineSend> list, 
			String type, String sender, String receiver)
    {
		if(type.equals("parent"))
		{
			TeacherMessage teacherMsg = messageMap.get(receiver);
			if(teacherMsg == null)
			{
				/********说明是第一次加载数据,记录下数据量直接放行*****/
				TeacherMessage tm = new TeacherMessage();
				tm.setMessage(list.size());
				tm.setTeacher(sender);
				messageMap.put(receiver, tm);
				
				return list;
			}else{
				/*********修改Map记录，然后截取最新的数据构造新的list*********/
				int oldMsgNum = teacherMsg.getMessage();
				int newMsgNum = list.size();
				ArrayList<CombineSend> newList = new ArrayList<CombineSend>();
				for(int i=oldMsgNum;i<newMsgNum;i++)
				{
					newList.add(list.get(i));
				}
				
			    teacherMsg.setMessage(newMsgNum);
			    return newList;
			}
		}else if(type.equals("teacher")){
			
			ParentMessage parentMsg = messageMap2.get(receiver);
			if(parentMsg == null)
			{
				/********说明是第一次加载数据,记录下数据量直接放行*****/
				ParentMessage pm = new ParentMessage();
				pm.setMessage(list.size());
				pm.setParent(sender);
				messageMap2.put(receiver, pm);
				
				return list;
			}else{
				/*********修改Map记录，然后截取最新的数据构造新的list*********/
				int oldMsgNum = parentMsg.getMessage();
				int newMsgNum = list.size();
				ArrayList<CombineSend> newList = new ArrayList<CombineSend>();
				for(int i=oldMsgNum;i<newMsgNum;i++)
				{
					newList.add(list.get(i));
				}
				
			    parentMsg.setMessage(newMsgNum);
			    return newList;
			}
		}else{
			System.out.println("type数据错误！");
			return null;
		}
    }
}



