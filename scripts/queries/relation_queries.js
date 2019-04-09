function create_new_relation(userID_1, userID_2, type, status){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/maps/get_events_handler', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
    };
    xhr.send(JSON.stringify({
        userID_1: userID_1,
        userID_2: userID_2,
        type: type,
        status: status
    }));
}