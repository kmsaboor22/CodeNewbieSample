// holds full list of songs
var songsArray = [];
// add song section
var div;

// retrieves songs from server
function getSongs() {
    var http = new XMLHttpRequest();
    // http.open('GET', 'https://codenewbiedemo.cfapps.io/hello', false);
    http.open('GET', 'http://localhost:8080/hello', false);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
    console.log('Plain JS Http Response', http.responseText);
    return JSON.parse(http.responseText);
}

// called on page load
function loadSongs() {
    songsArray = getSongs();
    console.log('Loaded Songs', songsArray);
}

// called on entry of a key into the searchbar
// takes value of searchbar and attempts to find name or artist match
function searchSongs() {
    var searchValue = document.getElementById('searchBar').value;
    var holder = document.getElementById('searchListing');
    holder.innerHTML = '';
    if (searchValue == '') {
        return;
    }
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
    // if no match found, anchor tag created that, onclick, shows section to add song
    if (resultArray.length < 1) {
        var td = document.createElement('td');
        td.colSpan = 3;
        td.align = 'center';
        var link = document.createElement('a');
        link.innerHTML = 'No Results Found. Add a New Song!';
        link.onclick = showAddForm;
        td.appendChild(link);
        holder.appendChild(td);
        return;
    }

    // adds rows to song table
    for (var i = 0; i < resultArray.length; i++) {
        console.log('adding', resultArray[i]);
        holder.appendChild(addRow(resultArray[i]));
    }
}

// takes song object and places its properties into row object
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

// sends a song to the server, receives song list response
function addSong() {
    var http = new XMLHttpRequest();
    http.open('POST', 'http://localhost:8080/addSong?seconds=' + addSection.seconds.value +
        '&name=' + addSection.nameInput.value +
        '&artist=' + addSection.artistInput.value, false);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
    console.log('Http Post Response', http.status);
    if (http.status === 200) {
        songsArray = JSON.parse(http.responseText);
        div.innerHTML = 'Success!';
    } else {
        div.innerHTML = 'Failed To Add New Song';
    }
}

// add section object that holds htmlelement nested objects
var addSection = {
    nameInput: {},
    artistInput: {},
    seconds: {},
    addButton: {},
    initialize: function () {
        this.nameInput = document.createElement('input');
        this.artistInput = document.createElement('input');
        this.seconds = document.createElement('input');
        this.addButton = document.createElement('button');
        this.nameInput.setAttribute('id', 'nameInput');
        this.artistInput.setAttribute('id', 'artistInput');
        this.seconds.setAttribute('type', 'number');
        this.seconds.setAttribute('id', 'seconds');
        this.addButton.onclick = addSong;
        this.addButton.innerHTML = 'Add New Song';
    }
}

// displays elements from add section object
function showAddForm() {
    console.log('Showing add form');
    addSection.initialize();
    div = document.getElementById('newSong');
    div.innerHTML = '';
    var label1, label2, label3;
    label1 = document.createElement('label');
    label2 = document.createElement('label');
    label3 = document.createElement('label');
    label1.innerHTML = 'Name';
    label2.innerHTML = 'Artist';
    label3.innerHTML = 'Seconds';
    div.appendChild(label1);
    div.appendChild(addSection.nameInput);
    div.appendChild(label2);
    div.appendChild(addSection.artistInput);
    div.appendChild(label3);
    div.appendChild(addSection.seconds);
    div.appendChild(addSection.addButton);
}