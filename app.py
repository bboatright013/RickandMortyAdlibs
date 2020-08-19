import os
import requests

from flask import Flask, render_template, request, flash, redirect, session, g, jsonify, json
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.exc import IntegrityError

from forms import UserForm, LoginForm, AdlibForm, UserEditForm
from models import db, connect_db, User, Adlib, Votes 


CURR_USER_KEY = "curr_user"
base_api_url = 'https://rickandmortyapi.com/api/'

app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ.get('postgres://postgres://xuugpcndclicri:b60b7a9d1678e42227ce7cfd94512ec643b6250f686a63d49320d2402ada3150@ec2-52-23-86-208.compute-1.amazonaws.com:5432/ddn8kpc58th9b6',
     'postgres:///capstone1'))

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "it's a secret")
toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

##############################################################################
# Home Page

@app.route('/')
def home_page():
    return render_template('home.html')


##############################################################################
# User signup/login/logout


@app.before_request
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""
    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])
    else:
        g.user = None

def user_login(user):
    """Log in user."""
    session[CURR_USER_KEY] = user.id

def user_logout():
    """Logout user."""
    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]

@app.route('/signup', methods=["GET", "POST"])
def signup():
    """Handle user signup.
    Create new user and add to DB. Redirect to home page.
    If form not valid, present form.
    If there is already a user with that username: flash message
    and re-present form.
    """

    form = UserForm()
    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data,
                password=form.password.data,
                email=form.email.data,
            )
            db.session.commit()
        except IntegrityError:
            flash("Username already taken", 'danger')
            return render_template('signup.html', form=form)

        user_login(user)
        return redirect("/")

    else:
        return render_template('signup.html', form=form)


@app.route('/profile/edit', methods=["GET", "POST"])
def profile_edit():
    """Update profile for current user."""
    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")
    user = User.query.get_or_404(g.user.id)
    form = UserEditForm()
    if form.validate_on_submit():
        try:
            if User.query.filter_by(username=form.username.data).first() == None or user.username == form.username.data:
                checkUser = user.username
                authuser = User.authenticate(checkUser,form.password.data)
                if authuser:
                    user.username = form.username.data
                    user.email = form.email.data
                    flash("Profile Updated", 'success')
                    db.session.commit()
                    return redirect('/profile')
                else:
                    flash("Invalid password", 'danger')
                    return render_template('edit_user.html', form=form)
            else:
                flash("Username already taken", 'danger')
                return render_template('edit_user.html', form=form)

        except IntegrityError:
            flash("Username already taken", 'danger')
            return render_template('edit_user.html', form=form)
    else:
        form.username.data = user.username
        form.email.data = user.email
        return render_template('edit_user.html', form=form)

@app.route('/login', methods=["GET", "POST"])
def login():
    """Handle user login."""

    form = LoginForm()
    if form.validate_on_submit():
        user = User.authenticate(form.username.data, form.password.data)
        if user:
            user_login(user)
            flash(f"Hello, {user.username}!")
            return redirect("/")
        flash("Invalid credentials.")
    return render_template('login.html', form=form)


@app.route('/logout')
def logout():
    """Handle logout of user."""

    session.pop(CURR_USER_KEY)
    return redirect('/')

##############################################################################
# Characters Page

@app.route('/database/characters')
def characters():
    """ get the first page of characters"""
    return render_template('characters.html')



##############################################################################
# Locations Page

@app.route('/database/locations')
def locations():
    """ get the first page of Locations"""
    return render_template('location.html')


##############################################################################
# episodes Page

@app.route('/database/episodes')
def episodes():
    """ get the first page of Locations"""
    return render_template('episodes.html')


##############################################################################
# adlib Pages

@app.route('/adlib_templates')
def adlibs():
    """ get the adlib choices page """
    return render_template('adlibs.html')

@app.route('/adlib_templates/one', methods=["POST","GET"])
def ricktatorship():
    """ get the adlib form and post it """
    form = AdlibForm()
    if form.validate_on_submit():
        words = form.data
        return render_template ('ricktatorship_results.html',words=words)
    return render_template('ricktatorship.html', form=form)


@app.route('/adlib_templates/two', methods=["POST","GET"])
def meseecks():
    """ get the adlib form and post it """
    form = AdlibForm()
    if form.validate_on_submit():
        words = form.data
        return render_template('meseecks_results', words=words)
    return render_template('meseecks.html', form=form)

@app.route('/adlib_templates/three', methods=["POST","GET"])
def anatomy():
    """ get the adlib form and post it """
    form = AdlibForm()
    if form.validate_on_submit():
        words = form.data
        return render_template('anatomy_results', words=words)
    return render_template('anatomy.html', form=form)

##############################################################################
#add an adlib from a user 

@app.route('/add_lib', methods=['POST'])
def adlib_data_store():
    """create an adlib object"""
    try:
        print(request.json['result_text'])
        print(g.user.id)
        new_adlib = Adlib(text=request.json['result_text'], user_id=g.user.id)
        db.session.add(new_adlib)
        db.session.commit()
        print(new_adlib)
        return ("Success!", 201 )
    except:
        return("Error", 500)


@app.route(f'/delete_lib/<int:adlib_id>', methods=['POST'])
def adlib_data_delete(adlib_id):
    """delete an adlib"""
    sunset_adlib = Adlib.query.get_or_404(adlib_id)
    print(sunset_adlib)
    db.session.delete(sunset_adlib)
    db.session.commit()
    return redirect('/profile')
#############################################################################
# go to user profile page and fetch their saved adlibs

@app.route('/profile')
def profile_page():
    adlibs = Adlib.query.filter_by(user_id = g.user.id).order_by(Adlib.id.desc()).all()
    return render_template('profile.html', adlibs=adlibs, user=g.user)