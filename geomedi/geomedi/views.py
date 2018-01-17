from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def fotos (request):
    return render(request, 'fotos.html')

def impressum (request):
    return render(request, 'impressum.html')