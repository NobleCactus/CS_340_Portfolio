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
		table_query += "LEFT JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
		table_query += "LEFT JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID "
		table_query += "ORDER BY t.titleName;"
		table = execute_query(db_connection, table_query).fetchall()

		# add the list of platforms for each title
		new_table = add_titles_platforms(quer_vals, table)

		# dynamically populate drop down menu platforms/franchises/devs with corresponding table values
		plat_query = "SELECT platformID, platformName FROM `Platforms` ORDER BY platformName;"
		plat = execute_query(db_connection, plat_query).fetchall()
		
		franchise_query = "SELECT franchiseID, franchiseName FROM `Franchises` ORDER BY franchiseName;"
		franchise = execute_query(db_connection, franchise_query).fetchall()
		
		dev_query =  "SELECT developerID, developerName FROM `DevelopmentStudios` ORDER BY developerName;"
		dev = execute_query(db_connection, dev_query).fetchall()

		return render_template("main.j2", titles=new_table, platforms=plat, franchises=franchise, devs=dev)
	else:
		# get request payload from POST request
		query_vals = request.get_json()

		# build query and search DB
		query_params = build_query_searchTitle(query_vals)
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
		# get platforms/franchises/devs with corresponding table values to dynamically populate drop down menu
		plat_query =  "SELECT platformID, platformName FROM `Platforms`"
		plat = execute_query(db_connection, plat_query).fetchall()
		
		franchise_query =  "SELECT franchiseID, franchiseName FROM `Franchises`"
		franchise = execute_query(db_connection, franchise_query).fetchall()
		
		dev_query =  "SELECT developerID, developerName FROM `DevelopmentStudios`"
		dev = execute_query(db_connection, dev_query).fetchall()

		return render_template("add_element.j2", platforms=plat, franchises=franchise, devs=dev)
	
	# POST request
	else:
		# get request payload from POST request
		query_vals = request.get_json()

		# depending on action, INSERT into appropriate table
		if query_vals["action"] == "addTitle":
			result = execute_addTitle(db_connection, query_vals)
		elif query_vals["action"] == "addDev":
			result = execute_addDev(db_connection, query_vals)
		elif query_vals["action"] == "addPlat":
			result = execute_addPlat(db_connection, query_vals)
		elif query_vals["action"] == "addFranchise":
			result = execute_addFranchise(db_connection, query_vals)

		return jsonify(result)

@app.route('/delete', methods=['GET', 'POST'])
def delete():
	db_connection = connect_to_database()
	if request.method == 'GET':
		# get platforms/franchises/devs/platformDevs/franchiseDevs with corresponding table values to dynamically populate drop down menu
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

		# deleting an element
		if query_vals["action"] == "deleteTitle":
			pass
		elif query_vals["action"] == "deleteDev":
			pass
		elif query_vals["action"] == "deletePlat":
			pass
		elif query_vals["action"] == "deleteFranchise":
			pass
		
		# depending on table, build query and search DB
		elif query_vals["action"] == "searchTitle":
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

		return jsonify(result)

@app.route('/update', methods=['GET', 'POST'])
def update():
	db_connection = connect_to_database()
	if request.method == 'GET':
		# get platforms/franchises/devs/platformDevs/franchiseDevs with corresponding table values to dynamically populate drop down menu
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

		# updating an element
		if query_vals["action"] == "updateTitle":
			pass
		elif  query_vals["action"] == "updateDev":
			pass
		elif  query_vals["action"] == "updatePlat":			
			pass
		elif  query_vals["action"] == "updateFranchise":
			pass

		# depending on the table, build query and search DB
		elif query_vals["action"] == "searchTitle":
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

		return jsonify(result)

# Listener
if __name__ == "__main__":
	port = int(os.environ.get('PORT', 4567))
	#                                 ^^^^
    #              You can replace this number with any valid port
	app.run(port=port, debug=True)


