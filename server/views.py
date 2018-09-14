from django.shortcuts import render

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt,csrf_protect
 
def index(request):
    return render(request,'server/index.html')


#http://localhost:8001/add?name=abc&pwd=11
@csrf_exempt
def login(request):
	name = request.POST.get('name')
	pwd =request.POST.get('pwd')
	rs = 'error'
    
	if name=='root' and pwd=='root':
		request.session['userId'] = name
		rs = 'ok'

	# return HttpResponse("rs:"+rs+"  name:"+name+"  pwd:"+pwd)
	return HttpResponse(rs)


def check_login(request):
    userId = request.session.get('userId',default='')
    if(userId=='root'):
        return HttpResponse("login_ok")
    else:
        return HttpResponse("login_error")


def foo(request):
    request.session['userId']=''
    return HttpResponse("foo")