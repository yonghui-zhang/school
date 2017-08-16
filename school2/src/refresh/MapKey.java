package refresh;
/*
 * 消息Map
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
	 * 一定要记得重载equals和hashCode()方法,否则比较的结果不是你想要的，因为key公共，所以值会被覆盖
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
