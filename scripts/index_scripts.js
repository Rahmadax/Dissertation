
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




/* Creates and Adds event boxes to right hand scroll box */
function draw_event_box(title, description, start_date, end_date, color, starting_loc){
    let s1 = new Date(start_date);
    let e1 = new Date(end_date);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let new_event_box = document.createElement("div");
    new_event_box.setAttribute("class", "event_box");
    new_event_box.setAttribute("onclick", "change_location(" + starting_loc['x'] + ',' + starting_loc['y'] + ")");

    /* Adding an event box title */
    let new_event_box_title = document.createElement("div");
    new_event_box_title.setAttribute("class", "event_box_title");
    let new_event_box_title_p = document.createTextNode(title);
    new_event_box_title.appendChild(new_event_box_title_p);
    new_event_box.appendChild(new_event_box_title);

    /* Adding an event box date */
    let new_event_box_date = document.createElement("div");
    new_event_box_date.setAttribute("class", "event_box_date");
    let new_event_box_date_p;

    let start_day = s1.getDate();
    let start_month = s1.getMonth();
    let start_year = s1.getFullYear();
    let end_day = e1.getDate();
    let end_month = e1.getMonth();
    let end_year = e1.getFullYear();

    if (start_year === end_year && start_month === end_month && start_day === end_day)
        new_event_box_date_p = document.createTextNode(start_day + " " + months[start_month] + " " + start_year);
    else if (start_year === end_year && start_month === end_month && start_day !== end_day)
        new_event_box_date_p = document.createTextNode(start_day + " - "
            + end_day + " " + months[end_month] + ", " + end_year );
    else if (start_year === end_year && (start_month !== end_month || start_day !== end_day))
        new_event_box_date_p = document.createTextNode(start_day + " " + months[start_month]
            + " - " + end_day + " " + months[end_month] + ", " + end_year );
    else
        new_event_box_date_p = document.createTextNode(start_day + " " + months[start_month] + " " + start_year
            + " - " + end_day + " " + months[end_month] + " " + end_year );

    new_event_box_date.appendChild(new_event_box_date_p);
    new_event_box.appendChild(new_event_box_date);

    /* Append everything together */
    let new_event_box_description = document.createElement("div");
    new_event_box_description.setAttribute("class", "event_box_description");
    let new_event_box_description_p = document.createTextNode(description);
    new_event_box_description.appendChild(new_event_box_description_p);
    new_event_box.appendChild(new_event_box_description);

    /* Add to Page */
    let event_bar = document.getElementById("events_tab");
    event_bar.appendChild(new_event_box);
}





function draw_series_box(id, title, description, start_date, end_date){
    let s1 = new Date(start_date);
    let e1 = new Date(end_date);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let new_event_box = document.createElement("div");
    new_event_box.setAttribute("class", "event_box");
    new_event_box.setAttribute("onclick", "select_series("+id+")");

    /* Adding an event box title */
    let new_event_box_title = document.createElement("div");
    new_event_box_title.setAttribute("class", "event_box_title");
    let new_event_box_title_p = document.createTextNode(title);
    new_event_box_title.appendChild(new_event_box_title_p);
    new_event_box.appendChild(new_event_box_title);

    /* Adding an event box date */
    let new_event_box_date = document.createElement("div");
    new_event_box_date.setAttribute("class", "event_box_date");
    let new_event_box_date_p;

    let start_day = s1.getDate();
    let start_month = s1.getMonth();
    let start_year = s1.getFullYear();
    let end_day = e1.getDate();
    let end_month = e1.getMonth();
    let end_year = e1.getFullYear();

    if (start_year === end_year && start_month === end_month && start_day === end_day)
        new_event_box_date_p = document.createTextNode(start_day + " " + months[start_month] + " " + start_year);
    else if (start_year === end_year && start_month === end_month && start_day !== end_day)
        new_event_box_date_p = document.createTextNode(start_day + " - "
            + end_day + " " + months[end_month] + ", " + end_year );
    else if (start_year === end_year && (start_month !== end_month || start_day !== end_day))
        new_event_box_date_p = document.createTextNode(start_day + " " + months[start_month]
            + " - " + end_day + " " + months[end_month] + ", " + end_year );
    else
        new_event_box_date_p = document.createTextNode(start_day + " " + months[start_month] + " " + start_year
            + " - " + end_day + " " + months[end_month] + " " + end_year );

    new_event_box_date.appendChild(new_event_box_date_p);
    new_event_box.appendChild(new_event_box_date);

    /* Append everything together */
    let new_event_box_description = document.createElement("div");
    new_event_box_description.setAttribute("class", "event_box_description");
    let new_event_box_description_p = document.createTextNode(description);
    new_event_box_description.appendChild(new_event_box_description_p);
    new_event_box.appendChild(new_event_box_description);

    /* Add to Page */
    let series_bar = document.getElementById("seriess_tab");
    series_bar.appendChild(new_event_box);
}
