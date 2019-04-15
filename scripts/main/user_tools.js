function tools_change_tab(tab){
    let tabs = document.getElementsByClassName('tools_tab');
    for (let i = 0; i < tabs.length; i++)
        tabs[i].style.display = 'none';
    document.getElementById(tab).style.display = 'block'
}

function draw_relation_boxes(arr, type, container){
    document.getElementById(container).innerHTML = '';
    let template = type + "_tab_template";
    for (let i = 0; i < arr.length; i++){
        let box = document.getElementById(template);
        let clone = box.content.cloneNode(true);
        document.getElementById(container).appendChild(clone);
    }
}

function handle_user_tools_load(){
    get_relations();
    // let shared_series = get_shared_series();
}


function user_interaction(type) {
    let username = document.getElementById('user_tools_user_input').value;
    create_new_relation(get_unique(), username, type);
}

function check_notifications() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/relations/check_notifications', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        let res = JSON.parse(this.responseText);
        let alert_num = res.length;
        if (alert_num > 0) {
            let elem = document.getElementById('notification_box');
            elem.innerText = alert_num;
            elem.style.display = 'block'

        }
    };
    xhr.send(JSON.stringify({
        unique: get_unique()
    }));
}
