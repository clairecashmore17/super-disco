// Get today's date and display on the front
var dateToday = new Date();
var events = {};
document.getElementById("date-time").innerHTML=dateToday.toDateString();



// edit the empty time block description
$(".description").on("click", "p", function(){
    var text = $(this)
    .text()
    .trim();
  
    var textInput = $("<textarea>")
    .addClass("description-text-box")
    .val(text);
    
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
  });
// when user clicks off screen, does not alter the written description
  $(".description").on("blur", "p", function(){
    // get the textarea's current value/text
    var text = $(this)
      .val()
      .trim();
  
    // IN LOCAL STORAGE, UPDATE HERE!!!
    // As per requirements, I do not believe we need to save here.
    //************* */
    // recreate p element
    var taskP = $("<p>")
    .addClass("m-1")
    .text(text);

    //repalce textarea with p element
    $(this).replaceWith(taskP);
    
  });

  //Button click save events for every specific hour -- SAVES ALL, CANNOT FIGURE HOW TO SAVE INDIVIDUAL
  $("#btn-save").click(function(){
    console.log("save button clicked");
    //get the value from our description block in specified hours
    var hr8am = document.getElementById("8am").value;
    console.log(hr8am);
    var hr9am = document.getElementById("9am").value;
    console.log(hr9am);

  })
