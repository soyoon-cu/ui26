from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json

app = Flask(__name__)

name = "Lisa"

@app.route('/')
def landing():
   return render_template('landing.html')

@app.route('/home')
def home(name=None):
    return render_template('home.html', name=name) 
 
@app.route('/career-categories')
def careerCategories():
    return "Career Categories page" 
 
@app.route('/sharing')
def sharing():
    return "Upload alum story page" 
 
@app.route('/contact-us')
def contactUs():
    return "Contact Us page" 

@app.route('/create-student-profile', methods=['GET', 'POST'])
def create_student_profile():
   if request.method == 'POST':
      form_data = request.get_json()
      print("Received form data:", form_data)

      return jsonify({"message": "Profile submitted successfully!"})

   return render_template('createStudentProfile.html')

@app.route('/create-alum-profile', methods=['GET', 'POST'])
def create_alum_profile():
   return "Create alum profile page"

@app.route('/login', methods=['GET', 'POST'])
def login():
   return "login page"


@app.route('/alumni_info/<id>', methods=['GET'])
def get_alumni_info(id):
    alumni = next((alum for alum in alumni_info if alum['id'] == int(id)), None)
    if alumni:
        return jsonify(alumni)
    else:
        return jsonify({"error": "Alumni not found"}), 404


with open("static/alum_info.json", "r") as file:
    alumni_info = json.load(file)
@app.route('/questionnaire/<id>', methods=['GET', 'POST'])
def questionnaire(id):
    if request.method == 'GET':
        return render_template('questionnaire.html')

    elif request.method == 'POST':
        # Handle the submission of questionnaire data for the POST request
        data = request.json
        with open("questionnaire_data.json", "a") as file:
            json.dump(data, file)
            file.write("\n")
        return jsonify({"message": "Questionnaire submitted successfully!"}), 200

if __name__ == '__main__':
   app.run(debug = True)