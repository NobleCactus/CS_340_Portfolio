from flask import Flask, render_template, request, jsonify
from db_connector import connect_to_database, execute_query
import os

# Configuration

app = Flask(__name__)

# Routes

@app.route('/', methods=['GET', 'POST'])
def root():
	db_connection = connect_to_database()
	if request.method == 'GET':
		# get all Video Game Titles
		table_query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
		table_query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
		table_query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID;"
		table = execute_query(db_connection, table_query).fetchall()

		# dynamically populate drop down menu platforms/franchises/devs with corresponding table values
		plat_query =  "SELECT platformID, platformName FROM `Platforms`"
		plat = execute_query(db_connection, plat_query).fetchall()
		franchise_query =  "SELECT franchiseID, franchiseName FROM `Franchises`"
		franchise = execute_query(db_connection, franchise_query).fetchall()
		dev_query =  "SELECT developerID, developerName FROM `DevelopmentStudios`"
		dev = execute_query(db_connection, dev_query).fetchall()

		return render_template("main.j2", titles=table, platforms=plat, franchises=franchise, devs=dev)
	else:
		# get request payload from POST request
		query_vals = request.get_json()
		print("RECEIVED REQUEST VALUES:", query_vals)

		# build query from request payload values
		query_params = build_query_searchTitle(query_vals)

		print("QUERY + PARAMS:", query_params)
		result = execute_query(db_connection, query_params[0], query_params[1]).fetchall()

		# make query to TitlesPlatforms, get response
		# query_params_titlesPlats = build_query_searchTitlesPlatforms(query_vals)
		# result = execute_query(db_connection, query_params_titlesPlats[0], query_params_titlesPlats[1]).fetchall()

		# package with result above

		# return DB tables back to webpage
		return jsonify(result)

@app.route('/add', methods=['GET', 'POST'])
def add():
	db_connection = connect_to_database()
	if request.method == 'GET':
		# dynamically populate drop down menu platforms/franchises/devs with corresponding table values
		plat_query =  "SELECT platformID, platformName FROM `Platforms`"
		plat = execute_query(db_connection, plat_query).fetchall()
		franchise_query =  "SELECT franchiseID, franchiseName FROM `Franchises`"
		franchise = execute_query(db_connection, franchise_query).fetchall()
		dev_query =  "SELECT developerID, developerName FROM `DevelopmentStudios`"
		dev = execute_query(db_connection, dev_query).fetchall()

		return render_template("add_element.j2", platforms=plat, franchises=franchise, devs=dev)
	else:
		# get request payload from POST request
		query_vals = request.get_json()

		# build query from request, depending on action
		if query_vals["action"] == "addTitle":
			return execute_addTitle(db_connection, query_vals)

		elif query_vals["action"] == "addDev":
			# query_vals = { "devName", "devCountry", "devDate"}
			params = (query_vals["devName"], query_vals["devCountry"], query_vals ["devDate"])
			query = "INSERT INTO `DevelopmentStudios` (developerName, developerCountry, developerFounded) VALUES "
			query += "(%s, %s, %s);"
			result = execute_query(db_connection, query, params).fetchall()
			print(result)

		elif query_vals["action"] == "addPlat":
			# query_vals = {"platName", "platDate", "platDev", "platInProd"}
			params = (query_vals["platName"], query_vals["platDate"], query_vals["platDev"], str(query_vals["platInProd"]))
			query = "INSERT INTO `Platforms` (platformName, platformRelease, platformDeveloper, platformInProduction) VALUES "
			query += "(%s, %s, %s, %s);"
			result = execute_query(db_connection, query).fetchall()
			print(result)

		elif query_vals["action"] == "addFranchise":
			# query_vals = {"franchiseName", "franchiseDev"}
			params = (query_vals["franchiseName"], query_vals["franchiseDev"])
			query = "INSERT INTO `Franchises` (franchiseName, franchiseDeveloper) VALUES ("
			query += "(%s, %s);"
			result = execute_query(db_connection, query).fetchall()

		return jsonify(result)

