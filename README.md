# Movies Project – MERN Stack
The project, movies reviewing site, is on the MERN stack. It makes use of the following:
* FlixGo Bootstrap template (front-end)
* ExpressJS (middleware, static files and routing) 
* NodeJS (server)
* MongoDB (DB)
* Handlebars (front-end templating engine)
* jQuery (AJAX)

Remember, app.js is the entry point of the website

### Features
The web app offers several features. 

* The movies are added by the admins (ONLY), and you, as a user, can search those movies and leave your thoughts about them after signing in
* If you want to leave remarks about a movie but it has not been added yet, you can log a request with the admins to add that movie, so that you can rate and review it later
* You can also like or dislike other people's thoughts and comments on the movie and, therefore, express yourself more openly. However, there is no way you can directly reply to somebody's thoughts

### Timeline
This is the biggest and the most extensive end-to-end full-stack project that I have ever managed single-handedly

It took me over five months to learn the components of the MERN stack (JavaScript, MongoDB, ExpressJS, ReactJS, NodeJS & Handlebars) individually, one after another. Afterwards, it took me around two months to implement this project from scratch with 6-8 hours of work everyday. The project was implemented in the summer break, 2021, when I was a rising finaly-year computer science & software engineering student at Lahore University of Management Sciences (LUMS)

### How to Run the Project Locally?
You can download all the source code from here. Also, the entire DB has also been exported as placed here for the public. The project can be run locally on the port 64, 000 by running the following command: 
``` bash
  nodejs app.js
```
Afterwards, you can simply type this in your browser to run the project: 
``` bash
  localhost:64000/home
```

Remember, you need to have NodeJS, ExpressJS, and MongoDB installed in your system. Else, you will not be able to run the project

### Database Integration
For public use, the whole databse has been exported (other than those that MUST not be provided to the publicly) and provided in the repository in JSON format. Navigate here to access the whole database:

```bash
  mongodb/DB
```

You need to have MongoDB set-up on your computer system. Then, you can easily create a database, called *moviesProject* and add all the collections in it. Now, it will be connected when you run the following command in the terminal:

```bash
  mongod
```

Remember, before you run *nodejs app.js* command, you need to run the *mongod* command. Otherwise, the application will give you errors, as connection with MongoDB server will not be established successfully from our application

# Project Implementation & Navigation Guide – Complete Documentation
The purpose of this document is to help the readers of my code understand what on earth I have
written and, most importantly, how I have gone around writing it

### Overview
The project, movies reviewing site, is on the MERN stack. The project uses bootstrap (frontend), ExpressJS (middleware), NodeJS (server) and MongoDB (database). Moreover, a templating engine, called handlebars, has also been used (which introduces all the complexity in the project and compels me to document it in the first place)

Remember, app.js is the entry point for the project

### ExpressJS – Serving Static Files
This part is very easy; using ExpressJS framework, we serve the bootstrap files. The basic syntax
used is: 
```javascript
  app.use('/css', express.static('./public/home/css'));
```
 for the home and 
 ```javascript
  app.use('/css', express.static('./public/admin/css'));
```
for the admin. Hence, we created a middleware and served
all the files (css, js, img, icon and fonts) statically

Be noted that the middleware adds request for these files (in the request object) and then sends
that request to the server for these static files, and the files get served automatically. You don't
have to arrange any paths or anything else. Just put all the template files (js, fonts, css, img, icon)
in /public/admin and in /public/home

At one point, the static files were not being served. This consistently happened for all sub-routes
on a main route. For example, after going to 
```bash
  localhost:64000/admin
```
and
```bash
  localhost:64000/home
```
files are served perfectly. But on the sub-routes, like 
```bash
  localhost:64000/admin/view-reviews
```
and
```bash
  localhost:64000/admin/add-genre
```
static files were not served. All you have to do here is add
absolute path (not relative) request to the server. You do this by prepending just one, single
forward slash ("/") to the lines, like 
```html
  <script src = "js/main/jquery.3.5.min)>
```
so that they
become
```html
  <script src = "/js/main/jquery.3.5.min)>
```
Moreover, you do the same to the CSS file
requests in the href of the same files (in the head of the html)

