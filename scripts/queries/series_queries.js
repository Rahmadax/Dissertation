function create_series(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/create', true);
    xhr.send();
}

function load_seriess(){
    document.getElementById('seriess_tab').innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'seriess/get_all_seriess', true);
    xhr.onload = function () {
        let series = JSON.parse(this.responseText);
        for (let i = 0; i < series.length; i++) {
            let se = series[i];
            draw_series_box(se['id'], se['title'], se['description'], se['dateStart'], se['dateEnd']);
        }
        change_tab('series');
    };
    xhr.send();
}

function select_series(id) {

    // Update the timeline
    var xhr_series = new XMLHttpRequest();
    xhr_series.open("POST", '/seriess/get_series_info', true);
    xhr_series.onload = function () {
        let series = JSON.parse(this.responseText);
        update_slider(new Date(series['dateStart']).getFullYear(), new Date(series['dateEnd']).getFullYear())
    };
    xhr_series.setRequestHeader('Content-Type', 'application/json');
    xhr_series.send(JSON.stringify({
        id: id
    }));


    // Update the side bar
    var xhr_maps = new XMLHttpRequest();
    xhr_maps.open("POST", 'maps/get_maps_in_series', true);
    xhr_maps.onload = function () {

        let maps = JSON.parse(xhr_maps.responseText);
        document.getElementById('events_tab').innerHTML = "";
        let map_dates = [];
        for (let i = 0; i < maps.length; i++){
            map_dates.push([new Date(maps[i].date_start).getFullYear(), new Date(maps[i].date_end).getFullYear()], maps[i].color);

            var xhr_events = new XMLHttpRequest();
            xhr_events.open("POST", 'events/get_events', true);
            xhr_events.onload = function () {
                handle_event_gen(JSON.parse(this.responseText));
            };
            xhr_events.setRequestHeader('Content-Type', 'application/json');
            xhr_events.send(JSON.stringify({
                    id: maps[i]['id']
            }));
        }
        add_map_blocks(map_dates);
    };
    xhr_maps.setRequestHeader('Content-Type', 'application/json');
    xhr_maps.send(JSON.stringify({
        id: id
    }));
    change_tab('event');

}
