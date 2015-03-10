from flask_wtf import Form
from wtforms import TextField, validators, IntegerField, ValidationError
from wtforms_components import PhoneNumberField
import re

class createPageForm(Form):
	first_name     = TextField('First Name', [validators.Length(min=2, max=25)])
	last_name      = TextField('Last Name', [validators.Length(min=2, max=35)])
	phone_number   = TextField('Phone Number', [validators.Required()])
	def validate_phone_number(form, field):
		number = re.sub("[^0-9]", "", field.data)
		if number[0] == "1":
			number = number[1:]

		print number

		if len(number) != 10:
			raise ValidationError('Phone number is not a valid US number')



