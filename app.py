from flask import Flask, render_template, request, jsonify
from db_connector import connect_to_database, execute_query
import os

# Configuration

app = Flask(__name__)

# Routes.

@app.route('/', methods=['GET', 'POST'])
def root():
	db_connection = connect_to_database()
	if request.method == 'GET':
		# get all Video Game Titles
		table_query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
		table_query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
		table_query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID;"
		table = execute_query(db_connection, table_query).fetchall()

		# get list of platforms
		plat_query =  "SELECT platformID, platformName FROM `Platforms`"
		plat = execute_query(db_connection, plat_query).fetchall()

		# get list of franchises
		franchise_query =  "SELECT franchiseID, franchiseName FROM `Franchises`"
		franchise = execute_query(db_connection, franchise_query).fetchall()

		# get list of developers
		dev_query =  "SELECT developerID, developerName FROM `DevelopmentStudios`"
		dev = execute_query(db_connection, dev_query).fetchall()

		return render_template("main.j2", titles=table, platforms=plat, franchises=franchise, devs=dev)
	else:
		# get request payload from POST request
		query_vals = request.get_json()
		print("RECEIVED REQUEST VALUES:", query_vals)

		# build query from request payload values
		query = build_query_searchTitle(query_vals)

		print("BUILT QUERY:", query)

		# query DB, get response
		# QUERY DOESNT WORK WITH % AROUND THE SEARCH TITLE NAME INPUT OR DATE_FORMAT
		# TypeError: not enough arguments for format string

		result = execute_query(db_connection, query).fetchall()

		# make query to TitlesPlatforms, get response
		# package with result above

		# return DB tables back to webpage
		return jsonify(result)

@app.route('/add', methods=['GET', 'POST'])
def add():
	db_connection = connect_to_database()
	if request.method == 'GET':
		return render_template("add_element.j2")
	else:
		# get request payload from POST request
		query_vals = request.get_json()
		# access query_vals values like a dictionary
		print("query_vals['action']: ", query_vals["action"])
		
		# build query from request, depending on action
		# include if statements to check for empty attributes ("") for those that can be null. If empty, don't add WHERE to query

		query = ""

		if query_vals["action"] == "addTitle":
			# query_vals = {
			#	"titleName"
			#	"titlePlat"
			#	"titleRelease"
			#	"titleGenre"
			#	"titleFranchise"
			#	"titleDev"
			#	"titleESRB"
			# }

			query = "INSERT INTO `VideoGameTitles` (titleName, titleESRB, titleGenre, titleRelease, titleDeveloperID, titleFranchiseID) VALUES ("
			query += "'" + query_vals["titleName"] + "'" + ", "
			query += "'" + query_vals["titleESRB"] + "'" + ", "
			query += "'" + query_vals["titleGenre"] + "'" + ", "
			query += "'" + query_vals["titleRelease"] + "'" + ", "
			query += "(SELECT developerID FROM `DevelopmentStudios` WHERE developerName = " +"'"+ query_vals["titleDev"] +"'" + "), "
			query += "(SELECT franchiseID FROM `Franchises` WHERE franchiseName = " + "'" + query_vals["titleFranchise"] + "'" + "));"
			result = execute_query(db_connection, query).fetchall()
			print(result)

			# if query is successful: build query to INSERT into TitlesPlatforms. Still need to figure out the if condition

			# Need to make updates to platform names coming from front end, they are not all matching platforms in the DB
			# (Ex: 'PS5' platform throws a NULL error, because the name in the DB is 'PlayStation 5')

			query = "INSERT INTO `TitlesPlatforms` (titleID, platformID) VALUES ("
			for platform in query_vals["titlePlat"]:
				query += "(SELECT t.titleID FROM VideoGameTitles AS t WHERE t.titleName = " + "'" + query_vals["titleName"] + "'" + "), "
				query += "(SELECT p.platformID FROM Platforms AS p WHERE p.platformName = " + "'" + platform + "'" + ")"
				query += ");"
			result = execute_query(db_connection, query).fetchall()
			print(result)

			#else:
				# send unsuccessful back to webpage, return failed message
				# Will create an error code to send back that will make an error message pop up
					#return {}

		elif query_vals["action"] == "addDev":
			# query_vals = {
			#	"devName"
			#	"devCountry"
			#	"devDate"
			# }

			query = "INSERT INTO `DevelopmentStudios` (developerName, developerCountry, developerFounded) VALUES ("
			query += "'" + query_vals["devName"] + "'" + "," + "'" + query_vals["devCountry"] + "'" + "," + "'" + query_vals ["devDate"] + "'" + ");"
			result = execute_query(db_connection, query).fetchall()
			print(result)

		elif query_vals["action"] == "addPlat":
			# query_vals = {
			#	"platName"
			#	"platDate"
			#	"platDev"
			#	"platInProd"
			# }

			query = "INSERT INTO `Platforms` (platformName, platformRelease, platformDeveloper, platformInProduction) VALUES ("
			query += "'" + query_vals["platName"] + "'" + "," + "'" + query_vals["platDate"] + "'" + "," + "'" + query_vals["platDev"] + "'" + "," + str(query_vals["platInProd"]) + ");"
			result = execute_query(db_connection, query).fetchall()
			print(result)
		# elif query_vals["action"] == "addFranchise":
			# query_vals = {
			#	"franchiseName"
			#	"franchiseDev"
			# }

			# query = "INSERT INTO `Franchises` (franchiseName, franchiseDeveloper) VALUES ("
			# query += query_vals["franchiseName"] + query_vals["franchiseDev"] + ");"

		# result = execute_query(db_connection, query).fetchall()

		# return result(?)
		return {}

