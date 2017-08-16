package utils;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

/*
 * »ñµÃjson String×Ö·û´®
 */
public class JsonString {

	public static String getJsonString(HttpServletRequest request)
	{
		StringBuffer json = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = request.getReader();
			while((line=reader.readLine()) != null)
			{
				json.append(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
}