def execute_addTitle(db_connection, query_vals):
	# query_vals = {"titleName", "titlePlatIDs", "titleRelease", "titleGenre", "titleFranchiseID", "titleDevID", "titleESRB"}
	
	# build query and parameters
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

	try:
		execute_query(db_connection, query, params)
	except:
		return {"result": 0}
	else:
		for platformID in query_vals["titlePlatIDs"]:
			params = (query_vals["titleName"], platformID)
			query = "INSERT INTO `TitlesPlatforms` (titleID, platformID)"
			query += " VALUES ((SELECT t.titleID FROM VideoGameTitles AS t WHERE t.titleName = %s), %s);"
			execute_query(db_connection, query, params)
	
	return {"result": 1}

def execute_addDev(db_connection, query_vals):
	# query_vals = { "devName", "devCountry", "devDate"}

	# build query
	params = (query_vals["devName"], query_vals["devCountry"], query_vals ["devDate"])
	query = "INSERT INTO `DevelopmentStudios` (developerName, developerCountry, developerFounded) VALUES (%s, %s, %s);"
	
	try:
		result = execute_query(db_connection, query, params)
	except:
		return {"result": 0}
	else:
		return {"result": 1}

def execute_addPlat(db_connection, query_vals):
	# query_vals = {"platName", "platDate", "platDev", "platInProd"}

	# build query
	params = (query_vals["platName"], query_vals["platDate"], query_vals["platDev"], str(query_vals["platInProd"]))
	query = "INSERT INTO `Platforms` (platformName, platformRelease, platformDeveloper, platformInProduction) VALUES (%s, %s, %s, %s);"
	
	try:
		result = execute_query(db_connection, query, params)
	except:
		return {"result": 0}
	else:
		return {"result": 1}

def execute_addFranchise(db_connection, query_vals):
	# query_vals = {"franchiseName", "franchiseDev"}

	# build query
	params = (query_vals["franchiseName"], query_vals["franchiseDev"])
	query = "INSERT INTO `Franchises` (franchiseName, franchiseDeveloper) VALUES (%s, %s);"
	
	try:
		result = execute_query(db_connection, query, params)
	except:
		return {"result": 0}
	else:
		return {"result": 1}

def build_query_searchTitle(query_vals):
	# query_vals = {"titleName", "titlePlatIDs", "titleRelease", "titleGenre", "titleFranchise", "titleDev", "titleESRB"}

	# getting an error trying to format t.titleRelease date
	# DATE_FORMAT(t.titleRelease, '%Y-%m-%d') AS t.titleRelease
	query = "SELECT t.titleID, t.titleName, t.titleRelease, t.titleGenre, f.franchiseName, d.developerName, t.titleESRB FROM `VideoGameTitles` AS t "
	query += "LEFT JOIN `DevelopmentStudios` AS d ON t.titleDeveloperID = d.developerID "
	query += "LEFT JOIN `Franchises` AS f ON t.titlefranchiseID = f.franchiseID"
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

def add_titles_platforms(titles_result):
	new_title_res = ()
	# for each title going in the table
	for title_info in titles_result:
		# get all the platforms for a given titleID
		titlesPlats_query = "SELECT p.platformName as Platform FROM `TitlesPlatforms` as tp "
		titlesPlats_query += "JOIN `VideoGameTitles` as t ON tp.titleID = t.titleID "
		titlesPlats_query += "JOIN `Platforms` as p ON tp.platformID = p.platformID "
		titlesPlats_query += "WHERE t.titleID = %s"
		titlesPlats_params = (title_info[0])
		titles_Plats = execute_query(db_connection, titlesPlats_query, titlesPlats_params).fetchall()

		# form a tuple of all the platforms for a given title
		plat_tuple = ()
		for plat in titles_Plats:
			plat_tuple += (plat[0],)

		# add tuple of platforms into the new title_info tuple
		new_title = title_info + (plat_tuple,)
		new_title_res += (new_title,)

	return new_title_res

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
