# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import django.utils.timezone as timezone

from common.http_response_customer import HttpResponseCustomer
from common.errcode import *

from captcha.models import CaptchaStore
from captcha.helpers import captcha_image_url
from captcha.views import captcha_image

def check_captcha_inna(hashkey, response):
	try:
		captcha = CaptchaStore.objects.get(hashkey = hashkey, response = response)
	except :
		return (CAPTCHA_ILLEGAL_CODE, CAPTCHA_ILLEGAL)
	else:
		if timezone.now() > captcha.expiration:
			return (CAPTCHA_EXPIRE_CODE, CAPTCHA_EXPIRE)
	return (0, "")


@csrf_exempt
def get_captcha_image(request):
	key = CaptchaStore.generate_key()
	url = captcha_image_url(key)

	response = captcha_image(request, key)
	response['id'] = key
	return response

@csrf_exempt
def check_captcha(request):
	if request.method == "GET":
		captchaId = request.GET.get("captchaId", "")
		captchaResponse = request.GET.get("captcha", "")

		if captchaId == "" or captchaResponse == "":
			return HttpResponseCustomer(errCode = FORMAT_ILLEGAL_CODE, reason = [FORMAT_ILLEGAL], data = {"captchaId":captchaId, "captcha":captchaResponse})

		errCode, reason = check_captcha_inna(captchaId, captchaResponse)	
	else:
		return HttpResponseCustomer(errCode = FORMAT_ILLEGAL_CODE, reason = [FORMAT_ILLEGAL], data = {})

	return HttpResponseCustomer(errCode = errCode, reason = [reason], data = {})
