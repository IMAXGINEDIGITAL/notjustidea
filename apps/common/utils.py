# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import random, string, uuid

def get_random_string(len):
	return ''.join(random.sample(string.ascii_letters + string.digits, len))

def get_uuid():
	u = uuid.uuid1()
	return u.hex