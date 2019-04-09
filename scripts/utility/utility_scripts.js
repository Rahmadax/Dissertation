// ===================== File for unusual scripts that are used rarely, but broadly. ===================================== //

function min_login_box(){
    document.getElementById('login_box').style.display = "none";
}

function get_month(val){
    val = parseInt(val)-1;
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[(val+ps_start_month())%12];
}

function get_year(val){
    let series_start_year = sessionStorage.getItem('series_start_year');
    let series_end_year = sessionStorage.getItem('series_end_year');
    let year;

    if (series_start_year < 0 && series_end_year > 0) { // If year 0 exists
        year = Math.floor(val / 12) + ps_start_year();
        if (year >= 0)
            year += 1;
    } else {
        year = Math.floor(val/12) + ps_start_year();
    }
    return year;
}

/*
window.onload = function() {
    user_logged_in();
};
*/

// Send String(Dates) of format "yyyy-mm-dd" BC, becomes "-00yyyy-mm-dd" (Required, weird JS BC date format). Then chop date to usable components. Return array
function chop_BC(date, first){
    let year;
    if (date.includes(' BC')) {
        let sliced_date = date.split(' BC')[0];
        sliced_date = sliced_date.split('-');
        if (first)                                                                                  // Have to adjust date to account for weird JS date format. Only when retrieving from DB though.
            year = sliced_date[0] - 1;
        else
            year = sliced_date[0];
        while (year.length !== 6)                                                                   // Pad out the string with required 0s
            year = '0' + year;
        sliced_date = ([('-' + year), sliced_date[1], sliced_date[2]]);
        return(sliced_date);
    }
    return(date.split('-'));
}

// As above, but for DB queries. Requires slightly different format. Return complete date string.
function prepare_date_for_db(date){
    let append;
    if (date[0] === '-'){
        date = date.substring(1,date.length);
        append = '-01 BC';
    } else
        append = '-01';
    date = date.split('-');
    let month = (parseInt(date[1]));
    if (month === 0)
        month = 12;
    while (date[0].length < 4) // Pad out to avoid XX-MM-DD becoming 19XX-MM-DD.
        date[0] = '0' + date[0];
    return (date[0] + '-' + month + append);
}

// As above, reversed. For upload to DB. Checks if BC first. Else, return original input. Chop up string to usable parts.
function prepare_date_BC(date) {
    if (date.includes('BC')){
        date = date.split(' BC')[0];
        date = date.split('-');
        date[0] = date[0].substr(2,date.length);
        return ([date[0] +' BC',date[1]-1,date[2]]);
    } else {
        let temp = date.split('-');
        return ([parseInt(temp[0]), temp[1]-1, temp[2]]);
    }
}


// Does year 0 exist in the series? For cancelling out extra year.
function year_0(){
    return (ps_start_year() < 0 && ps_end_year() > 0);
}

// Is there series all AD?
function is_AD(){
    return (ps_start_year() > 0 && ps_end_year() > 0);
}

// Is the series all BC?
function is_BC(){
    return (ps_start_year() < 0 && ps_end_year() < 0);
}
