
var poly_tracker = [];

let layer_group_ids = [];
let layer_groups = {};
let l_g_id;

function new_layer_group(){
    var layerGroup = L.layerGroup();
    layerGroup.addTo(mymap);    // Adding layer group to map
    let id = layerGroup['_leaflet_id'];
    layer_groups[id] = [layerGroup, []];
    layer_group_ids.push(id);
    l_g_id = id;
}

function draw_poli(){
    let this_polygon_points_arr = extract_points()
    var polygon = L.polygon([
        this_polygon_points_arr
    ]);
    polygon.setStyle(
        {fillColor: '#ff0000', color: '#ff0000', fillRule: "nonzero"});
    polygon.addTo(layer_groups[l_g_id][0]);
}

function add_marker(e){
    var marker = L.marker(e.latlng);
    marker['options']['class'] = 'marker';
    marker.addTo(layer_groups[l_g_id][0]);
    return marker;
}

function onMapClick(e) {
    refresh_poly(layer_groups[l_g_id][0], true);
    let marker = add_marker(e);
    marker.on('click', select_point);
    layer_groups[l_g_id][1].push([e.latlng, marker]);
    draw_poli()
}

function get_layers() {
    console.log(layer_groups[l_g_id][0]);
}

function undo_last_polygon(){
    layer_groups[l_g_id][1].pop();
    let these_layers = layer_groups[l_g_id][0]['_layers'];
    let keys = Object.keys(these_layers);
    let len = keys.length;
    console.log(keys[0]);
    refresh_poly(layer_groups[l_g_id][0], true);
    draw_poli();
}

function extract_points(){
    let this_polygon_points_arr = [];
    for(var i = 0, len = layer_groups[l_g_id][1].length; i < len; i++){
        this_polygon_points_arr.push(layer_groups[l_g_id][1][i][0]);
    }
    return this_polygon_points_arr
}

function restart_polygon(){
    layer_groups[l_g_id][1] = [];
    refresh_poly(layer_groups[l_g_id][0], false);
    draw_poli();
}




function select_point(e){
    console.log(e);
}

function refresh_poly(layer_group, keep_markers) {
    let these_layers = layer_group['_layers'];
    for(let i in these_layers) {
        if (these_layers[i]['options']['class'] !== "marker" || !keep_markers) {
            try {
                layer_groups[l_g_id][0].removeLayer(these_layers[i]);
            } catch (e) {
                console.log("problem with " + e + these_layers[i]);
            }
        }
    }
}


function save_to_DB(){
    upload_map_points(this_polygon_points_arr, 'polygon');
}

mymap.on('click', onMapClick);



