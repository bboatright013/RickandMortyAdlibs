"""Forms for Rick and Morty app."""

from wtforms import SelectField, StringField, PasswordField
from flask_wtf import FlaskForm
from wtforms_alchemy import model_form_factory
from wtforms.validators import DataRequired, Email, Length

from models import db, User

BaseModelForm = model_form_factory(FlaskForm)

class ModelForm(BaseModelForm):
    @classmethod
    def get_session(self):
        return db.session

class UserForm(ModelForm):
    """Form for adding playlists."""
    class Meta:
        model = User

class LoginForm(FlaskForm):
    """Login form."""

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[Length(min=6)])

class AdlibForm(FlaskForm):

    word1 = StringField('Noun One', validators=[DataRequired()], )
    word2 = StringField('Noun Two', validators=[DataRequired()])
    word3 = StringField('Noun Three', validators=[DataRequired()])
    word4 = StringField('Noun Four', validators=[DataRequired()])
    word5 = StringField('Adjective One', validators=[DataRequired()])
    word6 = StringField('Adjective Two', validators=[DataRequired()])
    word7 = StringField('Adjective Three', validators=[DataRequired()])
    word8 = StringField('Adverb One', validators=[DataRequired()])
    word9 = StringField('Adverb Two', validators=[DataRequired()])
    word10 = StringField('Adverb Three', validators=[DataRequired()])
