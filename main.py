from twilio.rest import TwilioRestClient
from flask import Flask, render_template, request, jsonify, url_for, redirect
from backend import database as db
from backend import config
from backend import form as createForm
import re, random


app = Flask(__name__)
app.config["DEBUG"] = True

account_sid = config.acct_sid
auth_token  = config.token
client = TwilioRestClient(account_sid, auth_token)
app.secret_key = config.secret_key

def getColor():
	# ye olde arbitrarily selected list o' colors
	colors = ["#fcbb85", "#fc8b7c", "#87cefa", "#5bbc74", "#8bbc55", "#c9ad7a", "#5f96e8", "#6bd2ff", "#52d1ac", "#e88d5d", "#b59ede", "#a2dec5", "#a4cbca", "#fca96a"]
	return random.choice(colors)

@app.route('/')
def hello():
	return render_template("index.html")

@app.route('/mattsucks', methods=["POST"])
def mattsucks():
	message = client.messages.create(body="Hey Matt! You suck.",
	to = config.matts_num,
	from_ = config.twilio_num)
	print message.sid
	return "You told Matt he sucks!"

@app.route('/mattrocks', methods=["POST"])
def mattrocks():
	message = client.messages.create(body="Aw geez! Sorry Matt. I hope all of your dreams come true.",
	to = config.matts_num,
	from_ = config.twilio_num)
	print message.sid
	return "Aw, that's nice."

@app.route('/<urlstring>', methods=["GET"])
def renderPage(urlstring):
	info = db.getPage(urlstring)
	return render_template("index.html", first_name = info["first_name"],
					last_name = info["last_name"],
					phone_number = info["phone_number"],
					background_color = info["background_color"],
					urlstring = info["urlstring"],
					font = info["font"],
					text_count = info["text_count"],
					gender = info["gender"])


@app.route('/sendtext/<urlstring>', methods=["POST"])
def sendText(urlstring):
	#implement IP checking
	info = db.getPage(urlstring)
	message = client.messages.create(body="Hey " + info["first_name"] + "! You suck.",
	to = info["phone_number"],
	from_ = config.twilio_num)
	print message.sid
	return "You told matt that he sucks"



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

		#TODO: generate random color

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

		return redirect('/' + name)

	#non valid form entry
	elif request.method == "POST":
		print "invalid form"
		return render_template('create.html', form=form, error=True)

	else:
		print "no form data"
		return render_template('create.html', form=form, error=False)



if __name__ == '__main__':
	app.run(host="0.0.0.0")
