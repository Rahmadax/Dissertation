// ===================== File for scripts that are used commonly and broadly. ===================================== //

function display_dropdown(id) {
    let drop = document.getElementById(id+"_down");
    drop.style.display = "block";
}

function notifications_drop(){
    let right = document.getElementById('notification_box').getBoundingClientRect().right;
    let elem = document.getElementById('notification_box_drop');
    elem.style.left = right+'px';
    elem.style.display = 'block'
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.drop_button')) {
        let drop = document.getElementsByClassName("drop");
        for (let i = 0; i < drop.length; i++)
            drop[i].style.display = "none";
    }
};

function gen_alert_box(error){
    let id = document.getElementsByClassName('alert_box').length + 1;
    let alert_box = document.createElement("div");
    alert_box.setAttribute("class", "alert_box");
    alert_box.setAttribute("id", "alert_box_" + id + "_cont");

    let alert_box_alert = document.createElement("div");
    alert_box_alert.setAttribute("class", "alert_box_alert");
    alert_box.appendChild(alert_box_alert);
    let alert_box_alert_p = document.createElement("p");
    alert_box_alert.appendChild(alert_box_alert_p);
    alert_box_alert_p.innerText = error;

    let alert_box_button = document.createElement("button");
    alert_box_button.setAttribute("class", "alert_box_button");
    alert_box_button.setAttribute("onmousedown", "close_alert_box(this.id)");
    alert_box_button.setAttribute("id", "alert_box_" + id);

    alert_box.appendChild(alert_box_button);
    alert_box_button.innerText = "Okay";
    document.getElementById('wrapper').appendChild(alert_box);
    ab_animate(id);
}
function ab_animate(id) {
    document.getElementById("alert_box_" + id + "_cont").setAttribute('class', 'alert_box ab_slide_in')
}

function close_alert_box(id) {
    let wrapper = document.getElementById('wrapper');
    let elem = document.getElementById(id+"_cont");
    wrapper.removeChild(elem);
}

function drag_div() {
    while (document.getElementById('user_tools_box')) {
        dragElement("user_tools");
    }
}

function dragElement(element) {
    element = document.getElementsByClassName(element+'_box');
    console.log(element);
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(element+'_box')) {
        // if present, the header is where you move the DIV from:
        document.getElementById(element+'_box').onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


// Quick calls for parsed series information.
function ps_start_year(){
    return parseInt(sessionStorage.getItem('series_start_year'));
}

function ps_end_year(){
    return parseInt(sessionStorage.getItem('series_end_year'));
}

function ps_start_month(){
    return parseInt(sessionStorage.getItem('series_start_month'));
}

function ps_end_month(){
    return parseInt(sessionStorage.getItem('series_end_month'));
}

function render_check(route, redirect, origin){
    let login;
    if (localStorage.getItem('unique') == null && (sessionStorage.getItem('unique') == null) && !origin)
        location.replace('/logged_out_index');
    if (localStorage.getItem('unique') != null)
        login = localStorage.getItem('unique');
    else if (sessionStorage.getItem('unique') != null)
        login = sessionStorage.getItem('unique');

    if (login != null){
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/users/logged_in', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (redirect) {
                if (this.responseText === 'true')
                    location.replace(route);
                else if (!origin)
                    location.replace('/logged_out_index');
            }
        };
        xhr.send(JSON.stringify({
            unique: login
        }));
    }
}