from flask_wtf import Form
from wtforms import TextField, validators
from wtforms_components import PhoneNumberField

class createPageForm(Form):
    first_name     = TextField('First Name', [validators.Length(min=2, max=25)])
    last_name      = TextField('Last Name', [validators.Length(min=2, max=35)])
    #phone_number   = PhoneNumberField(country_code='US',
     #   							   display_format='national')

