from flask import Flask, render_template, request
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
		query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"
		result = execute_query(db_connection, query).fetchall()
		return render_template("main.j2", rows=result)
	else:
		pass
		# get filter parameters from POST request

		# build query from request payload
		# include if statements to check for empty attributes (""). If empty, don't add WHERE to query

		# query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
		# query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
		# query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID "
		# query += "WHERE t.titleName LIKE %" + payload["titleSearch"] + "% "
		# query += "WHERE t.titleRelease >=" + payload["fromDate"] + " "
		# query += "WHERE t.titleRelease <=" + payload["toDate"] + " "
		# query += "WHERE t.titleGenre LIKE %" + payload["genre"] + "% "
		# query += "WHERE f.franchiseName = " + payload["franchise"] + " "
		# query += "WHERE d.developerName = " + payload["developer"] + " "
		# query += "WHERE t.titleESRB = " + payload["esrb"]

		# query DB, get response

		# make query to TitlesPlatforms, get response

		# package results
		# send the results back to webpage

@app.route('/add', methods=['GET', 'POST'])
def add():
	print("IN THE ADD ROUTE")
	db_connection = connect_to_database()
	if request.method == 'GET':
		print("GET REQUESTED")
		return render_template("add_element.j2")
	else:
		print("POST REQUESTED")
		print(request.get_json())
		pass
		# get request payload from POST request

		# build query from request payload, depending on action
		# include if statements to check for empty attributes (""). If empty, don't add WHERE to query

		# query = ""

		# if payload["action"] == "addTitle":
			# query = "INSERT INTO `VideoGameTitles` (titleName, titleESRB, titleGenre, titleRelease, titleDeveloperID, titleFranchiseID) VALUES ("
			# query += payload["titleName"] + ", "
			# query += payload["titleESRB"] + ", "
			# query += payload["titleGenre"] + ", "
			# query += payload["titleRelease"] + ", "
			# query += "(SELECT developerID FROM `DevelopmentStudios` WHERE developerName = " + payload["titleDev"] + "), "
			# query += "(SELECT franchiseID FROM `Franchises` WHERE franchiseName = " + payload["titleFranchise"] + "));"

			# if query is successful: build query to INSERT into TitlesPlatforms
				# query = "INSERT INTO `TitlesPlatforms` (titleID, platformID) VALUES ("
				# for platform in payload["titlePlat"]:
					# query += "(SELECT t.titleID FROM VideoGameTitles AS t WHERE t.titleName = )"" + payload["titleName"] + "), "
					# query += "(SELECT p.platformID FROM Platforms AS p WHERE p.platformName = " + platform + ")"
				# query += ");"

			# else:
				# send unsuccessful back to webpage, return

		# elif payload["action"] == "addDev":
			# query = "INSERT INTO `DevelopmentStudios` (developerName, developerCountry, developerFounded) VALUES ("
			# query += payload["devName"] + payload["devCountry"] + payload ["devDate"] + ");"

		# elif payload["action"] == "addPlat":
			# query = "INSERT INTO `Platforms` (platformName, platformRelease, platformDeveloper, platformInProduction) VALUES ("
			# query += payload["platName"] + payload["platDate"] + payload[""] + payload["platDev"] + payload["platInProd"] + ");"

		# elif payload["action"] == "addFranchise":
			# query = "INSERT INTO `Franchises` (franchiseName, franchiseDeveloper) VALUES ("
			# query += payload["franchiseName"] + payload["franchiseDev"] + ");"

		# query DB, get response (only care if successful or not)

		# send if sucessful/unsuccessful back to webpage

