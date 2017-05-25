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
#atlas_dir = "/Users/rancui/Math/atlas_project/software/atlasofliegroups/"
#atlas_dir = "/home/ran/atlas_project/latest/atlasofliegroups/"
#atlas_dir = "/Users/richard.rast/atlas/atlasofliegroups/"
atlas_dir = "/usr/local/atlas/atlas/"

# perl scripts directory
#perl_scripts_dir="/Users/rancui/Math/atlas_project/atlas_webapp/perl_scripts/"
#perl_scripts_dir="/var/www/web_interface2/atlas_app/perl_scripts/"
perl_scripts_dir = "/var/www/web_interface/atlas_app/perl_scripts/"

@app.route("/", methods=['GET', 'POST'])
def main_page():
	return render_template('main.html')

@app.route("/runatlas", methods=['GET','POST'])
def atlas_process():
    user_input = json.loads(request.data)
    print(user_input)
    atlas_input = atin.get_atlasinput(user_input)
    atlas_output = runat.get_atlas_output(atlas_input,atlas_dir)
    if no_empty_value(user_input):
        parsed_out,_ = parse.perl_process(atlas_input,atlas_output,perl_scripts_dir)
    else:
        parsed_out = parse.parse_output(user_input,atlas_output)
    return json.dumps(parsed_out)

def no_empty_value(user_input):
    if all(value!="" for value in user_input.values()):
        if "further" in user_input.keys():
            if all(value!="" for value in user_input['further'].values()):
                return True
            else:
                return False
        else:
            return True
    else:
        return False

if __name__ == "__main__":
    app.run(debug=True)
