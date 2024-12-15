from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
import os

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
    return render_template('careerCategories.html', name=name)  
 
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

with open('static/alum_info.json') as f:
    alumni_info = json.load(f)

@app.route('/alumni_info/<id>', methods=['GET'])
def get_alumni_info(id):
    alumni = next((alum for alum in alumni_info if alum['id'] == int(id)), None)
    if alumni:
        return jsonify(alumni)
    else:
        return jsonify({"error": "Alumni not found"}), 404

@app.route('/questionnaire/<id>', methods=['GET', 'POST'])
def questionnaire(id):
    if request.method == 'GET':
        return render_template('questionnaire.html')

    elif request.method == 'POST':
        data = request.json

        file_path = "static/questionnaire_data.json"

        if os.path.exists(file_path):
            with open(file_path, "r") as file:
                try:
                    all_data = json.load(file)
                except json.JSONDecodeError:
                    all_data = []
        else:
            all_data = []

        all_data.append(data)

        with open(file_path, "w") as file:
            json.dump(all_data, file, indent=4)

        return jsonify({"message": "Questionnaire submitted successfully!"}), 200

@app.route("/profile_list/<category>")
def profile_list(category):
    return render_template("profileList.html", category=category)

@app.route("/api/profiles")
def get_profiles():
    return jsonify(questionnaire_data)

def load_questionnaire_data():
    with open("static/questionnaire_data.json", "r") as file:
        return json.load(file)

@app.route('/questionnaire_data/<id>', methods=['GET'])
def get_questionnaire_data(id):
    data = load_questionnaire_data()
    result = next((item for item in data if str(item["id"]) == id), None)
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "Data not found"}), 404

@app.route('/profile/<id>', methods=['GET'])
def profile(id):
    return render_template('profile.html')


if __name__ == '__main__':
   app.run(debug = True)