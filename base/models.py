from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Availablility(models.Model):
    slots = models.CharField(max_length=50,null=False,blank=False)
    status = models.CharField(max_length=50,null=False,blank=False)

class Booking(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    patientName = models.CharField(max_length=100,null=False,blank=False)
    timeSlot = models.ForeignKey(Availablility, on_delete=models.CASCADE,null=False,blank=False)
