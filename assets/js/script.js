// Get today's date and display on the front
var dateToday = new Date();
//logged in military time here so we don't have to worry about am/pm
var events = {
  "8":[],
  "9": [],
  "10": [],
  "11": [],
  "12": [],
  "13":[],
  "14":[],
  "15":[],
  "16":[],
  "17":[]
};
//Display the date to the spot on our page with date-time id
document.getElementById("date-time").innerHTML=dateToday.toDateString();


// function to audit time and organize into sections
// This is taken almost directly from the TaskmasterPro assignment 
function auditEvent() {
  var presentHour = moment().hour();
  console.log(presentHour);
  // find the hour of each section
  $("textarea").each(function(){
    //grab the hour associated with the event through its id (military time)
    var eventHour = parseInt($(this).attr("id"));
    console.log(eventHour);

    // determine whether that block is in the past, present, or future
    if(eventHour < presentHour){
      //alter the element css class to make it red
      console.log(eventHour + " was less than " + presentHour);
      $(this)
        .removeClass("present-red", "future-green")
        .addClass("past-gray");
    }
    else if (eventHour == presentHour) {
      console.log(eventHour + " was equal to " + presentHour);
      $(this)
        .removeClass("past-gray","future-green")
        .addClass("present-red");
    }
    else if( eventHour > presentHour) {
      console.log(eventHour + " was more than " + presentHour);
      $(this)
      .removeClass("present-red", "past-gray")
      .addClass("future-green")
    }
  })
}

//load our events if we have any
function loadEvents() {
  var loadedEvents = JSON.parse(localStorage.getItem("events"));

  //if our storage has contents
  if(loadedEvents){
    events = loadedEvents;

    //place into corresponding hours
    $.each(events, function(hour,singleEvent){
      // console.log(singleEvent);
      // console.log(hour);
      //Create the id as the hour number
      var hourId = $("#" + hour)
      //create our events
      // console.log(hourId);
      var eventSection = hourId.find("event");

      //this currently replaces all event p's with this, does not work correctly
      var eventP = $("textarea")
      .addClass("description")
      .text(singleEvent);

      auditEvent();
    })
    
  }
}

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
    var eventP = $("<p>")
    .addClass("m-1")
    .text(text);

    //repalce textarea with p element
    $(this).replaceWith(eventP);
    
  });

  //Button click save events for every specific hour 
  $(".btn-success").click(function(){
    console.log("save button clicked");
    // grab elements we desire
    var eventText = $(this).closest(".time-block");
    var textContent = eventText.find("textarea");

    // find what time it is
    var time = textContent.attr("id");
    var text= textContent
      .val()
      .trim();

      //put into our object
      events[time] = [text];

      //save to local storage
      localStorage.setItem("events", JSON.stringify(events));

  })
  auditEvent();
  loadEvents();
