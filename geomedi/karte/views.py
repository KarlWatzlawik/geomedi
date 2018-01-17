from django.shortcuts import render

def index(request):
    return render(request, 'map/map.html')
    #return render(request, 'map/index.html')


