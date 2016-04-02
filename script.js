$(document).ready(function() {
    var startURL = "https://en.wikipedia.org/wiki/api.php?action=query&format=json&list=search&srsearch=";
    var endURL = "callback=?";
   var searchURL;
   
   
 //getResults();
   function getResults() {
       $.getJSON("rockResults.json", function(json) {
           var resultLength = json.query.search.length;
           //loop through the ten results
           for (var i =0; i < resultLength; i++) {
                var title = JSON.stringify(json.query.search[i].title).substr(1, json.query.search[i].title.length);
                var articleURL = "https://en.wikipedia.org/wiki/" + title.replace(/\s/g, "_");
                var result = json.query.search[i].snippet;
                
                var outerDivOpen = '<div class="searchResult">'
                var htmlTitle = '<a href="' + articleURL + '" target="_blank">' + title + '</a><br>';
                var outerDivClose = '</div';
                
                $("#results").html($("#results").html() + outerDivOpen + htmlTitle + result + outerDivClose);
           }


           //update footer position
           repositionFooter();
        });
    }
   
   
   
   //resize handlers
   function repositionFooter() {
       console.log("docusmnet: " + $(document).outerHeight());
       console.log("window: " + $(window).outerHeight());
           if ($(document).outerHeight() > $(window).outerHeight()) {
            //    var resultsHeight = $(window).outerHeight() - $("header").outerHeight() - $("footer").outerHeight();
            //   console.log(resultsHeight);
            //    $("#results").css("height", "resultsHeight" + "px");
            var containerHeight = $("header").outerHeight() + $("footer").outerHeight() + $("#results").outerHeight();
               console.log("containerHeight: " + containerHeight);
               $("#container").css("height", containerHeight + "px");
               $("body").css("height", containerHeight + "px");
               
               $("footer").css("position", "static");
           }
           else {
               $("footer").css("position", "absolute");
               $("footer").css("bottom", "0");
               $("footer").css("left", "0");
           }       
   }
   $(window).resize(function() {
      repositionFooter(); 
   });
   
   //event handlers
   // search button
   $("#search a").click(function(e) {
     e.preventDefault();
    //text in search/input box
    var input = $("#search input").val();
 
    //if there is text in the searchbox
     if (input.length > 0) {
         // create url to send to api and retrieve results
         searchURL = startURL + input + endURL;
         // call function to generate results and update GUI 
         //UNCOMMENT THIS LATER getResults();

     console.log(input);
     //use this input and call function to submit query and show results
     }
    getResults();
   }); 
    
});