from flask import Flask, render_template
import os


# Configuration

app = Flask(__name__)


# Routes

@app.route('/')
def root():
    return render_template("main.j2")

@app.route('/add')
def add():
    return render_template("add_element.j2")

@app.route('/delete')
def delete():
    return render_template("del_element.j2")

# Listener

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 9112))
    #                                 ^^^^
    #              You can replace this number with any valid port

    app.run(port=port, debug=True)


