from pymongo import MongoClient
import datetime
import imgur as im

client = MongoClient()
db = client.mattsucks

def addPageToDB(urlstring, name, phone_number, background_color):

	entry = {"urlstring" : urlstring, "name" : name, "phone_number" : phone_number,
				"background_color" : background_color, "font" : font
				"text_count" : 0}
	return db.pages.insert(entry)


def incrementPageCount(urlstring):
	return db.pages.update({"urlstring" : urlstring}, { "$inc" : {"text_count" : 1}})

def getPage(urlstring):
	return db.pages.find_one({"urlstring": urlstring})
