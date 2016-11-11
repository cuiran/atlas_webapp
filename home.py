from flask import Flask, request
from flask import render_template
app = Flask(__name__)

@app.route('/')
def hello():
    if request.args.get("user")==None:
        name = "Stranger"
    else:
        name = request.args.get("user")

    if request.args.get("number1")==None or request.args.get("number2")==None:
        return render_template("hello.html",user=name,Sum="")
    else:
        number1 = int(request.args.get("number1"))
        number2 = int(request.args.get("number2"))
        sum_of_two = number1+number2
        return render_template("hello.html", user=name, Sum=sum_of_two, n1=number1, n2=number2)

@app.route('/fancy_app')
def hello_world():
    return render_template(
        "fancy_app.html",
        numbers=range(1,101),
        fizz=request.args.get("fizz", "Fizz"),
        buzz=request.args.get("buzz", 'Buzz')
    )

#bootstrap
@app.route('/bootstrap')
def bs():
    return render_template("bootstrap.html")

# @app.route('/add')
# def add():
#     number1=int(request.args.get("number1"))
#     number2=int(request.args.get("number2"))
#     return str(number1+number2)


if __name__ == '__main__':
    app.run(debug=True)