@app.route('/delete', methods=['GET', 'POST'])
def delete():
	db_connection = connect_to_database()
	if request.method == 'GET':
		# get list of platforms
		plat_query =  "SELECT platformID, platformName FROM `Platforms`"
		plat = execute_query(db_connection, plat_query).fetchall()

		# get list of franchises
		franchise_query =  "SELECT franchiseID, franchiseName FROM `Franchises`"
		franchise = execute_query(db_connection, franchise_query).fetchall()

		# get list of developers
		dev_query =  "SELECT developerID, developerName FROM `DevelopmentStudios`"
		dev = execute_query(db_connection, dev_query).fetchall()

		# get list of the platform's developers
		platDev_query = "SELECT platformDeveloper FROM `Platforms`"
		platDev = execute_query(db_connection, platDev_query).fetchall()

		# get list of the franchise's developers
		franchiseDev_query = "SELECT franchiseDeveloper FROM `Franchises`"
		franchiseDev = execute_query(db_connection, franchiseDev_query).fetchall()

		return render_template("del_element.j2", platforms=plat, franchises=franchise, devs=dev, platDev=platDev, franchiseDev=franchiseDev)
	else:
		# get request payload from POST request
		query_vals = request.get_json()

		# build query from request payload, depending on action
		# include if statements to check for empty attributes (""). If empty, don't add WHERE to query

		# if query_vals["action"] == "delete":
			# build delete query

		# else:
			# if query_vals["action"] == "searchTitle":
				# query = build_query_searchTitle(query_vals)

				# make an array of the paltforms to include in the response
				# select from TitlesPlatforms query_vals["titlePlat"]

			# elif query_vals["action"] == "searchDev":
				# query = build_query_searchDev(query_vals)

			# elif query_vals["action"] == "searchPlat":
				# query = build_query_searchPlat(query_vals)

			# elif query_vals["action"] == "searchFranchise":
				# query = build_query_searchFranchise(query_vals)

		# result = execute_query(db_connection, query).fetchall()

		# return result(?)
		return {}

@app.route('/update', methods=['GET', 'POST'])
def update():
	db_connection = connect_to_database()
	if request.method == 'GET':
		# get list of platforms
		plat_query =  "SELECT platformID, platformName FROM `Platforms`"
		plat = execute_query(db_connection, plat_query).fetchall()

		# get list of franchises
		franchise_query =  "SELECT franchiseID, franchiseName FROM `Franchises`"
		franchise = execute_query(db_connection, franchise_query).fetchall()

		# get list of developers
		dev_query =  "SELECT developerID, developerName FROM `DevelopmentStudios`"
		dev = execute_query(db_connection, dev_query).fetchall()

		# get list of the platform's developers
		platDev_query = "SELECT platformDeveloper FROM `Platforms`"
		platDev = execute_query(db_connection, platDev_query).fetchall()

		# get list of the franchise's developers
		franchiseDev_query = "SELECT franchiseDeveloper FROM `Franchises`"
		franchiseDev = execute_query(db_connection, franchiseDev_query).fetchall()

		return render_template("del_element.j2", platforms=plat, franchises=franchise, devs=dev, platDev=platDev, franchiseDev=franchiseDev)
	else:
		# get request payload from POST request
		query_vals = request.get_json()

		# build query from request payload, depending on action
		# include if statements to check for empty attributes (""). If empty, don't add WHERE to query

		# if query_vals["action"] == "update":
			# build update query

		# else:
			# if query_vals["action"] == "searchTitle":
				# query = build_query_searchTitle(query_vals)

				# make an array of the paltforms to include in the response
				# select from TitlesPlatforms query_vals["titlePlat"]

			# elif query_vals["action"] == "searchDev":
				# query = build_query_searchDev(query_vals)

			# elif query_vals["action"] == "searchPlat":
				# query = build_query_searchPlat(query_vals)

			# elif query_vals["action"] == "searchFranchise":
				# query = build_query_searchFranchise(query_vals)

		# result = execute_query(db_connection, query).fetchall()

		# return result(?)
		return {}

