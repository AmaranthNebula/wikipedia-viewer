$(document).ready(function() {
    var startURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=";
    var endURL = "&callback=?";
   var searchURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=rock&callback=?";
   
   
 //getResults();
   function getResults() {
       $.getJSON(searchURL, function(json) {
           var resultLength = json.query.search.length;
           //loop through the ten results
           $("#results").html("");
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
        if ($(document).outerHeight() > $(window).outerHeight()) {
        var containerHeight = $("header").outerHeight() + $("footer").outerHeight() + $("#results").outerHeight();
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
         getResults();
     }


   }); 
   
   //key event handlers
   $("#search input").keyup(function(event){
    if(event.keyCode == 13){
        //text in search/input box
        var input = $("#search input").val();
    
        //if there is text in the searchbox
        if (input.length > 0) {
        // create url to send to api and retrieve results
        searchURL = startURL + input + endURL;
        // call function to generate results and update GUI 
            getResults();
        }
    }
});

    
});