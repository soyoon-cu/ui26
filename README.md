# ui26

"static_html" folder holds the initial .html and .css files for the pages (for development purposes only).

"static" folder holds .html and .js files.
"templates" folder holds .css files.

Implemented pages:
- Landing Page (/)
- Create student profile (/create-student-profile)
- Home Screen (/home)
- Career Categories (/career-categories)
- Profile List (/profile_list/[category]) </br>
    [category] is one of the following: all, graduate-eudcation, finance, consulting, tech, public sector
- Profile Page (/profile/[id])
- Questionnaire Page (/questionnaire/[id])

Code Instruction:</br>
Open the `ui26` folder on VSCode.</br>
</br>
If Python is not installed, install Python and add it to PATH variable first.</br>
Then, if Flask is not installed, run `pip install flask` on git bash.</br>
</br>
In the terminal, run `python server.py`</br>
Load the link in a web browser. (Typically http://127.0.0.1:5000)