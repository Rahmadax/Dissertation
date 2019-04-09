
// Create a new user account.
function get_maps_in_series(series_unique) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/maps/get_maps_in_series', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        unique: series_unique
    }));
}

function get_maps_between(date){
    date = prepare_date_for_db(date);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/maps/get_events_handler', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        change_tab("event");
        let j_events = JSON.parse(this.responseText);
        for (let i = 0; i < j_events.length; i++){
            draw_event_box(j_events[i])
        }
    };
    xhr.send(JSON.stringify({
        unique: sessionStorage.getItem('series_unique'),
        date: date
    }));
}



// Create a new user account.
function create_map() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/maps/create', true);
    xhr.send();
}


