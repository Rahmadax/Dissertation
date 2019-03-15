
function display_dropdown(id) {
    let drop = document.getElementById(id+"_down");
    drop.style.display = "block";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.drop_button')) {
        let drop = document.getElementsByClassName("drop");
        for (let i = 0; i < drop.length; i++)
            drop[i].style.display = "none";
    }
};
