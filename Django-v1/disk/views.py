from django.shortcuts import render, render_to_response
from django import forms
from django.http import HttpResponse

from .models import User

# Create your views here.
app_name = 'disk'
class UserForm(forms.Form):
    username = forms.CharField()
    headImg = forms.FileField()


def register(request):
    if request.method == 'POST':
        uf = UserForm(request.POST, request.FILES)
        if uf.is_valid():
            username = uf.cleaned_data['username']
            headImg = uf.cleaned_data['headImg']

            user = User(username=username, headImg=headImg)
            user.save()

            return HttpResponse('upload successfully to %s!' % user.headImg)
    else:
        uf = UserForm()

    return render_to_response('%s/register.html' % app_name, {'uf': uf})
