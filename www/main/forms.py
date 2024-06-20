from django import forms
from .models import User

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'password', 'email']

class LoginForm(forms.Form):
    email = forms.CharField(label="Почта", max_length=100)
    password = forms.CharField(label="Пароль", widget=forms.PasswordInput)
