let isShown = false;
$("#nav img").click((e) => {
    if (isShown) {
        $("#nav ul").animate({
            "opacity": "0",
            "height": "0"
        }, 200);
    } else {
        $("#nav ul").animate({
            "opacity": "1",
            "height": "200px"
        }, 200);
    }
    isShown = !isShown;
});