from flask import Flask, render_template, request
from db_connector import connect_to_database, execute_query
import os


# Configuration

app = Flask(__name__)

# Routes

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
		# get filter parameters from POST request

		# render with filtered results
		return render_template("main.j2")

@app.route('/add', methods=['GET', 'POST'])
def add():
	db_connection = connect_to_database()
    return render_template("add_element.j2")

@app.route('/delete', methods=['GET', 'POST'])
def delete():
	db_connection = connect_to_database()
    return render_template("del_element.j2")

@app.route('/update', methods=['GET', 'POST'])
def update():
	db_connection = connect_to_database()
    return render_template("update_element.j2")

# Listener

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 9112))
    #                                 ^^^^
    #              You can replace this number with any valid port

    app.run(port=port, debug=True)


