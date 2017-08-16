package utils;

import java.io.UnsupportedEncodingException;

/*
 * ±àÂë×ª»» 
 */
public class CharsetSwitch {
	/*
	 * ISO-8859-1 ×ª»»Îª utf-8
	 */
	public static String ISO_To_Utf8(String src)
	{
		byte[] src_buff = null;
		try {
			src_buff = src.getBytes("ISO-8859-1");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		String target = null;
		try {
			target = new String(src_buff, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return target;
	}

}
