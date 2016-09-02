def handle_uploaded_file(f):
    with open('/home/jiangdunchuan/project/python/notjustidea/data/file1', 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
