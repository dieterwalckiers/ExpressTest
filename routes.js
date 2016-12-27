var express = require("express");
var app = express();

app.get("/blocks", function(req,response){
    var blocks = ['fixed', 'movable', 'rotating'];
    response.send(blocks); //auto converts to json and sets correct response headers
    //response.json(blocks); // same thing
});

app.listen(3000, function(){console.log("Verbanck luistert.");});
