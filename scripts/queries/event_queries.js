function handle_event_gen(events){
    for (let i = 0; i < events.length; i++){
        let ev = events[i];
        draw_event_box(ev['title'], ev['description'], ev['date_start'], ev['date_end'], ev['color'], ev['starting_loc']);
    }
}