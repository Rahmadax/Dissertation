function draw_template_element(id, container){
    if (!document.getElementById(id)) {
        min_all_user_boxes();
        let box = document.getElementById(id+"_template");
        let clone = box.content.cloneNode(true);
        document.getElementById(container).appendChild(clone);
    } else {
        document.getElementById(id).style.display = 'block';
    }
}

function draw_marker_popup(){
    if (!document.getElementById('marker_box')) {
        let box = document.getElementById("marker_box_template");
        let clone = box.content.cloneNode(true);
        document.getElementById("wrapper").appendChild(clone);
    }
}

function min_all_user_boxes() {
    let ubs = document.getElementsByClassName('user_box');
    let wrapper = document.getElementsByClassName('wrapper');
    while(ubs[0])
        ubs[0].parentNode.removeChild(ubs[0]);
}

function min_user_box(id){
    document.getElementById(id).style.display = 'none';
}








