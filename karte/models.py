from __future__ import unicode_literals
#from django.db import models                #std db
from django.contrib.gis.db import models     #postgresql db
from djgeojson.fields import PointField

class Marker(models.Model):
    name = models.CharField(max_length=50)
    picture = models.ImageField(default='')
    geom = models.PointField(srid=4326, blank=True)
    objects = models.GeoManager()
    description = models.TextField(default='')
    author = models.TextField(default='')

    #geom = models.MultiPolygonField(srid=21037)
    
    #def __str__(self):
    @property
    def popupContent(self):
        return "{}".format(self.picture.url)
        #return '<img width="80" src="https://i.ytimg.com/vi/JfFP273mYQg/hqdefault.jpg" /><br/><b><{}</b>'.format(
        #return '<img width="80" src="{}" /><br/><b><{}</b>'.format(
            #self.picture.url,
            #self.description)

    def __unicode__(self):
        return self.name

    class Meta:
       verbose_name_plural = "Marker"

class Polygon(models.Model):
    name = models.CharField(max_length=50)
    geom = models.MultiPolygonField()
    objects = models.GeoManager()
    description = models.TextField(default='')

    #geom = models.MultiPolygonField(srid=21037)
    
    def __unicode__(self):
        return self.name

    class Meta:
       verbose_name_plural = "Polygone"
