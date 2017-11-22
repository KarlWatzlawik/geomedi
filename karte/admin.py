#from django.contrib import admin           #std db
from django.contrib.gis import admin        #postgresql sb
from .models import Marker , Polygon
from leaflet.admin import LeafletGeoAdmin   #für Leaflet-Karte

#class MarkerAdmin(admin.OSMGeoAdmin):      #für PoitField() mit OSM-Karte
class MarkerAdmin(LeafletGeoAdmin):         #für Leaflet-Karte
    #pass
    list_display = ('name', 'geom')
#admin.site.register(WorldBorder, admin.GeoModelAdmin)
admin.site.register(Marker, MarkerAdmin)    #Standard
#admin.site.register(Marker, admin.OSMGeoAdmin)
#admin.site.register(Marker, LeafletGeoAdmin)

#class MarkerAdmin(admin.OSMGeoAdmin):      #für PoitField() mit OSM-Karte
class PolygonAdmin(LeafletGeoAdmin):         #für Leaflet-Karte
    #pass
    list_display = ('name', 'geom')

admin.site.register(Polygon, PolygonAdmin)    #Standard
