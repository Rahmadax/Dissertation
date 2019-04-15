function create_new_relation(unique, username_2, type){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/relations/create_relation', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        gen_alert_box(this.responseText);
    };
    xhr.send(JSON.stringify({
        unique: unique,
        username_2: username_2,
        type: type
    }));
}

function get_relations(){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/relations/get_relations_from_unique', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        let res = JSON.parse(this.responseText);
        draw_relation_boxes(res[0], "friend","user_tools_friend_box");
        draw_relation_boxes(res[1], "blocked","user_tools_blocked_box");
    };
    xhr.send(JSON.stringify({
        unique: get_unique()
    }));
}

function get_shared_series(){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/relations/get_shared_series_from_unique', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
    };
    xhr.send(JSON.stringify({
        unique: get_unique()
    }));
}