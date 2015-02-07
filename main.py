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

@app.route('/servo_post', methods=["POST"])
def servo_pos():
	message = client.messages.create(body="Matt sucks!",
	to = config.evans_num,
	from_ = "+16179350930")
	print message.sid
	return "You told Matt he sucks!"

if __name__ == '__main__':
	app.run(host="0.0.0.0")
