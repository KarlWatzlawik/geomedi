from django.conf.urls import url, include
from . import views     #importiert views aus dem aktuellen verzeichnis (.)

urlpatterns = [
    url(r'^', views.index,name='index'),
]


