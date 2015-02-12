from pymongo import MongoClient
import datetime

client = MongoClient()
db = client.mattsucks

def addPageToDB(urlstring, firstName, lastName, phone_number, background_color, font):

	entry = {"urlstring" : urlstring, "first_name" : firstName, "last_name" : lastName,
				"phone_number" : phone_number,
				"background_color" : background_color, "font" : font,
				"text_count" : 0}
	return db.pages.insert(entry)


def incrementPageCount(urlstring):
	return db.pages.update({"urlstring" : urlstring}, { "$inc" : {"text_count" : 1}})

def getPage(urlstring):
	return db.pages.find_one({"urlstring": urlstring})



#addPageToDB("mikehawk", "Mike", "Hawk", "7813256012", "#BDE", "calibri")