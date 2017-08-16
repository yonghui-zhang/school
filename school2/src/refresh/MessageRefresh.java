package refresh;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import chat.CombineSend;

/*
 * ��Ϣ�Ķ�̬ˢ��
 */
public class MessageRefresh {
	/******���õ���ģʽ��֤�������Ψһ*********/
/*	private MessageRefresh messageRefresh = new MessageRefresh();
	private MessageRefresh(){}
	public MessageRefresh getMessageRefresh()
	{
		return messageRefresh;
	}
	*/
	
	 /*����HashMap��¼���ݿ��е�ǰ����Ϣ��, �����¼��ʦ���ҳ�������Ϣ*/
	 /********Map<Parent, (Teacher, messageNum)>**********/
	public static Map<String, TeacherMessage> messageMap = new HashMap<String, TeacherMessage>();
	/*****************�����¼�ҳ�����ʦ������Ϣ ****/
	public static Map<String, ParentMessage> messageMap2 = new HashMap<String, ParentMessage>();
	/*
     * ֻ��ø��µ�list����
     */
	public static ArrayList<CombineSend> getNewList(ArrayList<CombineSend> list, 
			String type, String sender, String receiver)
    {
		if(type.equals("parent"))
		{
			TeacherMessage teacherMsg = messageMap.get(receiver);
			if(teacherMsg == null)
			{
				/********˵���ǵ�һ�μ�������,��¼��������ֱ�ӷ���*****/
				TeacherMessage tm = new TeacherMessage();
				tm.setMessage(list.size());
				tm.setTeacher(sender);
				messageMap.put(receiver, tm);
				
				return list;
			}else{
				/*********�޸�Map��¼��Ȼ���ȡ���µ����ݹ����µ�list*********/
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
				/********˵���ǵ�һ�μ�������,��¼��������ֱ�ӷ���*****/
				ParentMessage pm = new ParentMessage();
				pm.setMessage(list.size());
				pm.setParent(sender);
				messageMap2.put(receiver, pm);
				
				return list;
			}else{
				/*********�޸�Map��¼��Ȼ���ȡ���µ����ݹ����µ�list*********/
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
			System.out.println("type���ݴ���");
			return null;
		}
    }
}