### ExpressJS – Managing Routes
This one is relatively trickier but not so much. The complexity here is added by both ExpressJS
as well as handlebars

Using ExpressJS, we make sure that home and admin routes are managed separately in separate
files at 
```bash
  routes/admin/main.js
```
and
```bash
  routes/home/main.js
```
by the help of Express router that can
be included by writing
```javascript
  express.Router()
```
It is also exported from those files
Handlebars is a little tricky. The following points must be kept in mind while using handlebars

  • Views – Handlebars framework always looks (by default) into views directory. So, we
create that at first. Inside there, we have layouts directory (use exact same name), partials
directory (use exact same name), admin directory and the home directory

  • Layouts – Handlebars framework makes you create layouts. When creating routes, on
top of all the route files (app.js, routes/admin/main.js and routes/home/mian.js), you
have to inform what the default layout of all the routes (that follow in this file) is going to
be. That layout is basically the code that will be hardcoded to all the files that are set up
on this route
For example, in the home side of the projects, all the files inherit navigation and footer.
This is because navigation and footer are set-up in views/layouts/indexhome.handlebars. In this file, where you see 
```handlebars
  
{{> *file-name*}}
```
means that handlebars
should peek into
```handlebars
  views/partials/file-name
```
and include that file’s code here (navigation
code / footer code etc.). Whereas, if you see 
```handlebars
{{{ body }}}
```
in this file, it means that
handlebars should not hardcode anything here (like footer or navigation) from some file,
rather code will be added here dynamically (as we will serve the file when somebody
comes on this route). Hence, to add code dynamically in place of
```handlebars
{{{ body }}}
```
we
simply serve some file on this route
For example, on
```bash
  localhost:64000/home
```
we render page-content.handlebars file from
```bash
  views/home/page-content
```
and on
```bash
  localhost:64000/faq
```
we render faq.handlebars file from 
```bash
  views/home/faq
```
The content dynamically rendererd on these files will be added
in place of {{{ body }}} of the layouts file
Remember, the main file of the template (index.html) has to set-up in views/layouts
folder for the admin as well as for the home

  • Partials – These are the code snippets that you want to include (hardcode) in every file
on a specific route. For example,
```bash
  views/partials/admin-sidebar.handlebars
```
is added to
all the files of the admin/ route

### ExpressJS & Handlebars – Parameters to res.render( )
Parameters refer to the same thing as they do in React-Native: while moving from one “screen”
to another, you simply pass some data in JSON format so that it can be accessed in the other file.
Whatever we pass in parameters can be displayed easily using:
``` handlebars
  {{ *something* }}
```
in the other
file. In case it is an array, you can also run a loop in handlebars to go over all the values. 
```handlebars
  {{#each data}} 
    *display data here* 
   {{/each}}
```
can be used to use a for loop. Similary, conditional
statements can also be used in handlebars using: 
```handlebars
{{#if}} 
  *something* 
{{/if}}
```

### JavaScript & Handlebars – Helper Functions
Helper functions, set in helpers directory, are JavaScript functions that are exported from a file
and imported in the server-containing file (app.js) and added to the following function:
```javascript
  app.set('view engine', 'handlebars'); // tell NodeJS what is your templating engine (express-handlebars)
app.engine('handlebars', handlebarsEngine({
    defaultLayout: 'index-home',
    helpers: {
        select: select, 
        select2: select2, 
        forOtherImagesofViewMovies: forOtherImagesofViewMovies,
        forEditMovies: forEditMovies,
        genreForMovieDetails: genreForMovieDetails,
        moviePhotoRequest: moviePhotoRequest, 
        countPhotos: countPhotos, 
        visibilityStatus: visibilityStatus,
        generateHomeGenreNamesDynamicallyforNonMobile: generateHomeGenreNamesDynamicallyforNonMobile,
        generateHomeGenreNamesDynamicallyforMobile: generateHomeGenreNamesDynamicallyforMobile,
        generateHomeMoviesDynamically: generateHomeMoviesDynamically,
        dateHelper: dateHelper,
        movieRating: movieRating,
        createFullName: createFullName,
    }
}));
```
These functions allow us to add more functionality (logic, basically) in handlebars which it does
not have already, as handlebars closely resembles HTML which itself is not a programming /
scripting language in the first place

