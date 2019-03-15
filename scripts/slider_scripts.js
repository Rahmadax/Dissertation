

function update_slider(start_year, end_year) {
    let range = document.getElementById('timeline_range');
    range.setAttribute('min', start_year);
    range.setAttribute('max', end_year);
    document.getElementById('series_start_year').innerText = start_year;
    document.getElementById('series_end_year').innerText = end_year;
}

function slider_val_change(val) {
    document.getElementById('slider_output').innerHTML = val;
    document.getElementById("slider_output").style.display = "inline-block";
}

function slider_select(val) {
    document.getElementById('month_slider').style.display = 'inline-block';
    document.getElementById('month_range').style.display = 'inline-block';
    document.getElementById("series_min_up").style.display = "none";
    /*
    let xhr = new XMLHttpRequest();
    xhr.open("GET", '/maps/get_maps_between', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        d: val
    }));
    */
}

function month_slider_val_change(val) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById("month_output").style.display = "inline-block";
    document.getElementById('month_output').innerText = months[val-1];

}

function month_slider_select(val) {

}

function max_month_slider() {
    document.getElementById('month_slider').style.display = 'inline-block';
    document.getElementById('month_range').style.display = 'inline-block';
    document.getElementById("series_min_up").style.display = "none";
}


/* Event Listeners */
// Close the dropdown if the user clicks outside of it

window.addEventListener("click", function (event) {
    if (!event.target.matches('#timeline_range') && !event.target.matches('#month_range') && !event.target.matches('#series_min_up')) {
        document.getElementById("month_range").style.display = "none";
        document.getElementById("series_min_up").style.display = "inline-block";
    }
});

function slide() {
    document.getElementById('timeline')
}

function add_map_blocks(map_dates){
    let dates = get_overlap(map_dates);
    let overlap = dates[0];
    let m_dates = dates[1];

    let block_holder = document.getElementById('map_block_holder');
    let new_block = document.createElement('div');
    new_block.setAttribute('class', 'map_block');
    block_holder.appendChild(new_block);
}