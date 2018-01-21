from __future__ import unicode_literals
from django.contrib.gis.db import models     #postgresql db
from djgeojson.fields import PointField

class Marker(models.Model):
    name = models.CharField(max_length=50)
    picture = models.CharField(max_length=100)
    geom = models.PointField(srid=4326, blank=True)
    objects = models.GeoManager()
    description = models.TextField(default='')
    reference = models.TextField(default='')
    author = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name

    class Meta:
       verbose_name_plural = "Marker"

class Polygon(models.Model):
    name = models.CharField(max_length=50)
    geom = models.MultiPolygonField()
    objects = models.GeoManager()
    description = models.TextField(default='')
    
    def __unicode__(self):
        return self.name

    class Meta:
       verbose_name_plural = "Polygone"
