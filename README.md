<h1>Campground Reviews</h1>
A platform to share and discuss camping grounds. All information uploaded and shared by user accounts. Preview coming soon...
<h2>Technologies Utilized</h2>
<img src="http://i.imgur.com/3gSRLVj.png">
<img src="http://i.imgur.com/486zTVe.jpg">
<img src="http://imgur.com/eOGFLTl.png">
<img src="http://i.imgur.com/sMfsjle.jpg">
<img src="http://i.imgur.com/nwNhE5F.png">
<img src="http://i.imgur.com/nrnczLC.jpg">
<br>

<h2>Install and Use</h2>

Clone repo

```

git clone https://github.com/JacobWylie/yelpcamp.git

```

Install modules and run app

```

npm init
npm start

```


<h2>Set your server's process.env variables</h2>
<h3>OSX / Unix Terminal</h3>

Set the database URL that your app will connect to. The app will connect to a public database if you do not specify your own

```

$ export DATABASEURL="your-databaseURL"

```

Name your database to notify you in the console when app is running

```

$ export DATABASENAME="your-database-name"

```

Set your preferred port number. The Default port is set to 3000

```

$ export PORT="whichever-port-number-you-like"

```

Set the admin password for a user to sign up with admin priviledges

```

$ export ADMINCODE="your-secret-code"

```
<h3>Windows</h3>

Set the database URL that your app will connect to. The app will connect to a public database if you do not specify your own

```

$ SET DATABASEURL="your-databaseURL"

```

Name your database to notify you in the console when app is running

```

$ SET DATABASENAME="your-database-name"

```

Set your preferred port number. The Default port is set to 3000

```

$ SET PORT="whichever-port-number-you-like"

```

Set the admin password for a user to sign up with admin priviledges

```

$ SET ADMINCODE="your-secret-code"

```

<h3>Initial Setup</h3>

<ul>
<li>Add Landing Page</li>
<li>Add Campgrounds Page that lists all campgrounds</li>
<li>Each Campground has:</li>
	<ol>
		<li>Name</li>
		<li>Image</li>
	</ol>
</ul>

<h3>Layout and Basic Styling</h3>

<li>Create our header and footer partials</li>
<li>Add in Bootstrap</li>

<h3>Creating New Campgrounds</h3>

<li>Setup new campground POST route</li>
<li>Add in body-parser</li>
<li>Setup route to show form</li>
<li>Add basic unstyled form</li>

<h3>Style the campgrounds page</h3>

<li>Add a better header/title</li>
<li>Make campgrounds display in a grid</li>

<h3>Style the Navbar and Form</h3>

<li>Add a navbar to all templates</li>
<li>Style the new campground form</li>

<h3>Add Mongoose</h3>

<li>Install and configure Mongoose</li>
<li>Setup campground model</li>
<li>Use campground model inside of our routes</li>

<h3>Show Page</h3>

<li>Review the RESTful routes we've seen so far</li>
<li>Add description to our campground model</li>
<li>Show db.collection.drop()</li>
<li>Add a show route/template</li>

<h3>Refactor Mongoose Code</h3>

<li>Create a models directory</li>
<li>Use module.exports</li>
<li>Require everything correctly!</li>

<h3>Add Seeds File</h3>

<li>Add a seeds.js file</li>
<li>Run the seeds file every time the server starts</li>

<h3>Add the Comment model!</h3></h3>

<li>Make our errors go away!</li>
<li>Display comments on campground show page</li>

<h3>Comment New/Create</h3>

<li>Discuss nested routes</li>
<li>Add the comment new and create routes</li>
<li>Add the new comment form</li>

<h3>Style Show Page</h3>

<li>Add sidebar to show page</li>
<li>Display comments nicely</li>

<h3>Finish Styling Show Page</h3>

<li>Add public directory</li>
<li>Add custom stylesheet</li>

<h3>Auth Pt. 1 - Add User Model</h3>

<li>Install all packages needed for auth</li>
<li>Define User model</li>

<h3>Auth Pt. 2 - Register</h3>

<li>Configure Passport</li>
<li>Add register routes</li>
<li>Add register template</li>

<h3>Auth Pt. 3 - Login</h3>

<li>Add login routes</li>
<li>Add login template</li>

<h3>Auth Pt. 4 - Logout/Navbar</h3>

<li>Add logout route</li>
<li>Prevent user from adding a comment if not signed in</li>
<li>Add links to navbar</li>

<h3>Auth Pt. 5 - Show/Hide Links</h3>

<li>Show/hide auth links in navbar</li>

<h3>Refactor The Routes</h3>

<li>Use Express router to reoragnize all routes</li>

<h3>Users + Comments</h3>

<li>Associate users and comments</li>
<li>Save author's name to a comment automatically</li>

<h3>Users + Campgrounds</h3>

<li>Prevent an unauthenticated user from creating a campground</li>
<li>Save username+id to newly created campground</li>

<h3>Editing Campgrounds</h3>

<li>Add Method-Override</li>
<li>Add Edit Route for Campgrounds</li>
<li>Add Link to Edit Page</li>
<li>Add Update Route</li>

<h3>Deleting Campgrounds</h3>

<li>Add Destroy Route</li>
<li>Add Delete button</li>

<h3>Authorization Part 1: Campgrounds</h3>

<li>User can only edit his/her campgrounds</li>
<li>User can only delete his/her campgrounds</li>
<li>Hide/Show edit and delete buttons</li>

<h3>Editing Comments</h3>

<li>Add Edit route for comments</li>
<li>Add Edit button</li>
<li>Add Update route</li>

<h3>Deleting Comments</h3>

<li>Add Destroy route</li>
<li>Add Delete button</li>

<h3>Authorization Part 2: Comments</h3>

<li>User can only edit his/her comments</li>
<li>User can only delete his/her comments</li>
<li>Hide/Show edit and delete buttons</li>
<li>Refactor Middleware</li>

<h3>Adding in Flash!</h3>

<li>Demo working version</li>
<li>Install and configure connect-flash</li>
<li>Add bootstrap alerts to header</li>

<h2>RESTFUL ROUTES</h2>

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