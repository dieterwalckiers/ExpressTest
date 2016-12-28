var express = require("express");
var app = express();

var bodyParser = require("body-parser"); // middleware not shipped with express

var parseUrlencoded = bodyParser.urlencoded({extended: false});

var blocks = {
    "Fixed": "Fastened securily in position",
    "Movable": "Capable of being moved",
    "Rotating": "Moving in a circle around its center"
};

var locations = {
    "Fixed": "First floor",
    "Movable": "Second floor",
    "Rotating": "Penthouse"
};

app.use(express.static("public")); // app.use adds a middleware. In this case, add "static" middleware: serves shizzle under "public" folder

app.param("name", function(request, response, next) {
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.blockName = block; // so then blockName can be accessed by all routes in the application
    next();
});

app.get("/blocks", function(request, response) { // used for ajax call
    if (request.query.limit >= 0) { // query string
        response.json(Object.keys(blocks).slice(0, request.query.limit));
    } else
        response.json(Object.keys(blocks));
});


app.get("/blocks/:name", function(request, response){
    // var name = request.params.name;
    // var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    // var description = blocks[block];
    // but instead:
    var description = blocks[request.blockName];
    if(!description) {
        response.status(404).json("No description found for " + request.params.name);
    }
    response.json(description);
});

app.get("/locations/:name", function(request, response){
    // var name = request.params.name;
    // var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    // var description = blocks[block];
    // but instead:
    var location = locations[request.blockName];
    if(!location) {
        response.status(404).json("No location found for " + request.params.name);
    }
    response.json(location);
});

app.post("/blocks", parseUrlencoded, /*, multiple, handlers, possible, */ function(request, response) /*(this anon function is always the last one )*/ {
    var newBlock = request.body; // form data
    blocks[newBlock.name] = newBlock.description;
    response.status(201).json(newBlock.name);
});

app.delete("/blocks/:name", function(request, response) {
    delete blocks[request.blockName]; // blockName is set via app.param()
    response.sendStatus(200); // sendStatus sets the response body automatically for us based on status code
});

app.listen(3000, function() {
    console.log("Verbanck luistert.");
}); 
