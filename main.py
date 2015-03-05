from twilio.rest import TwilioRestClient
from flask import Flask, render_template, request, jsonify, url_for, redirect
from backend import database as db
from backend import config
from backend import form as createForm


app = Flask(__name__)
app.config["DEBUG"] = True

account_sid = config.acct_sid
auth_token  = config.token
client = TwilioRestClient(account_sid, auth_token)
app.secret_key = config.secret_key


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
def newpage():
	form = createForm.createPageForm()
	return render_template('create.html', form=form, error=False)


@app.route('/create-page', methods=["GET", "POST"])
def createpage():
	form = createForm.createPageForm()

	if form.validate_on_submit():

		form_data = request.form
		name = (form_data["first_name"] + form_data["last_name"]).replace(" ", "").lower()

		#TODO: generate random color
		base = name
		counter = 1
		while db.getPage(base) is not None:
			name = name + str(counter)
			counter += 1

		db.addPageToDB(name,
					form_data["first_name"],
					form_data["last_name"],
					"4843939393",
					"#87cefa",
					"comic sans ms")

		return redirect('/' + name)
	#non valid form entry
	else:
		return render_template('create.html', form=form, error=True)


	return render_template('create.html', form=form, error=True)



if __name__ == '__main__':
	app.run(host="0.0.0.0")
