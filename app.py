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
		# show all Video Game Titles
		query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
		query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
		query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID;"
		result = execute_query(db_connection, query).fetchall()
		return render_template("main.j2", rows=result)
	else:
		# get request payload from POST request
		query_vals = request.get_json()
		print("REQUEST: ", query_vals)
		# query_vals = {
		#				"titleSearch"
		#				"filterPlatform"
		#				"fromDate"
		#				"toDate"
		#				"genre"
		#				"franchise"
		#				"developer"
		#				"esrb"
		# }

		# build query from request payload
		print("BUILDING QUERY")
		query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
		query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
		query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"

		print("QUERY SO FAR: ", query)

		if query_vals["titleSearch"] != "":
			query += " WHERE t.titleName LIKE %" + query_vals["titleSearch"] + "%"
		if query_vals["fromDate"] != "":
			query += " WHERE t.titleRelease >=" + query_vals["fromDate"]
		if query_vals["toDate"] != "":
			query += " WHERE t.titleRelease <=" + query_vals["toDate"]
		if query_vals["genre"] != "":
			query += " WHERE t.titleGenre = " + query_vals["genre"]
		if query_vals["franchise"] != "":
			query += " WHERE f.franchiseName = " + query_vals["franchise"]
		if query_vals["developer"] != "":
			query += " WHERE d.developerName = " + query_vals["developer"]
		if query_vals["esrb"] != "":
			query += " WHERE t.titleESRB = " + query_vals["esrb"]

		query += ";"

		print("FINISHED QUERY: ", query)

		# query DB, get response
		result = execute_query(db_connection, query).fetchall()

		# make query to TitlesPlatforms, get response

		# return DB tables back to webpage
		return result

@app.route('/add', methods=['GET', 'POST'])
def add():
	db_connection = connect_to_database()
	if request.method == 'GET':
		return render_template("add_element.j2")
	else:
		# get request payload from POST request
		query_vals = request.get_json()
		
		# access query_vals values like a dictionary
		#print("query_vals['action']: ", query_vals["action"])
		
		# build query from request, depending on action
		# include if statements to check for empty attributes ("") for those that can be null. If empty, don't add WHERE to query

		# query = ""

		# if query_vals["action"] == "addTitle":
			# query = "INSERT INTO `VideoGameTitles` (titleName, titleESRB, titleGenre, titleRelease, titleDeveloperID, titleFranchiseID) VALUES ("
			# query += query_vals["titleName"] + ", "
			# query += query_vals["titleESRB"] + ", "
			# query += query_vals["titleGenre"] + ", "
			# query += query_vals["titleRelease"] + ", "
			# query += "(SELECT developerID FROM `DevelopmentStudios` WHERE developerName = " + query_vals["titleDev"] + "), "
			# query += "(SELECT franchiseID FROM `Franchises` WHERE franchiseName = " + query_vals["titleFranchise"] + "));"

			# if query is successful: build query to INSERT into TitlesPlatforms
				# query = "INSERT INTO `TitlesPlatforms` (titleID, platformID) VALUES ("
				# for platform in query_vals["titlePlat"]:
					# query += "(SELECT t.titleID FROM VideoGameTitles AS t WHERE t.titleName = )"" + query_vals["titleName"] + "), "
					# query += "(SELECT p.platformID FROM Platforms AS p WHERE p.platformName = " + platform + ")"
				# query += ");"

			# else:
				# send unsuccessful back to webpage, return failed message

		# elif query_vals["action"] == "addDev":
			# query = "INSERT INTO `DevelopmentStudios` (developerName, developerCountry, developerFounded) VALUES ("
			# query += query_vals["devName"] + query_vals["devCountry"] + query_vals ["devDate"] + ");"

		# elif query_vals["action"] == "addPlat":
			# query = "INSERT INTO `Platforms` (platformName, platformRelease, platformDeveloper, platformInProduction) VALUES ("
			# query += query_vals["platName"] + query_vals["platDate"] + query_vals[""] + query_vals["platDev"] + query_vals["platInProd"] + ");"

		# elif query_vals["action"] == "addFranchise":
			# query = "INSERT INTO `Franchises` (franchiseName, franchiseDeveloper) VALUES ("
			# query += query_vals["franchiseName"] + query_vals["franchiseDev"] + ");"

		# result = execute_query(db_connection, query).fetchall()

		# return result(?)
		return

