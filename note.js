1. 自强学堂
2. 初次部署django+gunicorn+nginx  https://www.cnblogs.com/nanrou/p/7026802.html

3. 启动项目： /usr/local/python3/bin/gunicorn -w 3 -b 127.0.0.1:8000 mydjango.wsgi:application

4.nginx配置,注意第三部的端口号8000，nginx里用到


[root@VM_227_64_centos wwwroot]# more /etc/nginx/conf.d/dev.conf

server {
    listen       80;
    server_name www.developer1.cn;
#    root /www/wwwroot/php;

#    client_max_body_size 100M;

    location / {

  proxy_pass http://127.0.0.1:8000;
    }

}
[root@VM_227_64_centos wwwroot]#



5. django2 首页路由写法：  path('', learn_views.index),  # 引号就行
from django.contrib import admin
from django.urls import path
from learn import views as learn_views  # new
 
 
urlpatterns = [
    path('', learn_views.index),  # new
    path('admin/', admin.site.urls),
]

6.django模板：一定要看，尤其是网址打开后红色部分 https://code.ziqiangxuetang.com/django/django-template.html
7.django引入静态资源，一定要看  https://code.ziqiangxuetang.com/django/django-static-files.html

8.nginx配置文件：
[root@VM_227_64_centos ~]# more /etc/nginx/conf.d/dev.conf

server {
    listen       80;
    server_name www.developer1.cn;
    #    root /www/wwwroot/php;

    #    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:8000; #动态请求交给gunicorn，8000端口就是gunicorn用的端口
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

    location /log.txt {
        alias /www/wwwroot/mydjango/static/log.txt;
    }


    # location ~ ^/(media|static)/  {  # 注意这个static，如果项目中静态文件的存放目录是  /项目/statics,那么这里也要写成media|statics,然后
        在html文件中引用css和js的时候，路径也要写成/statics/css/...
        #    root   /www/wwwroot/mydjango/react;  #静态文件存放路径
        #   expires 30d;
        # }

    location /static {
        alias /www/wwwroot/mydjango/react;
    }

    # this prevents hidden files (beginning with a period) from being served
    location ~ /\. {
    access_log off; log_not_found off; deny all;
}


}
[root@VM_227_64_centos ~]#

nginx配置文件参考地方：
    第一个：https://code.ziqiangxuetang.com/django/django-nginx-deploy.html  配置nginx部分
     参考了这个：   location /static {
              alias /path/to/project/static;
        }
      第二个： https://blog.csdn.net/c2a2o2/article/details/71325825



9. https://blog.csdn.net/buki26/article/details/80745701
// Invalid HTTP_HOST header: 'xxx.xx.xxx.xxx:8000'. You may need to add 'xxx.xx' to ALLOWED_HOSTS

用python3 manage.py runserver 0.0.0.0:8000命令运行django程序后，通过浏览器访问服务器网址的8000端口，出现访问错误，报错为
Invalid HTTP_HOST header: ‘xxx.xx.xxx.xxx:8000’. You may need to add ‘xxx.xx’ to ALLOWED_HOSTS

解决办法：
修改创建项目时生成的setting.py文件

将ALLOWED_HOSTS = []改为ALLOWED_HOSTS = ['*']

再次运行即可成功访问。


10. django中session的使用

10-1： 要解决下面的  才能正常设置session值

https://blog.csdn.net/m0_38124502/article/details/78841814

no such table:django_session解决
2017年12月19日 13:49:12 我不喜欢这个世界 阅读数：261 标签： django session session表 更多
个人分类： python Django
版权声明：本文为博主原创文章，未经博主允许不得转载。 https://blog.csdn.net/m0_38124502/article/details/78841814

    如果出现这个错误

“no such table:django_session”

这个错误跟Session的机制有关，
既然要从Web服务器端来记录用户信息，
那么一定要有存放用户session id对应信息的地方才行。
所以，我们需要创建django_session表。
别着急！Django已经帮我们准备好这些常用的表了。
我们只需要生成就行了。

执行:

    python manage.py migrate
就可以了




