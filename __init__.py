import json
import os
import uuid

from flask import Flask
from flask import render_template
from flask import request

from functions import *
from queries import process_input, check_query_status

app = Flask(__name__)

# set atlas directory
atlas_dir = "/home/ran/atlas_project/latest/atlasofliegroups/"
#atlas_dir = "/Users/richard.rast/atlas/atlasofliegroups/"
#atlas_dir = "/home/cuiran/atlas_software/atlasofliegroups/"

@app.route("/", methods=['GET', 'POST'])
def main_page():
	return render_template('main.html')

@app.route("/newquery", methods=['POST'])
def get_queried():
    user_input = json.loads(request.data)
    print(user_input)
    user_input = to_atlas_input(user_input)
    query_id = process_input(user_input, atlas_dir)
    output = {
        'query_id': query_id
    }
    return json.dumps(output)


@app.route("/checkquery", methods=['GET','POST'])
def check_on_query():
    query_id = json.loads(request.data)["query_id"]
    status, output, err = check_query_status(query_id)

    response = {
        'status': status,
        'output': output,
        'error': err
    }

    return json.dumps(response)


if __name__ == "__main__":
    app.run(debug=True)
