from twilio.rest import TwilioRestClient
import config
from flask import Flask, render_template, request, jsonify, url_for
app = Flask(__name__)
app.config["DEBUG"] = True

account_sid = config.acct_sid
auth_token  = config.token
client = TwilioRestClient(account_sid, auth_token)


 
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

if __name__ == '__main__':
	app.run(host="0.0.0.0")
