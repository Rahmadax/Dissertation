// log the user out
function user_logout() {
    let unique = localStorage.getItem('unique');
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/users/log_out', true);
    xhr.onload = function(){
        clear_unique();
        location.replace('/logged_out_index');
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        unique: unique
    }));
}

// Log the user in
function user_login() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/users/login', true);
    xhr.onload = function(){
        login_cookies(this.responseText);
    };
    xhr.send();
}

// Is user Logged in?
function user_logged_in() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/users/logged_in', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        unique: localStorage.getItem('unique')
    }));
}

// Create a new user account.
function create_user(username, password, email) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/users/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        username: username,
        password: password,
        email: email
    }));
}

// Is user Logged in?
function flip_view_admin() {
    let truth = false;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'users/flip', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        console.log('done')
    };
    xhr.send(JSON.stringify({
        unique: localStorage.getItem('unique'),
        truth: !truth
    }));
}

function get_unique(){
    if (localStorage.getItem('unique') != null)
        return localStorage.getItem('unique');
    else
        return sessionStorage.getItem('unique');
}