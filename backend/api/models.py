from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    current_exp = models.IntegerField(default=0)
    current_level = models.IntegerField(default=1)
