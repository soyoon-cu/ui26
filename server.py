from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
   return 'Hello, World!'

@app.route('/create-student-profile', methods=['GET', 'POST'])
def create_student_profile():
   if request.method == 'POST':
      form_data = request.get_json()
      print("Received form data:", form_data)

      return jsonify({"message": "Profile submitted successfully!"})

   return render_template('createStudentProfile.html')

if __name__ == '__main__':
   app.run(debug = True)