const express = require('express')
const app = express()
const port = process.env.PORT || 5000
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

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
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

//set up a raule that says requests to "/rate" should be handled by the
//handleRate function below
app.get('/rate', handleRate)
app.get('/getPerson', handleGetPerson)

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

function handleGetPerson(request, response) {
    console.log('inside handGetPerson')
    var op = request.query.itemId
    console.log(op)
    
    if (op == 1) {
        console.log('inside if statement')
        const sql = "SELECT item FROM menu;"
        pool.query(sql, function(err, res) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err)
        }

        // Log this to the console for debugging purposes.
        console.log("Back from database with the following:")
            console.log(res.rows)
            
            var stringres = JSON.stringify(res.rows)
            
            var params = { op: op, res: stringres }
            
            response.send(res.rows)
});
    }
}