@app.route('/delete', methods=['GET', 'POST'])
def delete():
	db_connection = connect_to_database()
	if request.method == 'GET':
		# dynamically populate drop down menu platforms/franchises/devs/platformDevs/franchiseDevs with corresponding table values
		plat_query =  "SELECT platformID, platformName FROM `Platforms`"
		plat = execute_query(db_connection, plat_query).fetchall()
		franchise_query =  "SELECT franchiseID, franchiseName FROM `Franchises`"
		franchise = execute_query(db_connection, franchise_query).fetchall()
		dev_query =  "SELECT developerID, developerName FROM `DevelopmentStudios`"
		dev = execute_query(db_connection, dev_query).fetchall()
		platDev_query = "SELECT platformDeveloper FROM `Platforms` GROUP BY platformDeveloper"
		platDev = execute_query(db_connection, platDev_query).fetchall()
		franchiseDev_query = "SELECT franchiseDeveloper FROM `Franchises` GROUP BY franchiseDeveloper"
		franchiseDev = execute_query(db_connection, franchiseDev_query).fetchall()

		return render_template("del_element.j2", platforms=plat, franchises=franchise, devs=dev, platDev=platDev, franchiseDev=franchiseDev)
	else:
		# get request payload from POST request
		query_vals = request.get_json()
		print(query_vals["action"])
		# build query from request payload, depending on action
		# include if statements to check for empty attributes (""). If empty, don't add WHERE to query

		#if query_vals["action"] == "delete":
			#pass
			# build delete query

		#else:
		if query_vals["action"] == "searchTitle":
			query_params = build_query_searchTitle(query_vals)

				# make an array of the paltforms to include in the response
				# select from TitlesPlatforms query_vals["titlePlat"]

		elif query_vals["action"] == "searchDev":
			query_params = build_query_searchDev(query_vals)

		elif query_vals["action"] == "searchPlat":
			query_params = build_query_searchPlat(query_vals)

		elif query_vals["action"] == "searchFranchise":
			query_params = build_query_searchFranchise(query_vals)
		print("printed from del search request")
		result = execute_query(db_connection, query_params[0], query_params[1]).fetchall()
		print(result)

		return jsonify(result)


@app.route('/update', methods=['GET', 'POST'])
def update():
	db_connection = connect_to_database()
	if request.method == 'GET':
		# dynamically populate drop down menu platforms/franchises/devs/platformDevs/franchiseDevs with corresponding table values
		plat_query =  "SELECT platformID, platformName FROM `Platforms`"
		plat = execute_query(db_connection, plat_query).fetchall()
		franchise_query =  "SELECT franchiseID, franchiseName FROM `Franchises`"
		franchise = execute_query(db_connection, franchise_query).fetchall()
		dev_query =  "SELECT developerID, developerName FROM `DevelopmentStudios`"
		dev = execute_query(db_connection, dev_query).fetchall()
		platDev_query = "SELECT platformDeveloper FROM `Platforms` GROUP BY platformDeveloper"
		platDev = execute_query(db_connection, platDev_query).fetchall()
		franchiseDev_query = "SELECT franchiseDeveloper FROM `Franchises` GROUP BY franchiseDeveloper"
		franchiseDev = execute_query(db_connection, franchiseDev_query).fetchall()

		return render_template("update_element.j2", platforms=plat, franchises=franchise, devs=dev, platDev=platDev, franchiseDev=franchiseDev)
	else:
		# get request payload from POST request
		query_vals = request.get_json()

		# build query from request payload, depending on action
		# include if statements to check for empty attributes (""). If empty, don't add WHERE to query

		if query_vals["action"] == "update":
			#build update query
			pass

		else:
			if query_vals["action"] == "searchTitle":
				query_params = build_query_searchTitle(query_vals)

				# make an array of the paltforms to include in the response
				# select from TitlesPlatforms query_vals["titlePlat"]

			elif query_vals["action"] == "searchDev":
				query_params = build_query_searchDev(query_vals)

			elif query_vals["action"] == "searchPlat":
				query_params = build_query_searchPlat(query_vals)

			elif query_vals["action"] == "searchFranchise":
				query_params = build_query_searchFranchise(query_vals)

		result = execute_query(db_connection, query_params[0], query_params[1]).fetchall()
		print(result)

		return jsonify(result)

# Listener
if __name__ == "__main__":
	port = int(os.environ.get('PORT', 4567))
	#                                 ^^^^
    #              You can replace this number with any valid port
	app.run(port=port, debug=True)


def execute_addTitle(db_connection, query_vals):
	# query_vals = {"titleName", "titlePlatIDs", "titleRelease", "titleGenre", "titleFranchiseID", "titleDevID", "titleESRB"}
	
	print("IN FUNCTION TO ADD TITLE")

	params = (query_vals["titleName"], query_vals["titleRelease"], query_vals["titleDevID"])
	query = "INSERT INTO `VideoGameTitles` (titleName, titleRelease, titleDeveloperID"
	values = " VALUES (%s, %s, %s"

	if query_vals["titleESRB"] != "" :
		params += (query_vals["titleESRB"],)
		query += ", titleESRB"
		values += ", %s"

	if query_vals["titleGenre"] != "" :
		params += (query_vals["titleGenre"],)
		query += ", titleGenre"
		values += ", %s"

	if query_vals["titleFranchiseID"] != "" :
		params += (query_vals["titleFranchiseID"],)
		query += ", titleFranchiseID"
		values += ", %s"

	values += ");"
	query += ")" + values

	print("INSERT TITLE QUERY:", query)
	print("INSERT TITLE PARAMS:", params)

	try:
		print("TRYING TO EXECUTE INSERT TITLE QUERY")
		execute_query(db_connection, query, params)
	
	# error in INSERTing a Title
	except:
		print("ERROR IN INSERTING TITLE")
		return {"result": "0"}
	
	# Title successfully added, now add TitlesPlats
	else:
		print("INSERTING TITLESPLATFORMS")
		for platformID in query_vals["titlePlatIDs"]:
			params = (query_vals["titleName"], platformID)
			query = "INSERT INTO `TitlesPlatforms` (titleID, platformID)"
			query += " VALUES ((SELECT t.titleID FROM VideoGameTitles AS t WHERE t.titleName = %s), %s);"
			print("TITLESPLATS QUERY:", query)
			print("TITLESPLATS PARAMS:", params)
			execute_query(db_connection, query, params)

	print("SUCCESSFUL ADDING TITLE")
	return {"result:": "1"}

