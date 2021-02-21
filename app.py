from flask import Flask, render_template, request
from db_connector import connect_to_database, execute_query
import os

# Configuration

app = Flask(__name__)

# Routes.

@app.route('/', methods=['GET', 'POST'])
def root():
	print("IN THE ROOT ROUTE")
	db_connection = connect_to_database()
	print("DB CONNECTION ESTABLISHED")
	if request.method == 'GET':
		print("IN THE GET REQUEST CODE")
		# show all Video Game Titles
		query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
		query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
		query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"
		print("QUERY STRING: ", query)
		result = execute_query(db_connection, query).fetchall()
		print("DB RESULT: ", result)
		print("RENDERING TEMPLATE")
		return render_template("main.j2", rows=result)
	else:
		pass
		# get filter parameters from POST request
		# build query from request payload

		# include if statements to check for empty attributes (""). If empty, don't add to query
		# query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
		# query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
		# query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"
		# query += "WHERE t.titleName LIKE %" + payload["titleSearch"] + "%"
		# query += "WHERE t.titleRelease >=" + payload["fromDate"]
		# query += "WHERE t.titleRelease <=" + payload["toDate"]
		# query += "WHERE t.titleGenre LIKE %" + payload["genre"] + "%"
		# query += "WHERE f.franchiseName = " + payload["franchise"]
		# query += "WHERE d.developerName = " + payload["developer"]
		# query += "WHERE t.titleESRB = " + payload["esrb"]

		# query DB, get response

		# make query to TitlesPlatforms, get response

		# package results
		# send the results back to webpage

@app.route('/add', methods=['GET', 'POST'])
def add():
	db_connection = connect_to_database()
	if request.method == 'GET':
		return render_template("add_element.j2")
	else:
<<<<<<< Updated upstream
		# get payload from add_element.js
		# read payload[0] to determine if adding title/dev/platform/franchise
		# query
	    	# render (change the indicator for successful/unsuccessful add)
                Pass
=======
		pass
		# get request payload from POST request

		# build query from request payload, depending on action

		# if payload["action"] == "addTitle":
			# query = "INSERT INTO `VideoGameTitles` (titleName, titleESRB, titleGenre, titleRelease, titleDeveloperID, titleFranchiseID) VALUES ("
			# query += payload["titleName"] + ", "
			# query += payload["titleESRB"] + ", "
			# query += payload["titleGenre"] + ", "
			# query += payload["titleRelease"] + ", "
			# query += "(SELECT developerID FROM `DevelopmentStudios` WHERE developerName = " + payload["titleDev"] + "), "
			# query += "(SELECT franchiseID FROM `Franchises` WHERE franchiseName = " + payload["titleFranchise"] + "));"

			# if query is successful, INSERT into TitlesPlatforms
				# for platform in payload["titlePlat"]:
				# query = INSERT INTO `TitlesPlatforms` (titleID, platformID) VALUES ((
				# query += "SELECT t.titleID FROM VideoGameTitles AS t WHERE t.titleName = )"" + payload["titleName"] + "), "
				# query += "(SELECT p.platformID FROM Platforms AS p WHERE p.platformName = " + platform + "));"

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

>>>>>>> Stashed changes
@app.route('/delete', methods=['GET', 'POST'])
def delete():
	db_connection = connect_to_database()
	if request.method == 'GET':
		return render_template("del_element.j2")
	else:
		pass

@app.route('/update', methods=['GET', 'POST'])
def update():
	db_connection = connect_to_database()
	if request.method == 'GET':
		return render_template("update_element.j2")
	else:
		pass

# Listener

if __name__ == "__main__":
	port = int(os.environ.get('PORT', 9112))
	#                                 ^^^^
    #              You can replace this number with any valid port
	app.run(port=port, debug=True)


