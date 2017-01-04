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
	return render_template(
		"main.html",
		selected="selected",
		atlas_input = "atlas_input",
		atlas_output = "atlas_output")

@app.route("/getCartan", methods=['GET','POST'])
def get_Cartan():
	data=request.data
	data_dict = json.loads(request.data)
	rank = data_dict["rank"]
	group = data_dict["group"]
	atlas_input = (
		"set n="+rank+"\n"+
		"set G="+group+"\n"+
		"set cartans=Cartan_classes(G)\n"+
		"for i : nr_of_Cartan_classes (G) from 0 do print(\"Cartan number \"+ i); print_Cartan_info (cartans[i]) od")
	[output,err]=run_atlas(atlas_input)
	output_json = json.dumps(output)
	out_file = open("test/Cartans/"+group+"_"+rank+".json","w")
	out_file.write(output_json)
	out_file.close()
	return output_json
	

@app.route("/newquery", methods=['POST'])
def get_queried():
    user_input = str(request.form.get('query'))
    query_id = process_input(user_input, atlas_dir)
    output = {
        'query_id': query_id
    }
    return json.dumps(output)


@app.route("/checkquery", methods=['GET'])
def check_on_query():
    query_id = str(request.args.get('query_id'))
    status, output, err = check_query_status(query_id)

    response = {
        'status': status,
        'output': output,
        'error': err
    }

    return json.dumps(response)

#@app.route("/runatlas", methods=['GET', 'POST'])
#def run_atlas():
#    cmd = ["../atlas all"]
#    p = subprocess.Popen(cmd,
#                         cwd=atlas_dir+"atlas-scripts",
#                         shell=True,
#                         universal_newlines=True,
#                         stdout=subprocess.PIPE,
#                         stderr=subprocess.PIPE,
#                         stdin=subprocess.PIPE)
#	
#    selected = "some"
#    usr_request = str(request.form.get("first_options"))
#    random_id = str(uuid.uuid4())  # attach random str to the file name generated by input_to_at
#    modified_input = input_to_at("set G ="+selected, random_id)
#    feed_to_atlas = "<"+"\""+str(os.getcwd())+"/inputs/"+"input_file.at"+"\""  # this is currently not in use
#    tmp_input = "<\"/tmp/input_file_"+random_id+".at\""
#    output, err = p.communicate(input="set n=2 \n set G="+selected)
#    print(output, err)
#    subprocess.call("rm /tmp/input_file_"+random_id+".at", shell=True)
#    return render_template("main.html",
#                           selected=usr_request.split('\\n')[0],
#                           atlas_input=selected,
#                           atlas_output=trim_output(output))


if __name__ == "__main__":
    app.run(debug=True)
