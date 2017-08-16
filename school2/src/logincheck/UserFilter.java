package logincheck;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
/*
 * �Ƿ��û�������
 */
public class UserFilter implements Filter {

	@Override
	public void destroy() {
		

	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		 HttpServletRequest request = (HttpServletRequest) arg0;
         HttpServletResponse response = (HttpServletResponse) arg1;
         FilterChain chain = (FilterChain) arg2;
         //��ȡ��Ŀ¼����Ӧ�ľ���·��
         String currentURL = request.getRequestURI();
         //��ȡ����ǰ�ļ������ڱȽ�
         String targetURL = currentURL.substring(currentURL.lastIndexOf("/"), currentURL.length());
         HttpSession session = request.getSession(false);
         if(!"/login.html".equals(targetURL) && !"/index.jsp".equals(targetURL))
         {
        	 if(session == null || session.getAttribute("user") == null)
        	 {
        		 response.sendRedirect(request.getContextPath() + "/login.html");
        		 return ;
        	 }
         }
         chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
