from pymongo import MongoClient
import datetime, json, urllib2

client = MongoClient()
db = client.mattsucks

def addPageToDB(urlstring, firstName, lastName, phone_number, background_color, font):

	#get gender ... v sorry for the cis normativity, the name API doesn't do other pronouns :(
	#genderData = json.load(urllib2.urlopen("https://gender-api.com/get?name=" + firstName))

	# if int(genderData["accuracy"]) < 80:
	# 	gender = "they"
	# elif genderData["gender"] == "male":
	# 	gender = "he"
	# elif genderData["gender"] == "female":
	# 	gender = "she"
	# else:
	gender = "they"

	entry = {"urlstring" : urlstring, "first_name" : firstName, "last_name" : lastName,
				"phone_number" : phone_number,
				"background_color" : background_color, "font" : font,
				"text_count" : 0,
				"gender" : gender}
	return db.pages.insert(entry)


def incrementTextCount(urlstring):
	return db.pages.update({"urlstring" : urlstring}, { "$inc" : {"text_count" : 1}})

def getPage(urlstring):
	return db.pages.find_one({"urlstring": urlstring})


