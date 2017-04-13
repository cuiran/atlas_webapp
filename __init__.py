import json
import os
import uuid

from flask import Flask
from flask import render_template
from flask import request

import background_process.convert_input as atin
import background_process.run_atlas as runat
import background_process.parse as parse

app = Flask(__name__)

# set atlas directory"
atlas_dir = "/Users/rancui/Math/atlas_project/software/atlasofliegroups/"
#atlas_dir = "/home/ran/atlas_project/latest/atlasofliegroups/"
#atlas_dir = "/Users/richard.rast/atlas/atlasofliegroups/"
#atlas_dir = "/home/cuiran/atlas_software/atlasofliegroups/"

@app.route("/", methods=['GET', 'POST'])
def main_page():
	return render_template('main.html')

@app.route("/runatlas", methods=['GET','POST'])
def atlas_process():
    user_input = json.loads(request.data)
    atlas_input = atin.get_atlasinput(user_input)
    atlas_output = runat.get_atlas_output(atlas_input,atlas_dir)
    parsed_out = parse.parse_output(user_input,atlas_output)
    return json.dumps(parsed_out)


if __name__ == "__main__":
    app.run(debug=True)
