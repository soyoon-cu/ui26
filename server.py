from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

name = "Lisa"

@app.route('/')
def landing():
   return render_template('landing.html')

@app.route('/home/<name>')
def home(name=None):
    return render_template('home.html', name=name) 

if __name__ == '__main__':
   app.run(debug = True)