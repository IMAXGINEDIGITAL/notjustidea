from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

import logging
from .forms import UploadFileForm
from .util import handle_uploaded_file

# Create your views here.

@csrf_exempt
def upload(request):
	if request.method == 'POST':
		logging.debug(request.FILES)
		form = UploadFileForm(request.POST, request.FILES)
		if form.is_valid():
			handle_uploaded_file(request.FILES['file'])
	return HttpResponseRedirect('/static/login.html')
