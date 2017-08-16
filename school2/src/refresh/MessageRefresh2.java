package refresh;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import chat.CombineSend;

/*
 * 消息的动态刷新
 */
public class MessageRefresh2 {
	
	 /*利用HashMap记录数据库中当前的消息数, 记录发送消息*/
	 /********Map<(sender,receiver), Message>**********/
	public static Map<MapKey, Message> messageMap = new HashMap<MapKey, Message>();
	/*
     * 只获得更新的list部分
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
				/********说明是第一次加载数据,记录下数据量直接放行*****/
				Message msg = new Message();
				
				msg.setMessage(list.size());
				
				messageMap.put(key, msg);
				System.out.println("none:" + sender + "-》" + receiver + "：" + list.size());
				return list;
			}else{
				/*********修改Map记录，然后截取最新的数据构造新的list*********/
				int oldMsgNum = message.getMessage();
				System.out.println("old:" + sender + "-》" + receiver + "：" + message.getMessage());
				int newMsgNum = list.size();
				ArrayList<CombineSend> newList = new ArrayList<CombineSend>();
				for(int i=oldMsgNum;i<newMsgNum;i++)
				{
					newList.add(list.get(i));
				}
				
			    message.setMessage(newMsgNum);
			    System.out.println("new:" + sender + "-》" + receiver + "：" + message.getMessage());
			    return newList;
			}	
    }
}



