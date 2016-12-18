from flask import Flask
from flask import render_template
from flask import request
from functions import *
app = Flask(__name__)
import subprocess

from random import randint

# set atlas directory
atlas_dir = "/home/ran/atlas_project/latest/atlasofliegroups/"



@app.route("/", methods=['GET','POST'])
def main_page():
    cmd = ["../atlas all"]
    p = subprocess.Popen(cmd, cwd=atlas_dir+"atlas-scripts", shell=True, universal_newlines=True, stdout = subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
    usr_request = str(request.form.get("first_options"))
    rand_int = str(randint(0, 1000)) # attach random integer to the file name generated by input_to_at
    modified_input = input_to_at(usr_request, rand_int)
    feed_to_atlas = "<"+"\""+str(os.getcwd())+"/inputs/"+"input_file.at"+"\"" # this is currently not in use
    tmp_input = "<\"/tmp/input_file_"+rand_int+".at\""
    output,err = p.communicate(input=tmp_input)
    subprocess.call("rm /tmp/input_file_"+rand_int+".at", shell=True)
    return render_template("main.html", selected = usr_request.split('\\n')[0], atlas_input=modified_input, atlas_output=trim_output(output)+'\n'+err)


@app.route('/bootstrap')
def bs():
    return render_template("bootstrap.html")

if __name__ == "__main__":
    app.run(debug=True)
