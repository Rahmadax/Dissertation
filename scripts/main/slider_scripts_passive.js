// Repeated functions
// When user moves the slider. Calculates the number of months represented on the slider(s)
function slider_change() {
    let slider = document.getElementById("timeline_range");
    let sel_months = slider.value;
    let num_maps = take_overlap(convert_output(sel_months));
    draw_notification(slider, num_maps);
    if (extended())
        slider_change_output((sel_months*12) + document.getElementById("month_range").value);
    else
        slider_change_output(sel_months);
}

// Handles the slider output, offsets if necessary (year 0, etc)
function slider_change_output(sel_months){
    let year;
    if (String(String(ps_end_year()) + '-' + String(ps_end_month()+1)) === convert_output(sel_months)){            // If last month of the timeline.
        document.getElementById('slider_output').innerHTML = '';
        document.getElementById("slider_output").style.display = "none";
    } else {                                                                                                            // If using the compressed timeline.
        if (year_0()){                                                                                                  // If year 0 exists
            year = ps_start_year() + Math.floor(((parseInt(sel_months)) + ps_start_month())/12);
            if (year >= 0)                                                                                              // Account for year 0 edge case.
                year += 1;
        } else {
            year = ps_start_year() + Math.floor((((parseInt(sel_months) - 1) + ps_start_month()) / 12));
        }
        if (year <= 0)
            year = String(String(year).split('-')[1] + ' BC');                                          // Make BC output look nice.
        document.getElementById('slider_output').innerHTML = ((get_month(parseInt(sel_months))) + " " + year);
        document.getElementById("slider_output").style.display = "inline-block";
    }
}

// When a user selects on the slider, calculates the number of months represented on the slider(s)
function slider_select() {
    let sel_months = document.getElementById("timeline_range").value;
    if (extended())
        slider_select_output((sel_months*12) + document.getElementById("month_range").value);
    else
        slider_select_output(sel_months);
}

// Uses the selected number of months to decided which map has been selected, outputs events from that map.
function slider_select_output(sel_months){
    clear_box("events");
    get_maps_between(convert_output(sel_months));
}

// Calculates the year and month selected. Takes the number of months represented on the timeline.
function convert_output(sel_months){
    let month = (((ps_start_month() + (sel_months)%12)%12));
    let year = String((Math.floor((parseInt(sel_months)-1 + ps_start_month()) / 12)) + ps_start_year());
    if (year_0()) {                                                                                                   // If year 0 exists
        if (parseInt(year) >= 0)
            year = parseInt(year) + 1;
    }
    return String(year + '-' + (month));
}


// Slider utility functions
// True if extended timeline, else false.
function extended() {
    return(document.getElementById("timeline") == null);
}

// Remove all coloured blocks from the timeline
function clear_map_blocks(){
    document.getElementById("map_block_holder").innerHTML = '';
}


/* Event Listeners */
// Close the dropdown if the user clicks outside of it
window.addEventListener("click", function (event) {
    if(extended()) {
        if (!event.target.matches('#timeline_range') && !event.target.matches('#month_range') && !event.target.matches('#series_min_up')) {
            document.getElementById("month_range").style.display = "none";
            document.getElementById("series_min_up").style.display = "inline-block";
        }
    }
});

/* What are these? */
function max_month_slider() {
    document.getElementById('month_slider').style.display = 'inline-block';
    document.getElementById('month_range').style.display = 'inline-block';
    document.getElementById("series_min_up").style.display = "none";
}