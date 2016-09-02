# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class BankAccount(models.Model):
	name = models.CharField(max_length=256) #账户名称
	account = models.CharField(max_length=32) #账号
	bank = models.IntegerField() #开户行
	code = models.CharField(max_length=256) #不同国家和地区，其code含义不同


class User(models.Model):
	nick = models.CharField(max_length=256)
	avatar = models.CharField(max_length=1024) #TODO待后续处理
	region = models.IntegerField()
	province = models.IntegerField()
	profile = models.CharField(max_length=1024) #TODO最大长度待后续处理
	site = models.CharField(max_length=256)
	bank_account = models.OneToOneField(BankAccount)
	type = models.IntegerField() #用户类型，0：individual，1：group，2：company

	def __unicode__(self):
   		return self.nick

class Individual(models.Model):
	user = models.OneToOneField(User)
	name = models.CharField(max_length=256)
	company = models.CharField(max_length=256)

	def __unicode__(self):
   		return ("Individual:" + self.name)


class Group(models.Model):
	user = models.OneToOneField(User)
	name = models.CharField(max_length=256)

	def __unicode__(self):
   		return ("Group:" + self.name)


class Company(models.Model):
	user = models.OneToOneField(User)
	name = models.CharField(max_length=256)
	photo = models.CharField(max_length=1024) #TODO营业执照文件地址
	code = models.CharField(max_length=256) #组织机构代码
	tax_registration = models.CharField(max_length=1024) #TODO税务登记证文件地址

	def __unicode__(self):
   		return ("Company:" + self.name)


class Skill(models.Model):
	user = models.ForeignKey(User)
	name = models.CharField(max_length=32) #技能名称
	like_cnt = models.IntegerField() #该技能被点赞次数


class LikeRecord(models.Model):
	skill = models.ForeignKey(Skill)
	user = models.ForeignKey(User) #点赞的用户
	like_date = models.DateTimeField(auto_now=False) #点赞的时间戳