# Listener

if __name__ == "__main__":
	port = int(os.environ.get('PORT', 4567))
	#                                 ^^^^
    #              You can replace this number with any valid port
	app.run(port=port, debug=True)

def build_query_searchTitle(query_vals):
	# query_vals = {
	#	"titleName"
	#	"titlePlatID"
	#	"titleFromDate"
	#	"titleToDate"
	#	"titleGenre"
	#	"titleFranchiseID"
	#	"titleDevID"
	#	"titleESRB" }

	# getting an error trying to format t.titleRelease date
	# DATE_FORMAT(t.titleRelease, '%Y-%m-%d') AS t.titleRelease
	query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
	query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
	query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"
	
	no_where = 1

	if query_vals["titleName"] != "":
		query += " WHERE t.titleName LIKE '%" + query_vals["titleName"] + "%'"
		no_where = 0
	
	if query_vals["titleFromDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "t.titleRelease >= '" + query_vals["titleFromDate"] + "'"
	
	if query_vals["titleToDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "t.titleRelease <= '" + query_vals["titleToDate"] + "'"
	
	if query_vals["titleGenre"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "t.titleGenre = '" + query_vals["titleGenre"] + "'"
	
	if query_vals["titleFranchiseID"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "f.franchiseID = '" + query_vals["titleFranchiseID"] + "'"
	
	if query_vals["titleDevID"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "d.developerID = '" + query_vals["titleDevID"] + "'"
	
	if query_vals["titleESRB"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "t.titleESRB = '" + query_vals["titleESRB"] + "'"

	query += ";"
	return query

def build_query_searchTitlesPlatforms(query_vals):
	# query_vals = {
	#	"titleName"
	#	"titlePlatID"
	#	"titleFromDate"
	#	"titleToDate"
	#	"titleGenre"
	#	"titleFranchiseID"
	#	"titleDevID"
	#	"titleESRB" }
	pass

def build_query_searchDev(query_vals):
	# query_vals = {
	#	"devName"
	#	"devCountry"
	#	"devFromDate"
	#	"devToDate"
	# }

	query = "SELECT * FROM `DevelopmentStudios`"
	no_where = 1;

	if query_vals["devName"] != "":
		query += " WHERE developerName LIKE %'" + query_vals["devName"] + "%'"
	
	if query_vals["devCountry"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "developerCountry = '" + query_vals["devCountry"] + "'"
	
	if query_vals["devFromDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "developerFounded >= '" + query_vals["devFromDate"] + "'"
	
	if query_vals["devToDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "developerFounded <= '" + query_vals["devToDate"] + "'"

	query += ";"
	return query

def build_query_searchPlat(query_vals):
	# query_vals = {
	#	"platName"
	#	"platFromDate"
	#	"platToDate"
	#	"platDev"
	#	"platInProd"
	# }

	query = "SELECT * FROM `Platforms`"
	no_where = 1;

	if query_vals["platName"] != "":
		query += " WHERE platformName LIKE %'" + query_vals["platName"] + "%'"

	if query_vals["platFromDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "platformRelease >= '" + query_vals["platFromDate"] + "'"

	if query_vals["platToDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "platformRelease >= '" + query_vals["platToDate"] + "'"

	if query_vals["platDev"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += " AND platformDeveloper = '" + query_vals["platDev"] + "'"

	if query_vals["platInProd"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "platformInProduction = '" + query_vals["platInProd"] + "'"

	query += ";"
	return query

def build_query_searchFranchise(query_vals):
	# query_parameters = {
	#	"franchiseName"
	#	"franchiseDev"
	# }

	query = "SELECT * FROM `Franchises`"
	no_where = 1;

	if query_parameters["franchiseName"] != "":
		query += " WHERE franchiseName LIKE %'" + query_vals["franchiseName"] + "%"

	if query_parameters["franchiseDev"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += " AND franchiseDeveloper = '" + query_vals["franchiseDev"] + "'"

	query += ";"
	return query