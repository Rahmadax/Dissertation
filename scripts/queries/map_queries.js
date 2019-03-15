
// Create a new user account.
function get_maps_in_series(series_id) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/maps/get_maps_in_series', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        id: series_id
    }));
}

// Create a new user account.
function create_map() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/maps/create', true);
    xhr.send();
}


/* Given an array of [start_date, end_date] of maps, returns a list of years that have overlapping maps.  */
function get_overlap(maps){
    let year_dict = {};
    for (let i = 0; i < maps.length; i++) {
        for (let j = maps[i][0]; j <= maps[i][1]; j++){
            if (year_dict[j] != null)
                year_dict[j] = year_dict[j]+1;
            else
                year_dict[j] = 1;
        }
    }

    let output = [];
    for (const [key, value] of Object.entries(year_dict)) {
        if (value > 1)
            output.push([key, value]);
    }
    return([output, year_dict]);
}

