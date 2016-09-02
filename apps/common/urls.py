# -*- coding: utf-8 -*-
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^captcha.png$', views.get_captcha_image, name = 'get_captcha_image'),
    url(r'^checkcaptcha$', views.check_captcha, name = 'check_captcha'),
]