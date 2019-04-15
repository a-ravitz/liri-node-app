## liri-node-app

this liri-node-app is controlled with inquirer promptes, except for the do-what-it-says function.

do-what it says works the way it is described in the homework's instructions

i've chosen to use inquirer prompts for everything else so it is more fun to use, and more interactive

her is a video if it in action 
https://drive.google.com/open?id=1Y2SEkucdCZGBXYcLGw5UjUUnQGLfUPia

to run the program type in the following:

<img width="489" alt="Screen Shot 2019-04-15 at 4 41 50 PM" src="https://user-images.githubusercontent.com/46004362/56165357-b9e96e80-5fa0-11e9-96e5-c30f23a65e4e.png">

## here you can see the functions

<img width="567" alt="Screen Shot 2019-04-15 at 4 41 32 PM" src="https://user-images.githubusercontent.com/46004362/56164840-8e19b900-5f9f-11e9-947e-40a647667994.png">

# liri()
this function contains a switch inquirer promts for command/input and a switch to direct them to fire other functions 

# bandsInTown() 
this function searches the bands in town api

to use it select concert-this and then type in what you'd like to search for 

<img width="432" alt="Screen Shot 2019-04-15 at 4 41 57 PM" src="https://user-images.githubusercontent.com/46004362/56165428-eac9a380-5fa0-11e9-87c7-6ffd51f79684.png">

if your search comes up with anything you will be given information for three upcoming shows, like this 

<img width="545" alt="Screen Shot 2019-04-15 at 4 42 19 PM" src="https://user-images.githubusercontent.com/46004362/56165457-09c83580-5fa1-11e9-89f1-52dc2bc0b835.png">

if there is an error you'll just be prompted to do another search or exit the program 

# spotify()
this function searches the spotify API with help  node-spotify-api 

to use this just select spotify-this-song from the list of songs and type in a song you're looking for 

<img width="645" alt="Screen Shot 2019-04-15 at 4 42 46 PM" src="https://user-images.githubusercontent.com/46004362/56165525-2bc1b800-5fa1-11e9-81c8-130234e36b84.png">

if there is an error you'll just be prompted to do another search or exit the program 

# movieThis()
this fucntion searches the omdb database 

<img width="705" alt="Screen Shot 2019-04-15 at 4 43 05 PM" src="https://user-images.githubusercontent.com/46004362/56165566-4b58e080-5fa1-11e9-9469-11f160646e93.png">

all of the information provided from these three functions will be logged in a file called log.txt, it will be saved with the function and the time of the search as the first line, and the other information beneath it 

<img width="849" alt="Screen Shot 2019-04-15 at 4 43 31 PM" src="https://user-images.githubusercontent.com/46004362/56165653-8529e700-5fa1-11e9-9df4-e2329de3fed9.png">

# doWhatItSays()
if the program is run as follows ```node liri.js do-what-it-says``` this function will split the information in the ```random.txt``` file at the comma, then use the first part of the split array as the command and the second part as the input for whatever function it calls

# reset()
this program will prompt you to search for something else or exit the program 

<img width="382" alt="Screen Shot 2019-04-15 at 4 43 12 PM" src="https://user-images.githubusercontent.com/46004362/56165665-8fe47c00-5fa1-11e9-95f2-60098b91b30f.png">

if you choose to leave the program it will thank you and send you on your way 

## thanks for looking 
