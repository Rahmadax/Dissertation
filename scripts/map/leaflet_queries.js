function upload_map_points(points, type){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/coords/upload_map_points', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        gen_alert_box(this.responseText);
    };
    xhr.send(JSON.stringify({
        points: points,
        type: type
    }));
}