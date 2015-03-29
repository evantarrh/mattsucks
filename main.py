from twilio.rest import TwilioRestClient
from flask import Flask, render_template, request, jsonify, url_for, redirect, make_response
from flask_limiter import Limiter
from backend import database as db
from backend import config
from backend import form as createForm
import re, random


app = Flask(__name__)
app.config["DEBUG"] = True
limiter = Limiter(app)

account_sid = config.acct_sid
auth_token  = config.token
client = TwilioRestClient(account_sid, auth_token)
app.secret_key = config.secret_key

def getColor():
	# ye olde arbitrarily selected list o' colors
	colors = ["#fcbb85", "#fc8b7c", "#87cefa", "#5bbc74", "#8bbc55", "#5f96e8", "#6bd2ff", "#52d1ac", "#e88d5d", "#b59ede", "#a2dec5", "#a4cbca", "#fca96a", "#f2dd54"]
	return random.choice(colors)

@app.route('/')
def hello():
	return redirect("/create")

@app.route('/<urlstring>', methods=["GET"])
def renderPage(urlstring):
	info = db.getPage(urlstring)
	if info is None:
		return render_template('404.html')

	show_alert = False
	if request.cookies.get('alert') == "yes":
		show_alert = True

	resp = make_response(render_template("index.html", first_name = info["first_name"],
					last_name = info["last_name"],
					phone_number = info["phone_number"],
					background_color = info["background_color"],
					urlstring = info["urlstring"],
					font = info["font"],
					text_count = info["text_count"],
					gender = info["gender"],
					first_time = show_alert))
	resp.set_cookie('alert', 'no')
	return resp


@app.route('/sendtext/<urlstring>', methods=["POST"])
@limiter.limit("20/hour;7/minute")
def sendText(urlstring):
	db.incrementTextCount(urlstring)

	#implement IP checking
	info = db.getPage(urlstring)
	if info["text_count"] >= 5:
		intro_message = client.messages.create(body="You're getting these texts because someone thought you needed to be taken down a notch: downanotch.co. Reply STOP and we'll shut up.",
		to = info["phone_number"],
		from_ = config.twilio_num)

	message = client.messages.create(body="Hey " + info["first_name"] + "! You suck.",
	to = info["phone_number"],
	from_ = config.twilio_num)
	return "Success! Message " + message.sid + " was sent to " + info["first_name"] + "."


@app.route('/create', methods=["GET", "POST"])
def createpage():
	form = createForm.createPageForm()

	#successfully created new page
	if request.method == "POST" and form.validate_on_submit():
		print "form successful"
		form_data = request.form
		name = (form_data["first_name"] + form_data["last_name"]).replace(" ", "").lower()

		number = re.sub("[^0-9]", "", form_data["phone_number"])
		if number[0] == "1":
			number = number[1:]

		base = name
		counter = 1
		while db.getPage(base) is not None:
			counter += 1
			base = name + str(counter)

		if counter is not 1:
			name += str(counter)

		db.addPageToDB(name,
					form_data["first_name"],
					form_data["last_name"],
					number,
					getColor(),
					"comic sans ms")

		resp = make_response(redirect(url_for('renderPage', urlstring=name)))
		resp.set_cookie('alert', 'yes')
		return resp

	#non valid form entry
	elif request.method == "POST":
		print "invalid form"
		return render_template('create.html', form=form, error=True)

	else:
		print "no form data"
		return render_template('create.html', form=form, error=False)



if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5001)
