from django.shortcuts import render

def start(request):
    return render(request, 'start.html')

def home(request):
    return render(request, 'home.html')

def impressum (request):
    return render(request, 'impressum.html')