function loadDB() {

    var element = document.getElementById('itemId');
    var value = element.value;
    var name = element.getAttribute("name");
    console.log(value);
    console.log(name);
    var sending = name + "=" + value;
    console.log(sending);

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log(JSON.parse(http.response))
        }
    }

    http.open('POST', '/getPerson?'+sending, true);
    http.send();

}

