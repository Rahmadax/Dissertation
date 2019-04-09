
function box_add_title(title, append_box){
    /* Adding an event box title */
    let new_event_box_title = document.createElement("div");
    new_event_box_title.setAttribute("class", "event_box_title");
    let new_event_box_title_p = document.createTextNode(title);
    new_event_box_title.appendChild(new_event_box_title_p);
    append_box.appendChild(new_event_box_title);
}

function box_add_description(description, append_box){
    /* Append everything together */
    let new_event_box_description = document.createElement("div");
    new_event_box_description.setAttribute("class", "event_box_description");
    let new_event_box_description_p = document.createTextNode(description);
    new_event_box_description.appendChild(new_event_box_description_p);
    append_box.appendChild(new_event_box_description);
}

function box_add_dates(start_date, end_date, append_box){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    start_date = prepare_date_BC(start_date);
    end_date = prepare_date_BC(end_date);

    /* Adding an event box date */
    let new_event_box_date = document.createElement("div");
    new_event_box_date.setAttribute("class", "event_box_date");
    let new_event_box_date_p;

    let start_day = start_date[2];
    let start_month = start_date[1];
    let start_year = start_date[0];
    let end_day = end_date[2];
    let end_month = end_date[1];
    let end_year = end_date[0];

    if (start_year === end_year && start_month === end_month && start_day === end_day)
        new_event_box_date_p = document.createTextNode(start_day + " " + months[start_month] + " " + start_year);
    else if (start_year === end_year && start_month === end_month && start_day !== end_day)
        new_event_box_date_p = document.createTextNode(start_day + " - " + end_day + " " + months[end_month] + ", " + end_year );
    else if (start_year === end_year && (start_month !== end_month || start_day !== end_day))
        new_event_box_date_p = document.createTextNode(start_day + " " + months[start_month] + " - " + end_day + " " + months[end_month] + ", " + end_year );
    else
        new_event_box_date_p = document.createTextNode(start_day + " " + months[start_month] + " " + start_year + " - " + end_day + " " + months[end_month] + " " + end_year );
    new_event_box_date.appendChild(new_event_box_date_p);
    append_box.appendChild(new_event_box_date);
}


function min_timeline(){
    document.getElementById('timeline').setAttribute('class', 'slide_out');
    // Simulate a code delay
    setTimeout( function(){
        document.getElementById('max_up').style.display = 'block';
        document.getElementById('timeline').style.display = 'none';
        document.getElementById('timeline').setAttribute('class', '');
    }, 1000 );
}

function max_timeline(){
    document.getElementById('timeline').style.display = 'block';
    document.getElementById('timeline').setAttribute('class', 'slide_in');
    document.getElementById('max_up').style.display = 'none';
}
