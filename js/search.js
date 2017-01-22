var query;
var url;
var xmlhttp;

document.getElementById("searchBar")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            // document.getElementById("btn1").click();
            getQuery();
        }
    });

function getQuery() {
    query = document.getElementById("searchBar").value;

    if (document.getElementById("show").checked) {
        url = "https://api.themoviedb.org/3/search/tv?api_key=d24b4ad0f87a2e534813890035cc59e4&language=en-US&query=" + query + "&page=1"; // checked tvshows
        queryGenres(url);
    } else if (document.getElementById("movie").checked) {
        url = "https://api.themoviedb.org/3/search/movie?api_key=d24b4ad0f87a2e534813890035cc59e4&language=en-US&query=" + query + "&page=1&include_adult=false"; // checked movies
        queryGenres(url);
    }
}

function queryGenres(url) {
    
}

function queryShow(url) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for older browsers
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);

            var tableString = "<tr><th>Name</th><th>Date aired</th><th>Rating</th></tr>";
            for (var i = 0; i < jsonObj.results.length; i++) {
                if (jsonObj.results[i].name != "") {
                    tableString += "<tr>";
                    tableString += "<td>" + jsonObj.results[i].name + "</td>"; // title
                    if (jsonObj.results[i].first_air_date == "") {
                        tableString += "<td> N/A </td>";
                    } else {
                        tableString += "<td>" + jsonObj.results[i].first_air_date + "</td>"; // release date
                    }
                    if (jsonObj.results[i].vote_average == 0) {
                        tableString += "<td> N/A </td>";
                    } else {
                        tableString += "<td>" + jsonObj.results[i].vote_average + "</td>"; // rating
                    }
                    tableString += "</tr>";
                }
            }
            document.getElementById("results").innerHTML = tableString;
        }
    };
    // for querys with spaces, use %20 for each " "
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function queryMovie(url) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for older browsers
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);

            var tableString = "<tr><th>Name</th><th>Date aired</th><th>Rating</th></tr>";
            for (var i = 0; i < jsonObj.results.length; i++) {
                if (jsonObj.results[i].title != "") {
                    tableString += "<tr>";
                    tableString += "<td>" + jsonObj.results[i].title + "</td>"; // title
                    if (jsonObj.results[i].release_date == "") {
                        tableString += "<td> N/A </td>";
                    } else {
                        tableString += "<td>" + jsonObj.results[i].release_date + "</td>"; // release date
                    }
                    if (jsonObj.results[i].vote_average == 0) {
                        tableString += "<td> N/A </td>";
                    } else {
                        tableString += "<td>" + jsonObj.results[i].vote_average + "</td>"; // rating
                    }
                    tableString += "</tr>";
                }
            }
            document.getElementById("results").innerHTML = tableString;
        }
    };
    // for querys with spaces, use %20 for each " "
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
