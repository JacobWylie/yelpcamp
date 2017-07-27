<h1>Campground Reviews</h1>
<p>A platform to share and discuss camping grounds. All information uploaded and shared by user accounts. Preview coming soon...</p>
<h5>Technologies Utilized</h5>
<img src="http://i.imgur.com/3gSRLVj.png">
<img src="http://i.imgur.com/486zTVe.jpg">
<img src="http://i.imgur.com/sMfsjle.jpg">
<img src="https://coursework.vschool.io/content/images/2015/11/mongoosejs.png">
<img src="https://camo.githubusercontent.com/662ee2f98b69b0894d0a1d9117a9c5fb4dfc40aa/687474703a2f2f63646e2e61757468302e636f6d2f696d672f70617373706f72742d62616e6e65722d6769746875622e706e67">
<img src="http://i.imgur.com/nrnczLC.jpg">
<br>

<h3>Initial Setup</h3>

Add Landing Page
Add Campgrounds Page that lists all campgrounds
Each Campground has:

Name
Image

<h3>Layout and Basic Styling</h3>

Create our header and footer partials
Add in Bootstrap

<h3>Creating New Campgrounds</h3>

Setup new campground POST route
Add in body-parser
Setup route to show form
Add basic unstyled form

<h3>Style the campgrounds page</h3>

Add a better header/title
Make campgrounds display in a grid

<h3>Style the Navbar and Form</h3>

Add a navbar to all templates
Style the new campground form

<h3>Add Mongoose</h3>

Install and configure Mongoose
Setup campground model
Use campground model inside of our routes

<h3>Show Page</h3>

Review the RESTful routes we've seen so far
Add description to our campground model
Show db.collection.drop()
Add a show route/template

<h3>Refactor Mongoose Code</h3>

Create a models directory
Use module.exports
Require everything correctly!

<h3>Add Seeds File</h3>

Add a seeds.js file
Run the seeds file every time the server starts

<h3>Add the Comment model!</h3></h3>

Make our errors go away!
Display comments on campground show page

<h3>Comment New/Create</h3>

Discuss nested routes
Add the comment new and create routes
Add the new comment form

<h3>Style Show Page</h3>

Add sidebar to show page
Display comments nicely

<h3>Finish Styling Show Page</h3>

Add public directory
Add custom stylesheet

<h3>Auth Pt. 1 - Add User Model</h3>

Install all packages needed for auth
Define User model

<h3>Auth Pt. 2 - Register</h3>

Configure Passport
Add register routes
Add register template

<h3>Auth Pt. 3 - Login</h3>

Add login routes
Add login template

<h3>Auth Pt. 4 - Logout/Navbar</h3>

Add logout route
Prevent user from adding a comment if not signed in
Add links to navbar

<h3>Auth Pt. 5 - Show/Hide Links</h3>

Show/hide auth links in navbar

<h3>Refactor The Routes</h3>

Use Express router to reoragnize all routes

<h3>Users + Comments</h3>

Associate users and comments
Save author's name to a comment automatically

<h3>Users + Campgrounds</h3>

Prevent an unauthenticated user from creating a campground
Save username+id to newly created campground
RESTFUL ROUTES

<h3>name | url | verb | desc.</h3>

INDEX | /dogs | GET | Display a list of all dogs <br> 
NEW | /dogs/new | GET | Displays form to make a new dog <br> 
CREATE | /dogs | POST | Add new dog to DB <br>
SHOW | /dogs/:id | GET | Shows info about one dog <br>

<br>
INDEX | /campgrounds <br>
NEW | /campgrounds/new <br>
CREATE | /campgrounds <br>
SHOW | /campgrounds/:id <br>
NEW | campgrounds/:id/comments/new <br>
CREATE campgrounds/:id/comments <br>