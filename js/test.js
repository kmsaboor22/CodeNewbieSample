var songsArray = [];

function getSongs() {
    var http = new XMLHttpRequest();
    http.open('GET', 'https://codenewbiedemo.cfapps.io/hello', false);
    // http.open('GET', 'http://localhost:8080/hello', false);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
    console.log('Plain JS Http Response', http.responseText);
    return JSON.parse(http.responseText);
}

function loadSongs() {
    songsArray = getSongs();
    console.log('Loaded Songs', songsArray);
}

function searchSongs() {
    var searchValue = document.getElementById('searchBar').value;
    console.log(searchValue);
    var resultArray = songsArray.filter(element => {
        var comparison = searchValue.toUpperCase();
        // search mar
        if (element.name.toUpperCase().includes(comparison) || element.artist.toUpperCase().includes(comparison)) {
            return true;
        } else {
            return false;
        }
    });
    console.log('results array', resultArray);
    var holder = document.getElementById('searchListing');
    holder.innerHTML = '';
    for (var i = 0; i < resultArray.length; i++) {
        console.log('adding', resultArray[i]);
        holder.appendChild(addRow(resultArray[i]));
    }
}

function addRow(song) {
    var tableRow = document.createElement('tr');
    var artist = document.createElement('td');
    artist.innerHTML = song.artist;
    var name = document.createElement('td');
    name.innerHTML = song.name;
    var seconds = document.createElement('td');
    seconds.innerHTML = song.seconds;
    tableRow.appendChild(artist);
    tableRow.appendChild(name);
    tableRow.appendChild(seconds);
    return tableRow;
}