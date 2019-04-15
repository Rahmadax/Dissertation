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
                login_cookies(res[0], document.getElementById('login_checkbox').checked);
                close_popup('login_box');
                location.replace('/index');
            }
        };
        xhr.send(JSON.stringify({
            username: String(username),
            password: String(password)
        }));
    }
}

function create_account_verification(){
    let username = document.getElementById('ca_username').value;
    let password = document.getElementById('ca_password').value;
    let email = document.getElementById('ca_email').value;
    if (username === '') {
        gen_alert_box('Please enter a username');
    } else if (password === '') {
        gen_alert_box('Please enter a password')
    } else if (email === '') {
        gen_alert_box('Please enter an email address')
    } else if (email.match([/a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g])){
        gen_alert_box('Email is not in the correct format: X@Y.Z')
    } else {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/users/create', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            let res = JSON.parse(this.responseText);
            if (res[1] === true){
                login_cookies(res[0], false);
                location.replace('/index');
            } else {
                gen_alert_box(res[0]);
            }
        };

        xhr.send(JSON.stringify({
            username: String(username),
            password: String(password),
            email: String(email)
        }));
    }
}
