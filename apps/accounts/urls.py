from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login.json$', views.login, name = 'login'),
    url(r'^signup$', views.signup, name = 'signup'),
    url(r'^signin$', views.signin, name = 'signin'),
    url(r'^exit$', views.exit, name = 'exit'),
    url(r'^checktoken$', views.checktoken, name = 'checktoken'),
    url(r'^activate$', views.activate, name = 'activate'),
    url(r'^exists$', views.exists, name = 'exists'),
    url(r'^retrieve$', views.retrieve, name = 'retrieve'),
    url(r'^resetpsw$', views.resetpsw, name = 'resetpsw'),
    url(r'^delete$', views.delete, name = 'delete'),
]
