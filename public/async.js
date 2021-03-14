function loadDB() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log(JSON.parse(http.response))
        }
    }

    http.open('GET', './getPerson', true)
    http.send()
}