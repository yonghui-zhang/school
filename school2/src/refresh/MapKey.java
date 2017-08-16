package refresh;
/*
 * ��ϢMap
 */
public class MapKey {
	private String sender;
	private String receiver;
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	/*
	 * һ��Ҫ�ǵ�����equals��hashCode()����,����ȽϵĽ����������Ҫ�ģ���Ϊkey����������ֵ�ᱻ����
	 */
	@Override
	public boolean equals(Object obj) {
		
		MapKey key = (MapKey) obj;
		if(key.getSender().equals(this.sender) && 
				key.getReceiver().equals(this.receiver))
		{
			return true;
		}else{
			return false;
		}
	}
	@Override
	public int hashCode() {
		int hash = this.sender.hashCode();
		hash = hash + this.receiver.hashCode();
		return hash;
	}
}
