var express = require("express");
var app = express(); 

app.use(express.static("public")); // app.use adds a middleware. In this case, add "static" middleware: serves shizzle under "public" folder

app.get("/blocks", function(request, response){ // used for ajax call
    var blocks = ["fixed", "movable", "rotating"];
    response.json(blocks);
});

app.listen(3000, function(){console.log("Verbanck luistert.");});
