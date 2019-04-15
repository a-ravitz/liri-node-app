## liri-node-app

this liri-node-app is controlled with inquirer promptes, except for the do-what-it-says function.

do-what it says works the way it is described in the homework's instructions

i've chosen to use inquirer prompts for everything else so it is more fun to use, and more interactive

her is a video if it in action 
https://drive.google.com/open?id=1Y2SEkucdCZGBXYcLGw5UjUUnQGLfUPia

## here you can see the functions

<img width="567" alt="Screen Shot 2019-04-15 at 4 41 32 PM" src="https://user-images.githubusercontent.com/46004362/56164840-8e19b900-5f9f-11e9-947e-40a647667994.png">

# liri()
this function contains a switch inquirer promts for command/input and a switch to direct them to fire other functions 

# bandsInTown() 
this function searches the bands in town api
# spotify()
this function searches the spotify API with help  node-spotify-api 
# movieThis()
this fucntion searches the omdb database 
# doWhatItSays()
if the program is run as follows ```node liri.js do-what-it-says``` this function will split the information in the ```random.txt``` file at the comma, then use the first part of the split array as the command and the second part as the input for whatever function it calls
# reset()
this program will prompt you to search for something else or exit the program 
