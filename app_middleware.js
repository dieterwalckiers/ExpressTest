var express = require("express");
var app = express(); 

// app.get("/", function(req,response){
//     response.sendFile(__dirname + "/public/index_static_middleware.html");
// });

// or:

app.use(express.static("public")); // app.use adds a middleware. In this case, add "static" middleware: serves shizzle under "public" folder

app.use(function(request, response, next){ // add a new middleware function
    // do stuff
    next(); // important
});

app.listen(3000, function(){console.log("Verbanck luistert.");});
