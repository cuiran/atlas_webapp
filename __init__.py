from flask import Flask
from flask import render_template
app = Flask(__name__)
import subprocess

# set atlas directory
atlas_dir = "/home/ran/atlas_project/latest/atlasofliegroups/"

@app.route("/")
def main_page():
    cmd = ["../atlas"]
    p = subprocess.Popen(cmd, cwd=atlas_dir+"atlas-scripts", stdout = subprocess.PIPE,stderr=subprocess.PIPE,stdin=subprocess.PIPE)
    output,err = p.communicate()
    return render_template("main.html", out=output)

@app.route('/hello')
def hello():
    return 'Hello, World'

if __name__ == "__main__":
    app.run()
