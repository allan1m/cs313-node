const express = require('express')
const app = express()
const port = 5000

app.use(express.static(__dirname + "/public"))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

//set up a raule that says requests to "/rate" should be handled by the
//handleRate function below
app.get('/rate', handleRate)

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