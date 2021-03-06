
function hello(req, res) {
    console.log("Received a request for /helloWorld");

    res.write("This is the Hello World page");
    res.end();
}




module.exports = {hello: hello}