function getCarneAsada() {

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log(JSON.parse(http.response))
            obj = JSON.parse(http.responseText);
            document.getElementById("returnCarneAsada").innerHTML = JSON.stringify(obj.item[0].ingredients);
        }
    }

    http.open('POST', '/getCarneAsada', true);
    http.send();

}

function getAlPastor() {

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log(JSON.parse(http.response))
            obj = JSON.parse(http.responseText);
            document.getElementById("returnAlPastor").innerHTML = JSON.stringify(obj.item[0].ingredients);
        }
    }

    http.open('POST', '/getAlPastor', true);
    http.send();

}

function getCarnitas() {

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log(JSON.parse(http.response))
            obj = JSON.parse(http.responseText);
            document.getElementById("returnCarnitas").innerHTML = JSON.stringify(obj.item[0].ingredients);
        }
    }

    http.open('POST', '/getCarnitas', true);
    http.send();

}

function getPollo() {

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log(JSON.parse(http.response))
            obj = JSON.parse(http.responseText);
            document.getElementById("returnPollo").innerHTML = JSON.stringify(obj.item[0].ingredients);
        }
    }

    http.open('POST', '/getPollo', true);
    http.send();

}

function getPescado() {

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log(JSON.parse(http.response))
            obj = JSON.parse(http.responseText);
            document.getElementById("returnPescado").innerHTML = JSON.stringify(obj.item[0].ingredients);
        }
    }

    http.open('POST', '/getPescado', true);
    http.send();

}