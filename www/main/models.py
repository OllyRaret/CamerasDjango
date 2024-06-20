from django.db import models


class User(models.Model):
    email = models.EmailField()
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.email
