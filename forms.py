"""Forms for Rick and Morty app."""

from wtforms import SelectField, StringField, PasswordField
from flask_wtf import FlaskForm
from wtforms_alchemy import model_form_factory
from wtforms.validators import DataRequired, Email, Length, email_validator

from models import db, User

BaseModelForm = model_form_factory(FlaskForm)

class ModelForm(BaseModelForm):
    @classmethod
    def get_session(self):
        return db.session

class UserForm(ModelForm):
    """Form for adding users."""
    class Meta:
        model = User

class LoginForm(FlaskForm):
    """Login form."""

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[Length(min=6)])

class AdlibForm(FlaskForm):

    word1 = StringField('Object', validators=[DataRequired()], )
    word2 = StringField('Weapon', validators=[DataRequired()])
    word3 = StringField('Place', validators=[DataRequired()])
    word4 = StringField('Adjective', validators=[DataRequired()])
    word5 = StringField('Adverb', validators=[DataRequired()])
    word6 = StringField('Verb', validators=[DataRequired()])

class UserEditForm(FlaskForm):
    """edit user form """
    email = StringField('E-mail', validators=[Email()])
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password Verification Required:', validators=[DataRequired()])
