var express = require("express");
var app = express();

app.get("/", function(req,response){
    response.send("hello world");
    // response.write("hello world"); the node.js way (send is express. response inherits from node.js response, so perfectly possible)
    // response.end();
});

app.listen(3000, function(){console.log("Verbanck luistert.");});
