var query;
var url;
var xmlhttp;
var accuracy = 5;

document.getElementById("searchBar")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            // document.getElementById("btn1").click();
            getQuery();
        }
    });

function getQuery() {
    query = cleanInput(document.getElementById("searchBar").value);

    console.log(query);

    if (document.getElementById("show").checked) {
        url = "https://api.themoviedb.org/3/search/tv?api_key=d24b4ad0f87a2e534813890035cc59e4&language=en-US&query=" + query + "&page=1"; // checked tvshows
    } else if (document.getElementById("movie").checked) {
        url = "https://api.themoviedb.org/3/search/movie?api_key=d24b4ad0f87a2e534813890035cc59e4&language=en-US&query=" + query + "&page=1&include_adult=false"; // checked movies
    }
    queryGenres(url);
}

function cleanInput(query) {
    return query.split(' ').join("%20"); // remove spaces from inputs to be used in urls
}

function queryGenres(url) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for older browsers
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            var genres = [];
            for (var i = 0; i < jsonObj.results.length; i++) { // loop through all genres
                for (var j = 0; j < jsonObj.results[i].genre_ids.length; j++) {
                    if (jsonObj.results[i].genre_ids[j] != 'undefined')
                        genres.push(jsonObj.results[i].genre_ids[j]); // store genres in array
                }
            }
            genres = genres.filter(function(item, index, inputArray) { // remove duplicates from genres array
                return inputArray.indexOf(item) == index;
            });
            var toUseGenres = [];
            for (var i = 0; i < accuracy; i++) {
                toUseGenres.push(genres[Math.floor(Math.random() * genres.length)]);
            }
            if (document.getElementById("show").checked) {
                url = "https://api.themoviedb.org/3/discover/tv?api_key=d24b4ad0f87a2e534813890035cc59e4&language=en-US&sort_by=popularity.desc&page=1&timezone=America/New_York&with_genres=" + toUseGenres.toString() + "&include_null_first_air_dates=false";
                // console.log(url);
                queryShow(url);
            } else if (document.getElementById("movie").checked) {
                url = "https://api.themoviedb.org/3/discover/movie?api_key=d24b4ad0f87a2e534813890035cc59e4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" + toUseGenres.toString();
                // console.log(url);
                queryMovie(url);
            }
        }
    };
    // for querys with spaces, use %20 for each " "
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
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
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
