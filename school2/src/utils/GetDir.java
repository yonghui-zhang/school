package utils;

public class GetDir {

	public static void main(String[] args) {
	/*  String str = "/school/upload/image/20170711/1499776710650070605.jpg,"
	  		+ "/school/upload/image/20170711/1499776710650070605.jpg,"
	  		+ "/school/upload/image/20170711/1499776710650070605.jpg";
	   if(str.indexOf("/school") != -1)
	   {
		   str = str.replaceAll("/school", "..");
	   }
	   System.out.println(str);
	   */
		String currentURL = "/teacher_student.jsp";
        //��ȡ����ǰ�ļ������ڱȽ�
        String targetURL = currentURL.substring(currentURL.lastIndexOf("/"), currentURL.length());
	    System.out.println(targetURL);
	}
	

}
