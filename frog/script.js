document.getElementById("back").addEventListener("click", function (event) {
    event.preventDefault();

    if (history.length > 1) {
        history.back();
    } else if (document.referrer) {
        window.location.href = document.referrer;
    }
});
