$(document).ready(function() {
  var lat;
  var lon;
  var cTemp;
  var fTemp;
  var imgs = [];

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }

  function showPosition(position) {
    lat = Number(position.coords.latitude);
    lon = Number(position.coords.longitude);
    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
    console.log(url);
    
    $.getJSON(url, function(json) {
      cTemp = Math.floor(json.main.temp);
      fTemp = Math.floor(cTemp * (9/5) + 32);
      setContent(json);
      setBackground(json);
    });
  }
  
  function setContent(json) {
      $("#place").html(json.name);
      $("#temp").html(cTemp + "°C");
      $("#desc").html(json.weather[0].description);
  }
  
  function setBackground(json) {
    if(Number(json.main.temp) < 0 ) { $("body").css("background", 'url(https://images.unsplash.com/photo-1499715008769-aa2cf0aaad5b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=020d47e846ad1fe3698f4a3b96d7dd49) no-repeat'); } else
    if(json.weather[0].main === "Clouds") { $("body").css("background", 'url(https://images.unsplash.com/photo-1486339350933-d24faf16ca70?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=efdebf9a0bf8dd83d9ee941f10cd2277) no-repeat'); } else
    if(json.weather[0].main === "Rain") { $("body").css("background", 'url(https://images.unsplash.com/uploads/14116603688211a68546c/30f8f30b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=cec119f0428a7ed86fb74f5bf17c112a) no-repeat'); } else 
    if(json.weather[0].main === "Clear") { 
      $("body").css("background", 'url(https://images.unsplash.com/photo-1499561385668-5ebdb06a79bc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=36107b4b68cd1361e893512b2fbed790) no-repeat'); 
      $("body").css("background-size", "100% 100vh");
      return 0;
    }    
    else {
      $("body").css("background", 'url(https://source.unsplash.com/random) no-repeat');
    }
    $("body").css("background-size", "cover");
    console.log(json.weather[0].main);
  }
  
  //C to F toggle functionality
  var c = true;   
  $("button").click(function() {
    if(c === true) {
      $("#temp").html(fTemp + "°F").hide().fadeIn("slow");
      c = false;
    } else {
      $("#temp").html(cTemp + "°C").hide().fadeIn("slow");
      c = true;
    }
  });
  
  // getting date and stuff
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth(); //January is 0!
  var wday = today.getDay();
  var days = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  
  if(dd<10){
      dd='0'+dd;
  } 
  var today = days[wday].toUpperCase() + " " + months[mm].toUpperCase() + " " + dd;
  $("#date").html(today);

  getLocation();
});