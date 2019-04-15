function clear_temp_cookies(){
    sessionStorage.clear();
}

function clear_perm_cookies() {
    localStorage.clear();
}

function clear_unique(){
    localStorage.removeItem('unique');
    sessionStorage.removeItem('unique');
}


function set_series_info(start_date, end_date){
    let end_month, start_month, start_year, end_year;

    if (start_date.getFullYear() < 0) {                             // Accounting for BC dates here. Format alignment
        start_year = parseInt(start_date.getFullYear()) - 1;
        start_month = parseInt(start_date.getMonth()) + 1;
        end_month = parseInt(end_date.getMonth()) + 2;
        if (end_date.getFullYear() < 0) {                           // If end year is also BC
            end_year = parseInt(end_date.getFullYear()) - 1;
        } else {                                                    // Else AD default format
            end_year = parseInt(end_date.getFullYear());
        }
    } else {
        start_year = parseInt(start_date.getFullYear()) ;
        end_year = parseInt(end_date.getFullYear());
        start_month = parseInt(start_date.getMonth()) +1;           // Accounting for format differences PG -> Node
        end_month = parseInt(end_date.getMonth()) +1;
    }
    sessionStorage.setItem('series_start_year', start_year);
    sessionStorage.setItem('series_end_year', end_year);
    sessionStorage.setItem('series_start_month', start_month);
    sessionStorage.setItem('series_end_month', end_month);
}

function set_series(series_unique){
    clear_temp_cookies();
    sessionStorage.setItem('series_unique', series_unique);
}

function login_cookies(unique, check){
    clear_unique();
    if (check)
        localStorage.setItem('unique', unique);
    else
        sessionStorage.setItem('unique', unique);
}

function get_unique(){
    if (localStorage.getItem('unique'))
        return localStorage.getItem('unique');
    else
        return sessionStorage.getItem('unique');
}

function save_overlap(overlap){
    sessionStorage.setItem('overlap', JSON.stringify(overlap));
}

function take_overlap(date){
    date = date.split('-');
    let year = parseInt(date[0]);
    let month = parseInt(date[1]);
    let date_dict = JSON.parse(sessionStorage.getItem('overlap'));
    if (typeof date_dict[year] !== 'undefined') {
        if (typeof date_dict[year][month] !== 'undefined')
            return date_dict[year][month];
        else
            return 0
    } else {
        return 0;
    }
}