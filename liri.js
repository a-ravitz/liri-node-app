require("dotenv").config();
var inquirer = require('inquirer') //inquirer
var fs = require('fs') //fs
var axios = require('axios') //axios
var keys = require("./keys.js"); //spotify keys
var moment = require('moment'); //moment
var colors = require('colors') //colors, makes it pretty
var doWhat = "do-what-it-says";
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

//if statement to either read do-what-it-says or to fire liri
if (command === doWhat) { 
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        }
        var split = data.split(",")
        input = split.slice(1).join(" ")
        switch (split[0]) {
            case 'concert-this':
                bandsInTown()
                break;
            case 'spotify-this-song':
                spotify()
                break;
            case 'movie-this':
                movieThis()
                break;
            case 'do-what-it-says':
                doWhat()
                break;
        }
    })

} else {
    liri()
}
//my liri app starts with an inquirer prompt to collect the process and the input, in the switch statment it is used to fire different functions
function liri() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["concert-this", "spotify-this-song", "movie-this"],
                name: "process"
            },
            {
                type: "input",
                message: "what would you like to search for?",
                name: "input"
            }
        ]).then(function (inquirerResponses) {
            var iR = inquirerResponses;
            command = iR.process;
            input = iR.input

            switch (command) {
                case 'concert-this':
                    bandsInTown()
                    return;
                case 'spotify-this-song':
                    spotify()
                    return;
                case 'movie-this':
                    movieThis()
                    return;
                case 'do-what-it-says':
                    doWhatItSays()
                    return;
            }

        })
}
function bandsInTown(band) {
    var queryURL = `https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`

    axios
    //set this up with an async/await so when its all said and done another function prompting another inquirer run search can be fired
        .get(queryURL)
        .then(async function (response) { 
            var artist = response.data

            
            console.log("\r")
            console.log("**********")
            console.log("\r")
            fs.appendFileSync('log.txt', `concert-this - searched: ${moment()}\n\r`) //al the fs.appendFileSync's are for log.txt
            fs.appendFileSync('log.txt', `Name of band: ${input}\n`)
            console.log("Information for the next 3 " + input.red + " shows are as follows: ") //variable.color makes it colorful when it prints up in the console
            console.log("\r")
            try {
                for (var i = 0; i < artist.length; i++) {
                    var j = artist[i]
                    if (i <= 1) {
                        //name of venue
                        fs.appendFileSync('log.txt', `Name Of Venue: ${j.venue.name}\n`)
                        console.log(colors.yellow('Venue') + ": " + j.venue.name.green)
                        //city of venue 
                        fs.appendFileSync('log.txt', `Location Of Venue: ${j.venue.city}, ${j.venue.country}\n`)
                        console.log(colors.yellow('Location') + ": " + j.venue.city.green + ", " + j.venue.country.green)
                        //date/time of performance
                        fs.appendFileSync('log.txt', `Date Of Performance: ${j.datetime}\n`)
                        console.log(colors.yellow('Date') + ": " + j.datetime.green)
                        console.log("----------")
                    } else if (i <= 2) {
                        fs.appendFileSync('log.txt', `Name Of Venue: ${j.venue.name}\n`)
                        console.log(colors.yellow('Venue') + ": " + j.venue.name.green)

                        fs.appendFileSync('log.txt', `Location Of Venue: ${j.venue.city}, ${j.venue.country}\n`)
                        console.log(colors.yellow('Location') + ": " + j.venue.city.green + ", " + j.venue.country.green)
                        fs.appendFileSync('log.txt', `Date Of Performance: ${j.datetime}\n`)
                        console.log(colors.yellow('Date') + ": " + j.datetime.green)

                    } else {
                        break;
                    }
                    fs.appendFileSync('log.txt', '\n-------------------------\n\r')
                }
            } catch {

            }
                console.log("\r")
                console.log("**********")
                console.log("\r")
                console.log("Thank you for using " + colors.underline("concert-this"))
                console.log("\n\n\n")
                var wait = await reset()
            
        });
}
function spotify(song) {
//spotify is a huge pain in the ass
    var Spotify = require("node-spotify-api")
    var spotify = new Spotify(keys.spotify);

    if (input === "") {
        input = "The Sign Ace Of Base"
    }

    spotify.search({ type: 'track', query: `${input}` }, async function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        try {
        console.log("\r")
        console.log("**********")
        console.log("\r")
        console.log("Information for the song " + input.red + " is as follows: ")
        console.log("\r")
        fs.appendFileSync('log.txt', `spotify-this-song - searched: ${moment()}\n\r`)
        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
            var name = data.tracks.items[0].artists[i].name
            fs.appendFileSync('log.txt', `Artist Name: ${name}\n`)
            console.log(colors.yellow("Performed by") + ": " + name.green)
        }
        var title = data.tracks.items[0].name
        fs.appendFileSync('log.txt', `Track Name: ${title}\n`)
        console.log(colors.yellow("Name") + ": " + title.green)
        var album = data.tracks.items[0].album.name
        fs.appendFileSync('log.txt', `Album Name: ${album}\n`)
        console.log(colors.yellow("Album") + ": " + album.green)
        var link = data.tracks.items[0].album.external_urls.spotify
        fs.appendFileSync('log.txt', `Preview Link: ${link}\n`)
        console.log(colors.yellow("Preview Link") + ": " + link.green)
        console.log("\r")
        console.log("**********")
        console.log("\r")
    } catch {

    }
        fs.appendFileSync('log.txt', '\n-------------------------\n\r')
        console.log("Thank you for using " + colors.underline("spotify-this-song"))
        console.log("\n\n\n")
          
        var wait = await reset()
    });
}
function movieThis(movie) {
    if (input === "") {
        input = "Mr. Nobody"
    }
    axios.get(`http://www.omdbapi.com/?t=${input}&y=&plot=short&apikey=trilogy`).then(
        async function (response) {
            try {
                //title
                var movie = response.data
                //   console.log(movie)
                console.log("\r")
                console.log("**********")
                console.log("\r")
                fs.appendFileSync('log.txt', `movie-this - searched: ${moment()}\n\r`)
                console.log("Information for the movie " + colors.red(input) + " is as follows: ")
                console.log("\r")
                //   console.log(movie)
                fs.appendFileSync('log.txt', `Movie Title: ${movie.Title}\n`)
                console.log(colors.yellow("Title") + ": " + movie.Title.green);
                //release date
                fs.appendFileSync('log.txt', `Release Date: ${movie.Released}\n`)
                console.log(colors.yellow("Release date") + ": " + movie.Released.green);
                //imdb rating
                fs.appendFileSync('log.txt', `IMDB Rating: ${movie.imdbRating}\n`)
                console.log(colors.yellow("IMDB Rating") + ": " + movie.imdbRating.green)
                //rotten tomatoes
                // var tRatings = movie.Ratings[1].Value
                fs.appendFileSync('log.txt', `Rotten Tomatoes Rating: ${movie.Ratings[1].Value}\n`)
                console.log(colors.yellow("Rotten Tomatoes Rating") + ": " + movie.Ratings[1].Value.green)
                fs.appendFileSync('log.txt', `Produced In: ${movie.Country}\n`)
                console.log(colors.yellow("Produced In") + ": " + movie.Country.green)
                fs.appendFileSync('log.txt', `Languages: ${movie.Languages}\n`)
                console.log(colors.yellow("Language(s)") + ": " + movie.Language.green)
                fs.appendFileSync('log.txt', `Performers: ${movie.Actors}\n`)
                console.log(colors.yellow("Actors/Actresses") + ": " + movie.Actors.green)
                fs.appendFileSync('log.txt', `Plot: ${movie.Plot}\n`)
                console.log(colors.yellow("Plot") + ": " + movie.Plot.green)
                fs.appendFileSync('log.txt', '\n-------------------------\n\r')
            } catch{

            }
            console.log("\r")
            console.log("**********")
            console.log("\r")
            console.log("Thank you for using " + colors.underline("movie-this"))
            console.log("\n\n\n")
            var wait = await reset()
        })

}
function doWhatItSays(input) {
    //reads the text file
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        }
        //splits the line of text at the comma
        var split = data.split(",")
        //grabs the input after the comma, removes the "", and runs it through whatever function is called by split[0]
        input = split.slice(1).join(" ").replace(/['"]+/g, '')
        console.log(input)
        console.log(split[0])
        switch (split[0]) {
            case 'concert-this':
                bandsInTown()
                break;
            case 'spotify-this-song':
                spotify()
                break;
            case 'movie-this':
                movieThis()
                break;
            case 'do-what-it-says':
                doWhat()
                break;
        }

    }); return;
}
function reset() {
    /*this function fires after the other functions have run to prompt you for more searches.
    or you can exit the program */
    
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: "Want to search for something else?"
            }
        ])
        .then(function (inquirerResponses) {
            var iR = inquirerResponses
            if (iR.confirm === true) {
                command = "";
                liri()
            } else {
                console.log("thanks for using " + colors.underline("liri.js") + ", have a great day")
            }
        });
}