@app.route('/delete', methods=['GET', 'POST'])
def delete():
	db_connection = connect_to_database()
	if request.method == 'GET':
		return render_template("del_element.j2")
	else:
		# get request payload from POST request
		query_vals = request.get_json()

		# build query from request payload, depending on action
		# include if statements to check for empty attributes (""). If empty, don't add WHERE to query

		# query = ""

		# if query_vals["action"] == "searchTitle":
			# query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
			# query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
			# query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"
			# query += "WHERE t.titleName LIKE %" + query_vals["titleName"] + "% "
			# query += "AND t.titleRelease >=" + query_vals["titleFromDate"] + " "
			# query += "AND t.titleRelease <=" + query_vals["titleToDate"] + " "
			# query += "AND t.titleGenre LIKE %" + query_vals["titleGenre"] + "% "
			# query += "AND f.franchiseName = " + query_vals["titleFranchise"] + " "
			# query += "AND d.developerName = " + query_vals["titleDev"] + " "
			# query += "AND t.titleESRB = " + query_vals["titleESRB"]

			# make an array of the paltforms to include in the response
			# select from TitlesPlatforms query_vals["titlePlat"]

		# elif query_vals["action"] == "searchDev":
			# query = "SELECT * FROM `DevelopmentStudios` "
			# query += "WHERE developerName LIKE %" + query_vals["devName"] + "% "
			# query += "AND developerCountry = " + query_vals["devCountry"] + " "
			# query += "AND developerFounded >= " + query_vals["devFromDate"] + " "
			# query += "AND developerFounded <= " + query_vals["devToDate"]

		# elif query_vals["action"] == "searchPlat":
			# query = "SELECT * FROM `Platforms` "
			# query += "WHERE platformName LIKE %" + query_vals["platName"] + "% "
			# query += "AND platformRelease >= " + query_vals["platFromDate"] + " "
			# query += "AND platformRelease >= " + query_vals["platToDate"] + " "
			# query += "AND platformDeveloper = " + query_vals["platDev"] + " "
			# query += "AND platformInProduction = " + query_vals["platInProd"]

		# elif query_vals["action"] == "searchFranchise":
			# query = "SELECT * FROM `Franchises` "
			# query += "WHERE franchiseName LIKE %" + query_vals["franchiseName"] + "% "
			# query += "AND franchiseDeveloper = " + query_vals["franchiseDev"]

		# result = execute_query(db_connection, query).fetchall()

		# return result(?)
		return

@app.route('/update', methods=['GET', 'POST'])
def update():
	db_connection = connect_to_database()
	if request.method == 'GET':
		return render_template("update_element.j2")
	else:
		# get request payload from POST request
		query_vals = request.get_json()

		# build query from request payload, depending on action
		# include if statements to check for empty attributes (""). If empty, don't add WHERE to query

		# query = ""

		# if query_vals["action"] == "searchTitle":
			# query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
			# query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
			# query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"
			# query += "WHERE t.titleName LIKE %" + query_vals["titleName"] + "% "
			# query += "AND t.titleRelease >=" + query_vals["titleFromDate"] + " "
			# query += "AND t.titleRelease <=" + query_vals["titleToDate"] + " "
			# query += "AND t.titleGenre = " + query_vals["titleGenre"] + " "
			# query += "AND f.franchiseName = " + query_vals["titleFranchise"] + " "
			# query += "AND d.developerName = " + query_vals["titleDev"] + " "
			# query += "AND t.titleESRB = " + query_vals["titleESRB"]

			# make an array of the paltforms to include in the response
			# select from TitlesPlatforms query_vals["titlePlat"]

		# elif query_vals["action"] == "searchDev":
			# query = "SELECT * FROM `DevelopmentStudios` "
			# query += "WHERE developerName LIKE %" + query_vals["devName"] + "% "
			# query += "AND developerCountry = " + query_vals["devCountry"] + " "
			# query += "AND developerFounded >= " + query_vals["devFromDate"] + " "
			# query += "AND developerFounded <= " + query_vals["devToDate"]

		# elif query_vals["action"] == "searchPlat":
			# query = "SELECT * FROM `Platforms` "
			# query += "WHERE platformName LIKE %" + query_vals["platName"] + "% "
			# query += "AND platformRelease >= " + query_vals["platFromDate"] + " "
			# query += "AND platformRelease >= " + query_vals["platToDate"] + " "
			# query += "AND platformDeveloper = " + query_vals["platDev"] + " "
			# query += "AND platformInProduction = " + query_vals["platInProd"]

		# elif query_vals["action"] == "searchFranchise":
			# query = "SELECT * FROM `Franchises` "
			# query += "WHERE franchiseName LIKE %" + query_vals["franchiseName"] + "% "
			# query += "AND franchiseDeveloper = " + query_vals["franchiseDev"]

		# result = execute_query(db_connection, query).fetchall()

		# return result(?)
		return

# Listener

if __name__ == "__main__":
	port = int(os.environ.get('PORT', 9112))
	#                                 ^^^^
    #              You can replace this number with any valid port
	app.run(port=port, debug=True)


