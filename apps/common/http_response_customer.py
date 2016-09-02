# -*- coding: utf-8 -*-
from django.http import HttpResponse
import json

class HttpResponseCustomer(HttpResponse):

	def __init__(self, *args, **kwargs):
		response_data = {}
		response_data["v"] = "1.0"
		response_data["code"] = kwargs["errCode"]
		response_data["reason"] = kwargs["reason"]
		response_data["data"] = kwargs["data"]
		super(HttpResponseCustomer, self).__init__(json.dumps(response_data), content_type = "application/json")