
function load_seriess(){
    document.getElementById('seriess_tab').innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'seriess/get_all_seriess', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        let response = JSON.parse(this.responseText);
        let series = response[0];
        document.getElementById('profile_drop').innerText = response[1];
        for (let i = 0; i < series.length; i++) {
            let se = series[i];
            draw_series_box(se['unique'], se['title'], se['description'], se['dateStart'], se['dateEnd']);
        }
        change_tab('series');
    };
    xhr.send(JSON.stringify({
        unique: get_unique()
    }));
}

function select_series_controller(unique){
    set_series(unique);
    series_select_maps();
    change_tab('map');
    document.getElementById('timeline').setAttribute('class', 'slide_out');
    select_series();
}

function select_series() {
    let xhr_series = new XMLHttpRequest();
    xhr_series.open("POST", '/seriess/get_series_info', true);

    xhr_series.onload = function () {
        let series = JSON.parse(this.responseText);
        let series_start = series['dateStart'];
        let series_end = series['dateEnd'];
        if (series_start.includes('BC')) {                                      // Handle BC Dates, AD handled by default.
            series_start = chop_BC(series_start, true);
            if (series_end.includes('BC'))                                      // If map end in BC too
                series_end = chop_BC(series_end, true);
        }
        series_start = new Date(series_start);                                  // Convert to useful format
        series_end = new Date(series_end);

        set_series_info(series_start,series_end);                               // Set Cookies
        if ((series_end.getFullYear() - series_start.getFullYear()) < 31)       // Normal Timeline, or Extended
            update_slider(series_start, series_end, 'normal');
        else
            update_slider(series_start, series_end, 'extended');
    };
    xhr_series.setRequestHeader('Content-Type', 'application/json');    // Send Ajax, update this.
    xhr_series.send(JSON.stringify({
        unique: sessionStorage.getItem('series_unique')
    }));
}

function series_select_maps(){
    let xhr_maps = new XMLHttpRequest();
    xhr_maps.open("POST", 'maps/get_maps_in_series', true);
    xhr_maps.onload = function () {
        let map_dates = [];
        let maps = JSON.parse(xhr_maps.responseText);
        document.getElementById('events_tab').innerHTML = "";
        document.getElementById('maps_tab').innerHTML = "";
        for (let i = 0; i < maps.length; i++) {
            draw_map_box(maps[i]);
            let date_start = chop_BC(maps[i][2], false);
            let date_end = chop_BC(maps[i][3], false);
            map_dates.push([date_start[0], date_start[1], date_end[0], date_end[1], maps[i][4]]);
        }
        setTimeout( function(){         // Inside Async ajax call - ugly, but necessary.
            clear_map_blocks();
            add_map_blocks(map_dates);
            document.getElementById('timeline').setAttribute('class', 'slide_in');
        }, 1000 );

    };
    xhr_maps.setRequestHeader('Content-Type', 'application/json');
    xhr_maps.send(JSON.stringify({
        unique: sessionStorage.getItem('series_unique')
    }));
}

function load_test_seriess(){
    let xhr_series = new XMLHttpRequest();
    xhr_series.open("POST", '/seriess/get_test_series', true);

    xhr_series.onload = function () {
        let response = JSON.parse(this.responseText);
        for (let i = 0; i < response.length; i++) {
            let se = response[i];
            draw_series_box(se['unique'], se['title'], se['description'], se['dateStart'], se['dateEnd']);
        }
        change_tab('series');
    };
    xhr_series.setRequestHeader('Content-Type', 'application/json');    // Send Ajax, update this.
    xhr_series.send();
}

function create_series(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/seriess/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: "Test Yeezy Series",
        description: "Yeezy series around",
        dateStart: "1066-01-01",
        dateEnd: "1072-05-01",
        scope: "admin"
    }));
}
