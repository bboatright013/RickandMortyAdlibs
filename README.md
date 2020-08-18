# Rick and Morty api Adlib application

## The Short Version

### Technologies Used

-Flask
-SQLAlchemy
-WTForms
-Bcrypt
-Jinja
-HTML
-CSS
-Bootstrap
-Javascript
-Axios

### The Long version

This application cmopletes the first capstone project of Springboard Software Engineering bootcamp. The assignment
challenges the student to utilize a third party api and build an application with a database. I chose the Rick and Morty API
for its uniqueness and its well written documentation. As a database driven website I began with flask/python to stand up the project in a virtual environment.
Next I outlined the database schema and built the models and forms associated with WTForms and SQLAlchemy. Next I implemented bcrypt for securing the user environment. Meanwhile, each page's template began to take ship with the use of Jinja, Bootstrap and my own CSS and HTML designs. At this point I leaned into axios and using asynchronous javascript functions and heavy dom manipulation to populate the several of the templates and get the most I could from the Rick and Morty API. Finally I added some features to improve the user flow as well as quality of life. While there is more opportunity to improve on this basic Madlibs spinoff it represents a full body of work sufficient of the assignments requirements

### User Flow

The user is expected to land on the home page where they will find directions for how to create an adlib.
The user can choose to explore the database on its own as well or they can continue the flow by adding 5 characters to the roster.
Once the user "locks in" their team they are met with a pop up modal that links them to the choice of adlib templates to choose from.
Once the user fills out the form they are directed to the results page where the template uses their characters and word choices to create a funny story unique to them.
If the user likes it then can save it and revisit again and again on their profile page.

