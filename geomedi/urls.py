from django.conf.urls import url, include
#from django.contrib import admin       #std db
from django.contrib.gis import admin    #postgresql db
from djgeojson.views import GeoJSONLayerView
from karte.models import Marker, Polygon

urlpatterns = [
    url(r'^admin/', admin.site.urls),
	url(r'^data/', GeoJSONLayerView.as_view(model=Marker, properties=('name','description','popupContent')), name='data'), #properties zur Darstellung weiterer Attribute
	url(r'^poly/', GeoJSONLayerView.as_view(model=Polygon, properties=('name','description')), name='poly'), #properties zur Darstellung weiterer Attribute
	#url(r'^data/', GeoJSONLayerView.as_view(model=Marker), name='data'),
	#url(r'^data.geojson/', GeoJSONLayerView.as_view(model=Marker), name='data'),
	url(r'^', include('karte.urls')),
]
