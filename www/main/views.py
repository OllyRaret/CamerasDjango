from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from .models import User
from .forms import UserForm, LoginForm


def index(request):
    user_id = request.session.get('user_id')
    user = User.objects.get(id=user_id) if user_id else None
    context = {
        "user": user,
        "login_errors": request.session.pop('login_errors', None),
        "register_errors": request.session.pop('register_errors', None)
    }
    return render(request, 'main/index.html', context)


def create_user(request):
    if request.method == "POST":
        userform = UserForm(request.POST)
        if userform.is_valid():
            user = User(
                first_name=userform.cleaned_data["first_name"],
                last_name=userform.cleaned_data["last_name"],
                password=userform.cleaned_data["password"],
                email=userform.cleaned_data["email"]
            )
            user.save()
            request.session['user_id'] = user.id
            return redirect(f"/{user.id}")
        else:
            request.session['register_errors'] = userform.errors
    return redirect("/")

def login_user(request):
    if request.method == "POST":
        loginform = LoginForm(request.POST)
        if loginform.is_valid():
            email = loginform.cleaned_data["email"]
            password = loginform.cleaned_data["password"]
            try:
                user = User.objects.get(email=email, password=password)
                request.session['user_id'] = user.id
                return redirect(f"/{user.id}")
            except ObjectDoesNotExist:
                request.session['login_errors'] = "Invalid email or password."
        else:
            request.session['login_errors'] = loginform.errors
    return redirect("/")


def logout_user(request):
    if 'user_id' in request.session:
        del request.session['user_id']
    return redirect("/")

def reg(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        user = None
    return render(request, "main/index.html", {"user": user})