@app.route('/delete', methods=['GET', 'POST'])
def delete():
	db_connection = connect_to_database()
	if request.method == 'GET':
		return render_template("del_element.j2")
	else:
		pass
		# get request payload from POST request

		# build query from request payload, depending on action
		# include if statements to check for empty attributes (""). If empty, don't add WHERE to query

		# query = ""

		# if payload["action"] == "searchTitle":
			# query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
			# query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
			# query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"
			# query += "WHERE t.titleName LIKE %" + payload["titleName"] + "% "
			# query += "AND t.titleRelease >=" + payload["titleFromDate"] + " "
			# query += "AND t.titleRelease <=" + payload["titleToDate"] + " "
			# query += "AND t.titleGenre LIKE %" + payload["titleGenre"] + "% "
			# query += "AND f.franchiseName = " + payload["titleFranchise"] + " "
			# query += "AND d.developerName = " + payload["titleDev"] + " "
			# query += "AND t.titleESRB = " + payload["titleESRB"]

			# make an array of the paltforms to include in the response
			# select from TitlesPlatforms payload["titlePlat"]

		# elif payload["action"] == "searchDev":
			# query = "SELECT * FROM `DevelopmentStudios` "
			# query += "WHERE developerName LIKE %" + payload["devName"] + "% "
			# query += "AND developerCountry = " + payload["devCountry"] + " "
			# query += "AND developerFounded >= " + payload["devFromDate"] + " "
			# query += "AND developerFounded <= " + payload["devToDate"]

		# elif payload["action"] == "searchPlat":
			# query = "SELECT * FROM `Platforms` "
			# query += "WHERE platformName LIKE %" + payload["platName"] + "% "
			# query += "AND platformRelease >= " + payload["platFromDate"] + " "
			# query += "AND platformRelease >= " + payload["platToDate"] + " "
			# query += "AND platformDeveloper = " + payload["platDev"] + " "
			# query += "AND platformInProduction = " + payload["platInProd"]

		# elif payload["action"] == "searchFranchise":
			# query = "SELECT * FROM `Franchises` "
			# query += "WHERE franchiseName LIKE %" + payload["franchiseName"] + "% "
			# query += "AND franchiseDeveloper = " + payload["franchiseDev"]

		# query DB, get response

		# send table results back to webpage

@app.route('/update', methods=['GET', 'POST'])
def update():
	db_connection = connect_to_database()
	if request.method == 'GET':
		return render_template("update_element.j2")
	else:
		pass
		# get request payload from POST request

		# build query from request payload, depending on action
		# include if statements to check for empty attributes (""). If empty, don't add WHERE to query

		# query = ""

		# if payload["action"] == "searchTitle":
			# query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
			# query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
			# query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"
			# query += "WHERE t.titleName LIKE %" + payload["titleName"] + "% "
			# query += "AND t.titleRelease >=" + payload["titleFromDate"] + " "
			# query += "AND t.titleRelease <=" + payload["titleToDate"] + " "
			# query += "AND t.titleGenre LIKE %" + payload["titleGenre"] + "% "
			# query += "AND f.franchiseName = " + payload["titleFranchise"] + " "
			# query += "AND d.developerName = " + payload["titleDev"] + " "
			# query += "AND t.titleESRB = " + payload["titleESRB"]

			# make an array of the paltforms to include in the response
			# select from TitlesPlatforms payload["titlePlat"]

		# elif payload["action"] == "searchDev":
			# query = "SELECT * FROM `DevelopmentStudios` "
			# query += "WHERE developerName LIKE %" + payload["devName"] + "% "
			# query += "AND developerCountry = " + payload["devCountry"] + " "
			# query += "AND developerFounded >= " + payload["devFromDate"] + " "
			# query += "AND developerFounded <= " + payload["devToDate"]

		# elif payload["action"] == "searchPlat":
			# query = "SELECT * FROM `Platforms` "
			# query += "WHERE platformName LIKE %" + payload["platName"] + "% "
			# query += "AND platformRelease >= " + payload["platFromDate"] + " "
			# query += "AND platformRelease >= " + payload["platToDate"] + " "
			# query += "AND platformDeveloper = " + payload["platDev"] + " "
			# query += "AND platformInProduction = " + payload["platInProd"]

		# elif payload["action"] == "searchFranchise":
			# query = "SELECT * FROM `Franchises` "
			# query += "WHERE franchiseName LIKE %" + payload["franchiseName"] + "% "
			# query += "AND franchiseDeveloper = " + payload["franchiseDev"]

		# query DB, get response

		# send table results back to webpage

# Listener

if __name__ == "__main__":
	port = int(os.environ.get('PORT', 9112))
	#                                 ^^^^
    #              You can replace this number with any valid port
	app.run(port=port, debug=True)


