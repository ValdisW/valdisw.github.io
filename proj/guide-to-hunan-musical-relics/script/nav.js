let isShown = false;
$("#nav-icon").click((e) => {
  $("#down-triangle").toggleClass("add_transform");
  if (isShown) {
    $("#nav ul").animate({ opacity: "0", height: "0" }, 200);
    // $("#down-triangle").animate({ top: "5.2vmax" }, 200);
  } else {
    $("#nav ul").animate({ opacity: "1", height: "192px" }, 200);
    // $("#down-triangle").animate({ top: "6.6vmax" }, 200);
  }
  isShown = !isShown;
});
