package refresh;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import chat.CombineSend;

/*
 * ��Ϣ�Ķ�̬ˢ��
 */
public class MessageRefresh2 {
	
	 /*����HashMap��¼���ݿ��е�ǰ����Ϣ��, ��¼������Ϣ*/
	 /********Map<(sender,receiver), Message>**********/
	public static Map<MapKey, Message> messageMap = new HashMap<MapKey, Message>();
	/*
     * ֻ��ø��µ�list����
     */
	public static ArrayList<CombineSend> getNewList(ArrayList<CombineSend> list, 
			String type, String sender, String receiver)
    {
		    MapKey key = new MapKey();
			key.setSender(sender);
			key.setReceiver(receiver);
			Message message = messageMap.get(key);
			if(message == null)
			{
				/********˵���ǵ�һ�μ�������,��¼��������ֱ�ӷ���*****/
				Message msg = new Message();
				
				msg.setMessage(list.size());
				
				messageMap.put(key, msg);
				System.out.println("none:" + sender + "-��" + receiver + "��" + list.size());
				return list;
			}else{
				/*********�޸�Map��¼��Ȼ���ȡ���µ����ݹ����µ�list*********/
				int oldMsgNum = message.getMessage();
				System.out.println("old:" + sender + "-��" + receiver + "��" + message.getMessage());
				int newMsgNum = list.size();
				ArrayList<CombineSend> newList = new ArrayList<CombineSend>();
				for(int i=oldMsgNum;i<newMsgNum;i++)
				{
					newList.add(list.get(i));
				}
				
			    message.setMessage(newMsgNum);
			    System.out.println("new:" + sender + "-��" + receiver + "��" + message.getMessage());
			    return newList;
			}	
    }
}



