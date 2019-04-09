/* 1 run per new series */
// When a new
function update_slider(start_date, end_date, type) {
    let range = document.getElementById('timeline_range');
    if (type === "extended") {
        range.setAttribute('min', ps_start_year());
        range.setAttribute('max', ps_end_year() + 2);
        document.getElementById('series_start_year').innerText = ps_start_year();
        document.getElementById('series_end_year').innerText = ps_end_year();
        document.getElementById('series_end_year').style.right = (((1 / (ps_end_year() - ps_start_year() + 1)) * 100) + "%")
    } else {
        range.setAttribute('min', '0');
        if (year_0())
            range.setAttribute('max', ((ps_end_year()-ps_start_year()-2)*12) + (12-ps_start_month())+ps_end_month()+1);
        else
            range.setAttribute('max', ((ps_end_year()-ps_start_year()-1)*12) + (12-ps_start_month())+ps_end_month()+1);
        document.getElementById('series_start_year').innerText = ps_start_year();
        document.getElementById('series_end_year').innerText = ps_end_year();
    }
}

// Calculates the positions of the coloured timeline blocks and displays them on the timeline.
function add_map_blocks(map_dates){
    // let overlap = get_overlap(map_dates)[0];
    let offset_ratio;
    if (year_0())
        offset_ratio = ((ps_end_year() - ps_start_year() - 2) * 12) + (12 - ps_start_month() + ps_end_month() + 1);
    else
        offset_ratio = ((ps_end_year() - ps_start_year() - 1) * 12) + (12 - ps_start_month() + ps_end_month() + 1);

    // Add Date Blocks.
    let block_holder = document.getElementById('map_block_holder');
    for (let i = 0; i < map_dates.length; i++) {
        let this_map = map_dates[i];
        let tm_start_year = parseInt(this_map[0]);
        let tm_end_year = parseInt(this_map[2]);
        let tm_start_month = parseInt(this_map[1]);
        let tm_end_month = parseInt(this_map[3]);

        let new_block = document.createElement('div');
        new_block.setAttribute('class', 'map_block');
        let total_months;
        if (tm_start_year === tm_end_year)
            total_months = tm_end_month - tm_start_month+1;
        else
            total_months = (((tm_end_year - tm_start_year-1)*12) + tm_end_month + 12 - tm_start_month+1);
        // Account for final edge cases because of 0 year.
        if (year_0() && tm_start_year < 0 && tm_end_year > 0)   // Maps that cross between AD and BC
            total_months = total_months - 12;
        else if (year_0() && tm_start_year> 0) // Maps with year 0, but entirely in AD.
            tm_start_year -= 1;

        new_block.style.left = (((((tm_start_year - ps_start_year())*12) + (tm_start_month - ps_start_month()))/offset_ratio) *100 + '%');
        new_block.style.width = ((total_months  / offset_ratio) *100 + '%');
        new_block.style.backgroundColor = map_dates[i][4];
        block_holder.appendChild(new_block);
    }
    /*
    // Overlap Blocks
    let k = Object.keys(overlap);
    for (let j = 0; j < k.length; j++){
        let this_block = overlap[k[j]];
        let block_holder = document.getElementById('map_block_holder');
        let new_block = document.createElement('div');
        new_block.setAttribute('class', 'map_block_overlap');
        new_block.style.width = (1 / offset_ratio * 100 + "%");
        new_block.style.left = ((((this_block[0] - ps_start_year())*12 + (this_block[1] - ps_start_month())) / offset_ratio * 100)+ '%');
        new_block.style.backgroundColor = "black";
        block_holder.appendChild(new_block);
    }
    */
}


/* Given an array of [start_date, end_date] of maps, returns a list of years that have overlapping maps.  */
function get_overlap(maps){
    let year_dict = {};
    let min, max;
    // Calculate which months have maps.
    for (let i = 0; i < maps.length; i++) { // For each map
        for (let j = maps[i][0]; j <= maps[i][2]; j++){ // Between start year and end year.
            if (year_dict[j] == null)
                year_dict[j] = {};

            if (maps[i][0] == maps[i][2]) { // If map has only 1 year
                min = maps[i][1];
                max = maps[i][3];
            } else if (j == maps[i][0]) { // If first year of a map
                min = maps[i][1];
                max = 11;
            } else if (j == maps[i][2]) { // If last year of a map.
                min = 0;
                max = maps[i][3];
            } else if (j > maps[i][0] && j < maps[i][2]) { // If middle year of a map.
                min = 0;
                max = 11;
            }
            min = parseInt(min);
            max = parseInt(max);
            for (let k = min; k <= max; k++) { // Between start and end month
                if (year_dict[j][k] > 0)
                    year_dict[j][k] = year_dict[j][k] + 1; // Increment month counter.
                else
                    year_dict[j][k] = 1;
            }
        }
    }
    // Calculate overlap
    let output = [];
    let year_keys = Object.keys(year_dict);
    for (let i = 0; i < year_keys.length; i++){ // For each year in dictionary
        let month_keys = Object.keys(year_dict[year_keys[i]]);
        for (let j = 0; j < month_keys.length; j++){ // For each month in each year
            let num = year_dict[year_keys[i]][month_keys[j]];
            if (num > 1){ // If more than one map shares a month.
                output.push([year_keys[i], month_keys[j], num])
            }
        }
    }
    return([output, year_dict]);
}