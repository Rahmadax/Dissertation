// log the user out
function user_logout() {
    // Need cookies here.
    var unique = "eve-test";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/users/log_out', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        unique: unique
    }));
}

// Log the user in
function user_login() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/users/login', true);
    xhr.send();
}

// Is user Logged in?
function user_logged_in() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/users/logged_in', true);
    xhr.onload = function () {
        let users = JSON.parse(this.responseText);
    };
    xhr.send();
}

// Create a new user account.
function create_user(username, password, email) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/users/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        username: username,
        password: password,
        email: email
    }));
}