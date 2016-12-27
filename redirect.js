var express = require("express");
var app = express();

app.get("/blocks", function(req,response){
    //response.redirect("/parts"); // implicitly means temporary (http status code 302)
    response.redirect(301, "/parts"); // permanent
});

app.listen(3000, function(){console.log("Verbanck luistert.");});
