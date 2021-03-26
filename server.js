const express = require('express')
const app = express()
const port = process.env.PORT || 5000
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

//Team Activity
// We are going to use sessions
var session = require('express-session')

// set up sessions
app.use(session({
  secret: 'my-super-secret-secret!',
  resave: false,
  saveUninitialized: true
}))

// Because we will be using post values, we need to use the body parser middleware
app.use(express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
// This shows how to use a middleware function for all requests (it is defined below)
// Becuse it comes after the static function call, we won't see it log requests
// for the static pages, only the ones that continue on passed that (e.g., /logout)
app.use(logRequest);

//database connection
const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://mcfqmzzpliiroo:6f84571ea24fc26f77068a90a2dd0cdac4b9bfc25f313b943f7980b8a0fed605@ec2-54-162-119-125.compute-1.amazonaws.com:5432/d3u5jrc2mss315?ssl=true'
const pool = new Pool({connectionString: connectionString, ssl: {rejectUnauthorized: false}})
const sql = "SELECT * FROM person;"
pool.query(sql, function(err, res) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err)
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:")
    //console.log(res.rows)


});

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/public/stylesheets"))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

//set up a raule that says requests to "/rate" should be handled by the
//handleRate function below
app.get('/rate', handleRate)
app.post('/getCarneAsada', handleCarneAsada)
app.post('/getAlPastor', handleAlPastor)
app.post('/getCarnitas', handleCarnitas)
app.post('/getPollo', handlePollo)
app.post('/getPescado', handlePescado)

//team activity
app.post('/login', handleLogin);
app.post('/logout', handleLogout);

//start the server listening
app.listen(port, () => {
    console.log('Example app listening at http://localhost:', port)
})

function handleRate(request, response) {
    var operation = request.query.operation
    var rate = Number(request.query.weightoz)

    computeRate(response, operation, rate)
}

function computeRate(response, op, oz) {
    op = op.toLowerCase()

    let result = 0;

    if (op == "letter-stamped") {
        if (oz == 1) {
            result = 0.55
        } else if (oz == 2) {
            result = 0.75
        } else if (oz == 3) {
            result = 0.95
        } else if (oz == 3.5) {
            result = 1.15
        } else {
            
        }
    } else if (op == "letter-metered") {
        if (oz == 1) {
            result = 0.51
        } else if (oz == 2) {
            result = 0.71
        } else if (oz == 3) {
            result = 0.91
        } else if (oz == 3.5) {
            result = 1.11
        }
    } else if (op == "large-evelope-flat") {
        if (oz == 1) {
            result = 1.00
        } else if (oz == 2) {
            result = 1.20
        }else if (oz == 3) {
            result = 1.40
        }else if (oz == 4) {
            result = 1.60
        }else if (oz == 5) {
            result = 1.60
        }
    } else if (op == "first-class-retail") {
        if (oz == 1) {
            result = 4.00
        } else if (oz == 2) {
            result = 4.00
        }
    }

    var params = { operation: op, weight: oz, result: result }
    
    response.render('pages/result', params)
}

function handleCarneAsada(request, response) {
    //console.log('inside handleGetPerson')
    //var op = request.query.itemId
    //console.log("The value of op:" + op)
    
    //if (op == 1) {
        //console.log('Inside if statement, op = ' + op)
        const sql = "SELECT ingredients FROM menu WHERE id=1;"
        pool.query(sql, function(err, res) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err)
        }

        // Log this to the console for debugging purposes.
        console.log("Back from database with the following:" + res.rows)
            
        var ingredients = res.rows
            
        var params = { item: ingredients }

        console.log("JSON DATA " + ingredients)
            
        response.send( params)
            
        });
    //}
}

function handleAlPastor(request, response) {
    //console.log('inside handleGetPerson')
    //var op = request.query.itemId
    //console.log("The value of op:" + op)
    
    //if (op == 1) {
        //console.log('Inside if statement, op = ' + op)
        const sql = "SELECT ingredients FROM menu WHERE id=2;"
        pool.query(sql, function(err, res) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err)
        }

        // Log this to the console for debugging purposes.
        console.log("Back from database with the following:" + res.rows)
            
        var ingredients = res.rows
            
        var params = { item: ingredients }

        console.log("JSON DATA " + ingredients)
            
        response.send( params)
            
        });
    //}
}

function handleCarnitas(request, response) {
    //console.log('inside handleGetPerson')
    //var op = request.query.itemId
    //console.log("The value of op:" + op)
    
    //if (op == 1) {
        //console.log('Inside if statement, op = ' + op)
        const sql = "SELECT ingredients FROM menu WHERE id=5;"
        pool.query(sql, function(err, res) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err)
        }

        // Log this to the console for debugging purposes.
        console.log("Back from database with the following:" + res.rows)
            
        var ingredients = res.rows
            
        var params = { item: ingredients }

        console.log("JSON DATA " + ingredients)
            
        response.send( params)
            
        });
    //}
}

function handlePollo(request, response) {
    //console.log('inside handleGetPerson')
    //var op = request.query.itemId
    //console.log("The value of op:" + op)
    
    //if (op == 1) {
        //console.log('Inside if statement, op = ' + op)
        const sql = "SELECT ingredients FROM menu WHERE id=3;"
        pool.query(sql, function(err, res) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err)
        }

        // Log this to the console for debugging purposes.
        console.log("Back from database with the following:" + res.rows)
            
        var ingredients = res.rows
            
        var params = { item: ingredients }

        console.log("JSON DATA " + ingredients)
            
        response.send( params)
            
        });
    //}
}

function handlePescado(request, response) {
    //console.log('inside handleGetPerson')
    //var op = request.query.itemId
    //console.log("The value of op:" + op)
    
    //if (op == 1) {
        //console.log('Inside if statement, op = ' + op)
        const sql = "SELECT ingredients FROM menu WHERE id=4;"
        pool.query(sql, function(err, res) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err)
        }

        // Log this to the console for debugging purposes.
        console.log("Back from database with the following:" + res.rows)
            
        var ingredients = res.rows
            
        var params = { item: ingredients }

        console.log("JSON DATA " + ingredients)
            
        response.send( params)
            
        });
    //}
}

// Checks if the username and password match a hardcoded set
// If they do, put the username on the session
function handleLogin(request, response) {
	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.body.username == "admin" && request.body.password == "password") {
		request.session.user = request.body.username;
		result = {success: true};
	}

	response.json(result);
}

// If a user is currently stored on the session, removes it
function handleLogout(request, response) {
	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.session.user) {
		request.session.destroy();
		result = {success: true};
	}

	response.json(result);
}

// This middleware function simply logs the current request to the server
function logRequest(request, response, next) {
	console.log("Received a request for: " + request.url);

	// don't forget to call next() to allow the next parts of the pipeline to function
	next();
}