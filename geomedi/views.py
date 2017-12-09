from django.shortcuts import render

def start(request):
    return render(request, 'start.html')

def home(request):
    return render(request, 'home.html')