For example, in order to read values from an array inside a handlebars for loop (nested loop), we
have to depend on these external helper functions, as nested loop gives issues in handlebars

### Handlebars – lean( ) for Unprotected Prototype Access
Sometimes, for security reasons, handlebars does not display data coming in as a parameter.
Now, we have to add a “lean()” method before writing the “then()” handler, and the issue gets
resolved. 
```javascript
  MongooseSchema.findOne( {_id: ObjectID(*something*)} ).lean()
  .then( (success) => {
    *something* 
   }).catch( (error) => {
    *something*
   });
```
There is a longer, tedious work-around as well (that requires installing modules) which
I obviously did not follow

This workaround allows us to access unprotected prototype. This can cause malicious code to be
run on the server. But if we are 100% sure that we and we alone are writing code, then we can
use this method to overcome the restriction that handlebars has put there for users

On the other hand, if we are taking code from our user and executing it in the server (which we
are not doing), then we should never enable unprotected prototype access using this method,
because then there will be issues and security vulnerabilities that we do not want

### Uploading Files – Images and More (express-fileupload)
In order to upload files, a separate module has been used and set-up in server (app.js). It adds to
the incoming request object the functionality to access files, and the files can be accessed later
using
```javascript
  req.files.*object name*
```
in the specific route

### ExpressJS & Handlebars – Flash Messages (connect-flash)
Here, we have installed a module for sending flash messages. Flash messages are the messages
that are sent to a specific page after a user is redirected to it. For example, after updating the
movie, you take your user to the /admin/movies/view-all-movies route. Here, you need to
display confirmation messages for the movie being updated successfully. So, you take help from
flash messages 

Here, we have to set the flash() method in our middleware, like: 
```javascript
  app.use( (req, res, next) => {
    res.locals.flashMessageName = req.flash('flashMessageName');
    
    next();
  });
```
Notice, we have to add flash
message to the outgoing response object (as the middleware has access to the incoming request
object as well as the outgoing response object). Finally, on the specific route from where we want to send the flash message,
we have to write this where we are about to redirect from after successfully doing business with the MongoDB:
```javascript
  req.flash(‘flash-message-name', ‘flash-message-content’);
```
Now, this
message can be displayed in handlebars file using:
```handlebars
  {{ *flash-message-name* }}
```
  
### ExpressJS – Method Overriding for .put( ) & .delete( ) requests (method-override)
Method overriding has also been implemented for the sake of accessing router.put() and router.delete() methods. For this, you have to install a module, viz. method-override and set it up in middleware, like this:
```javascript
  app.use( (req, res, next) => {
    if (req.query._method == 'DELETE')
        req.method = 'DELETE';
    else if (req.query._method == 'PUT') 
        req.method = 'PUT';
    next(); 
});

```
Afterwards, whenvever you send a request, you add the following code at the end of the href URL or the form action URL:
```html
  "_?method=DELETE" or "_?method=PUT"
```
That's it

It is highly recommended that you follow good coding practices by using .put( ) and .delete( ) for updating and deleting (respectively) instead of .get( ) and .post( ) request methods

### Sessions & Cookies for State Management (express-session + connect-mongo)
We have also used express-session as well as connect-mongo for the sake of managing sessions on the server-side and cookies on the front-end. The combination of sessions and cookies allows us manage
signed in users as well as protect admin pages from unautharized access
