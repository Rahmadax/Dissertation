// Generate login box
function draw_login_box(){
    if (!document.getElementById('login_box')) {
        let login_box = document.createElement("div");
        let login_cross = document.createElement("div");
        let login_username_image = document.createElement("div");
        let login_need_account = document.createElement("div");
        let login_password_image = document.createElement("div");
        let login_bottom_box = document.createElement("div");
        let login_username = document.createElement("input");
        let login_password = document.createElement("input");
        let login_checkbox = document.createElement("input");
        let login_select_button = document.createElement("button");
        let login_CB_text = document.createElement("p");
        let login_additional_text = document.createElement("p");
        let login_new_account_a = document.createElement("a");

        login_box.setAttribute('id', 'login_box');
        login_username.setAttribute('id', 'login_username');
        login_username_image.setAttribute('id', 'login_username_image');
        login_need_account.setAttribute('id', 'login_need_account');
        login_password.setAttribute('id', 'login_password');
        login_password_image.setAttribute('id', 'login_password_image');
        login_CB_text.setAttribute('id', 'login_CB_text');
        login_checkbox.setAttribute('id', 'login_checkbox');
        login_select_button.setAttribute('id', 'login_select_button');
        login_bottom_box.setAttribute('id', 'login_bottom_box');

        login_cross.setAttribute('class', 'close');
        login_cross.setAttribute('onclick', 'min_login_box()');
        login_username.setAttribute('value', 'Username');
        login_password.setAttribute('value', 'Password');
        login_password.setAttribute('type', 'password');
        login_checkbox.setAttribute('type', 'checkbox');
        login_select_button.setAttribute('onclick', 'login_verification()');

        login_box.appendChild(login_cross);
        login_box.appendChild(login_username);
        login_box.appendChild(login_username_image);
        login_need_account.appendChild(login_new_account_a);
        login_box.appendChild(login_need_account);
        login_box.appendChild(login_password);
        login_box.appendChild(login_password_image);
        login_CB_text.innerHTML = "Keep me logged in";
        login_box.appendChild(login_CB_text);
        login_box.appendChild(login_checkbox);
        login_select_button.innerHTML = "Login";
        login_box.appendChild(login_select_button);
        login_additional_text.innerHTML = "<p>Forgot your password?<a>  Press here</a></p>";
        login_bottom_box.appendChild(login_additional_text);
        login_box.appendChild(login_bottom_box);
        document.getElementById('wrapper').appendChild(login_box);
    } else {
        document.getElementById('login_box').style.display = 'block';
    }
}

// Generate login box
function draw_create_account_box(){
    if (!document.getElementById('ca_box')) {
        let ca_box = document.createElement("div");
        let ca_cross = document.createElement("div");
        let ca_username = document.createElement("input");
        let ca_password = document.createElement("input");
        let ca_email = document.createElement("input");
        let ca_select_button = document.createElement("button");

        ca_box.setAttribute('id', 'ca_box');
        ca_username.setAttribute('id', 'ca_username');
        ca_password.setAttribute('id', 'ca_password');
        ca_email.setAttribute('id', 'ca_email');
        ca_select_button.setAttribute('id', 'ca_select_button');
        ca_cross.setAttribute('class', 'close');
        ca_cross.setAttribute('onclick', 'min_ca_box()');
        ca_username.setAttribute('value', 'Username');
        ca_password.setAttribute('value', 'Username');
        ca_email.setAttribute('value', 'Username');
        ca_select_button.setAttribute('onclick', 'create_account_verification()');

        ca_box.appendChild(ca_cross);
        ca_box.appendChild(ca_username);
        ca_box.appendChild(ca_password);
        ca_box.appendChild(ca_select_button);
        ca_box.appendChild(ca_select_button);
        document.getElementById('wrapper').appendChild(ca_box);
    } else {
        document.getElementById('ca_box').style.display = 'block';
    }
}