def build_query_searchTitle(query_vals):
	# query_vals = {"titleName", "titlePlatIDs", "titleRelease", "titleGenre", "titleFranchise", "titleDev", "titleESRB"}

	# getting an error trying to format t.titleRelease date
	# DATE_FORMAT(t.titleRelease, '%Y-%m-%d') AS t.titleRelease
	query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
	query += "JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
	query += "JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"
	no_where = 1
	params = ()
	if query_vals["titleName"] != "":
		query += " WHERE t.titleName LIKE %s"
		params += ("%" + query_vals["titleName"] + "%",)
		no_where = 0
	if query_vals["titleFromDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "t.titleRelease >= %s"
		params += (query_vals["titleFromDate"],)
	if query_vals["titleToDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "t.titleRelease <= %s"
		params += (query_vals["titleToDate"],)
	if query_vals["titleGenre"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "t.titleGenre = %s"
		params += (query_vals["titleGenre"],)
	if query_vals["titleFranchiseID"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "f.franchiseID = %s"
		params += (query_vals["titleFranchiseID"],)
	if query_vals["titleDevID"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "d.developerID = %s"
		params += (query_vals["titleDevID"],)
	if query_vals["titleESRB"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "t.titleESRB = %s"
		params += (query_vals["titleESRB"],)
	query += ";"

	return (query, params)

def build_query_searchTitlesPlatforms(query_vals):
	# query_vals = {"titleName", "titlePlatIDs", "titleRelease", "titleGenre", "titleFranchise", "titleDev", "titleESRB"}
	pass

def build_query_searchDev(query_vals):
	# query_vals = {"devName", "devCountry", "devFromDate", "devToDate"}
	query = "SELECT * FROM `DevelopmentStudios`"
	no_where = 1
	params = ()
	if query_vals["devName"] != "":
		query += " WHERE developerName LIKE %s"
		params += ("%" + query_vals["devName"] + "%",)
		no_where = 0
	if query_vals["devCountry"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "developerCountry = %s"
		params += (query_vals["devCountry"],)
	if query_vals["devFromDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "developerFounded >= %s"
		params += (query_vals["devFromDate"],)
	if query_vals["devToDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "developerFounded <= %s"
		params += (query_vals["devToDate"],)
	query += ";"

	return (query, params)

def build_query_searchPlat(query_vals):
	# query_vals = {"platName", "platFromDate", "platToDate", "platDev", "platInProd"}
	query = "SELECT * FROM `Platforms`"
	no_where = 1
	params = ()
	if query_vals["platName"] != "":
		query += " WHERE platformName LIKE %s"
		params += ("%" + query_vals["platName"] + "%",)
		no_where = 0
	if query_vals["platFromDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "platformRelease >= %s"
		params += (query_vals["platFromDate"],)
	if query_vals["platToDate"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "platformRelease >= %s"
		params += (query_vals["platToDate"],)
	if query_vals["platDev"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += " AND platformDeveloper = %s"
		params += (query_vals["platDev"],)
	if query_vals["platInProd"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += "platformInProduction = %s"
		params += (query_vals["platInProd"],)
	query += ";"

	return (query, params)

def build_query_searchFranchise(query_vals):
	# query_parameters = {"franchiseName", "franchiseDev"}
	query = "SELECT * FROM `Franchises`"
	no_where = 1
	params = ()
	if query_vals["franchiseName"] != "":
		query += " WHERE franchiseName LIKE %s"
		params += ("%" + query_vals["franchiseName"] + "%",)
		no_where = 0
	if query_vals["franchiseDev"] != "":
		if no_where:
			query += " WHERE "
			no_where = 0
		else:
			query += " AND "
		query += " AND franchiseDeveloper = %s"
		params += (query_vals["franchiseDev"],)
	query += ";"
	print("TROUBLESHOOTING FRANCHISE NAME")
	print(query)

	return (query, params)
