from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route("/")
#def hello():
#    return "Hello, I'm developing atlas webapp using Flask!"
def main_page():
    return render_template("main.html")

if __name__ == "__main__":
    app.run()
