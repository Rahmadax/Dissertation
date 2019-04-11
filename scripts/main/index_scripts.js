
// Change between tabs on right hand scroll box
function change_tab(bar) {
    let insets = document.getElementsByClassName('event_bar_inset');
    for (let i = 0; i < insets.length; i++){
        insets[i].setAttribute('style', 'display: none');
        document.getElementById(bar + 's_tab').setAttribute('style', 'display: block');
    }
    let tabs = document.getElementsByClassName('event_tab');
    let this_element = (bar + '_tab');
    for (let j = 0; j < tabs.length; j++){
        tabs[j].style.borderBottom = '1px solid black';
    }
    document.getElementById(this_element).style.borderBottom = '1px solid #f5f5f0';
}

/* Creates and adds info boxes to the right hand scroll box */
// Elements in series:
function draw_series_box(unique, title, description, start_date, end_date) {
    let new_series_box = document.createElement("div");
    new_series_box.setAttribute("class", "event_box");
    new_series_box.setAttribute("onclick", "select_series_controller("+unique+")");

    box_add_title(title, new_series_box);
    box_add_dates(start_date, end_date, new_series_box);
    box_add_description(description, new_series_box);

    let series_bar = document.getElementById("seriess_tab");
    series_bar.appendChild(new_series_box);
}

// Elements in map:
function draw_map_box(map){
    let new_map_box = document.createElement("div");
    new_map_box.setAttribute("class", "event_box");

    box_add_title(map[0], new_map_box);
    box_add_description(map[1], new_map_box);

    let maps_bar = document.getElementById("maps_tab");
    maps_bar.appendChild(new_map_box);
}

// Elements in event: 0 - Title, 1 - Description, 2 - Start Date, 3 -End Date, 4 - Color, 5 - Starting Coords.
function draw_event_box(event){
    let new_event_box = document.createElement("div");
    new_event_box.setAttribute("class", "event_box");
    new_event_box.setAttribute("onclick", "change_location(" + event[5]['x'] + ',' + event[5]['y'] + ")");

    box_add_title(event[0], new_event_box);
    box_add_dates(event[2], event[3], new_event_box);
    box_add_description(event[1], new_event_box);


    let event_bar = document.getElementById("events_tab");
    event_bar.appendChild(new_event_box);
}

// Elements in marker:
function draw_marker_box(event){
    // Stub
}

