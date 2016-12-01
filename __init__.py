from flask import Flask
from flask import render_template
from flask import request
from functions import *
app = Flask(__name__)
import subprocess

# set atlas directory
atlas_dir = "/home/ran/atlas_project/latest/atlasofliegroups/"



@app.route("/", methods=['GET','POST'])
def main_page():
    cmd = ["../atlas"]
    p = subprocess.Popen(cmd, cwd=atlas_dir+"atlas-scripts", stdout = subprocess.PIPE,stderr=subprocess.PIPE,stdin=subprocess.PIPE)
    usr_request = str(request.form.get("first_options"))
    modified_input = input_to_at(usr_request)
    feed_to_atlas = "<"+"\""+str(os.getcwd())+"/"+"input_file.at"+"\""
    output,err = p.communicate(input=feed_to_atlas)
    return render_template("main.html", atlas_input=modified_input, atlas_output=trim_output(output)+'\n'+err)

@app.route('/hello')
def hello():
    return 'Hello, World'

if __name__ == "__main__":
    app.run(debug=True)
