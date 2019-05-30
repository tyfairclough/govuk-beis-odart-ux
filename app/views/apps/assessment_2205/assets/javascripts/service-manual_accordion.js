$(".js-accordion-with-descriptions .subsection__content").hide();
$(".subsection__header").click(function(e){
  e.preventDefault();
  $(this).next().toggle();
  $(this).parent().toggleClass("subsection--is-open");
  // $(".subsection__icon",this).css("background-color","red");
})

$(".subsection-controls").click(function(e){
  e.preventDefault();
  $(".subsection").toggleClass("subsection--is-open");
  $(".subsection .subsection__content").toggle();
  $("button",this).text(function(i, text){
    return text === "Close all" ? "Open all" : "Close all";
})
})
