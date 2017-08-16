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
        //截取到当前文件名用于比较
        String targetURL = currentURL.substring(currentURL.lastIndexOf("/"), currentURL.length());
	    System.out.println(targetURL);
	}
	

}
