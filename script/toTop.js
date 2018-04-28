$(document).ready(function(){
  $("#top").click(function(){
    $("html, body").animate({scrollTop: 0},{duration: 200, easing: "swing"});
    return false;
  });
});
