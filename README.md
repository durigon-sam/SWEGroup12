Welcome to project setup
I'm gonna walk through how to initialize your environment for the project. Everything is in one repository so we don't need to worry about separate things for frontend and backend.

If you don't already have it, install VSCode or IntelliJ. some helpful extensions for this will be
Extension Pack for Java
PostgreSQL
Live Share (microsoft)
HTML CSS Support
ESLint
ES7 + React
The pre-configured github stuff should work fine, that'll take a bit to set up

Software
Before you actually install the project files, theres a few things you need to do to make sure you have the right software. Here's what we need:
Java 17
Maven 3.8.7
npm 10.2.4
PostgreSQL 16.1
an account on Postman
Java Install
First you'll have to check what versions of java you have installed. This is usually a pain in the ass
Windows

type "java -version" in cmd and make sure it says "17.0._", last number doesn't matter. If it DOESN'T say this, download it here: https://www.oracle.com/java/technologies/downloads/#java17

If you have an old version of java, you'll need to either remove it when you download this one, or install a JVM Version Manager in order to switch versions.
Removing Java
hit windows key, type "environment variables", hit enter, click "environment variables" at bottom right, look for "JAVA_HOME" under System Variables, and edit this to be the path of your new java install

JVM Version Manager
https://github.com/shyiko/jabba
follow directions on page
 
Mac

You'll need to paste these 4 things in the terminal:
sudo rm -fr /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin
sudo rm -fr /Library/PreferencePanes/JavaControlPanel.prefPane
sudo rm -fr ~/Library/Application\ Support/Oracle/Java
rm -r ~/“Library/Application Support/Oracle/Java”

Then install the new version here: https://www.oracle.com/java/technologies/downloads/#java17

If you type "java -version" and the version number isn't 17, you'll need to edit your PATH.
type "nano $PATH" in terminal and edit the JAVA_HOME variable to the directory of your current java install (you can usually just change the number to whatever your current version is)
Maven
Download this zip file: https://dlcdn.apache.org/maven/maven-3/3.8.8/binaries/apache-maven-3.8.8-bin.zip
unpack and move the file wherever you want it to be (preferably not the downloads folder, through it in documents or something)
copy the directory path to the bin folder
Add the "bin" folder's path to the PATH environment variable
WINDOWS
hit windows key, type "environment variables", hit enter, click "environment variables" at bottom right, find PATH or path in the user system variables, click "edit" or double click, click add, name it maven, paste in the directory path of the bin folder from before.
MAC
open terminal, type export PATH="path-to-bin:$PATH" where path-to-bin is the path to your bin folder
you can type echo $path to verify that the directory is now on the path
NPM (node.js project manager)
This is used to run the frontend project in React
download here: https://nodejs.org/en/download/
 
PostgreSQL
We will do more with this later, right now it just needs to be installed so you can access pgAdmin 4

Follow the instructions at this link: https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql/

Once installed, you can open pgadmin 4 from the start menu, and log in with your password by clicking "servers" on the left side

Postman
You can download the client if you want, but you can also just use the web: https://web.postman.co/

Create a free account, we will use this to manually test our backend API calls when needed

The project!
I recommend downloading "Sublime Merge" - a git concurrency gui that makes it VERY EASY to keep track of branches and, most importantly, FIX MERGE CONFLICTS WITHOUT THE GOD AWFUL GIT EDITOR. 
so here: https://www.sublimemerge.com/download

In sublime merge, it'll prompt you to clone a new repo. If it doesn't, go to File -> Clone Repository
here's the repo: https://github.com/durigon-sam/SWEGroup12.git

There are some important things about this project we need to keep track of
All the backend files are in the root directory of the project, however all the frontend files are located within the "fronted" folder, to keep them separated
to initialize the backend, you need to be in the "records" folder
to initialize the frontend, you need to be in the "frontend" folder
PLEASE don't try to move the backend into a backend folder, OR the frontend stuff out of the frontend folder, it'll mess with the file structure in the running files and its just annoying
Running the project
To run the backend:
find the "RecordsApplication.java" file in the src/main/java/com/example/records directory and open it
in the top right of VSCode, click the play button (you can also hit the dropdown menu to "run and debug" for the debug menu)
open your browser and go to "localhost:8080"
default username: user
default password: password
to stop, find the red stop button at the top of vscode
 
I'd like to note this is currently using a primitive template renderer for a temporary frontend. Eventually we will connect the react frontend to the REST api we are creating in the backend.

To run the frontend:
Open a new terminal in VSCode
FIRST TIME ONLY type npm install and wait
it will tell you to run npm audit or npm upgrade or something, please don't do this. It only causes more problems. It's more important that we are all on the same versions of the dependancies as they are all stable right now.
once the dependency installationg is complete, run npm start
this should automatically open a browser tab.
If it doesn't, go to "localhost:3000" in your browser
to stop, go into the terminal and hit "control/ctrl + C" until it stops
Before we get started!
I've found some helpful tutorials for all the things we will be doing in order to test things. I'll link them here. Try out some of them and play around with everything so you're familiar with spring boot, react, postgreSQL, etc.
https://www.javaguides.net/2021/08/spring-boot-postgresql-crud-example.html
https://www.javaguides.net/2021/08/react-spring-boot-postgresql-crud.html
https://www.bezkoder.com/spring-boot-react-postgresql/
https://react.dev/learn
https://spring.io/guides
https://www.postgresqltutorial.com/
