// log the user out
function user_logout() {
    let unique = localStorage.getItem('unique');
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/users/log_out', true);
    xhr.onload = function(){
        clear_perm_cookies();
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
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/users/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        username: username,
        password: password,
        email: email
    }));
}

function login_verification(){
    let username = document.getElementById('login_username').value;
    let password = document.getElementById('login_password').value;
    if (username === '') {
        gen_alert_box('Please enter a username');
    } else if (password === '') {
        gen_alert_box('Please enter a password')
    } else if (username === 'username') {
        gen_alert_box('Nice try.')
    } else if (username === 'a username' || password === 'a password'){
        gen_alert_box('Sigh...')
    } else {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/users/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (this.responseText === 'error'){
                gen_alert_box('Username or Password not found.')
            } else {
                let res = JSON.parse(this.responseText);
                let unique = res[0];
                document.getElementById('profile_drop').innerText = res[1];
                localStorage.setItem('unique', unique);
                load_seriess(unique)
            }
        };
        xhr.send(JSON.stringify({
            username: String(username),
            password: String(password)
        }));

        min_login_box();
    }



}