from django.shortcuts import render
from django.core.cache import cache
from django.core.cache import caches
import requests
import json

BASE_PATH = 'http://dnd5eapi.co'
CLASSES_PATH = '/api/classes/'

# Create your views here.

def classes(request):
    print(caches.all())
    print("Cache is")
    print(cache.has_key('%sall_classes' % (cache.key_prefix)))
    if cache.get('all_classes') == None:
        print("NOT using cache")
        classes = requests.get(BASE_PATH + CLASSES_PATH).json()
        all_classes = []
        for d3_class in classes['results']:
            print(d3_class['url'])
            class_details = requests.get(BASE_PATH + d3_class['url'])
            all_classes.append(class_details.json())
        cache.set('all_classes', all_classes, 86400)
        print(cache.key_prefix)
    
    else:
        print("using cache")
        all_classes = cache.get('all_classes')

    return render(request, 'classes.html',{ 'classes' : all_classes })

def mem(request):
    cache.set('foo', 'bar', 600)
    mem = cache.get('foo')
    print(mem)
    return render(request, 'mem.html', mem)