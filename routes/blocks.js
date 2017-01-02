// file that encapsulates all blocks related logic

var express = require("express");
var router = express.Router;

var bodyParser = require("body-parser"); // middleware not shipped with express
var parseUrlencoded = bodyParser.urlencoded({
    extended: false
});

var blocks = {
    "Fixed": "Fastened securily in position",
    "Movable": "Capable of being moved",
    "Rotating": "Moving in a circle around its center"
};

router.route("/") // path is relative to where this router is mounted in app.js file!! so assumed to be under /blocks
    .get(function(request, response) {
        if (request.query.limit >= 0) { // query string
            response.json(Object.keys(blocks).slice(0, request.query.limit));
        } else
            response.json(Object.keys(blocks));
    }).post(parseUrlencoded, function(request, response) {
        var newBlock = request.body; // form data
        blocks[newBlock.name] = newBlock.description;
        response.status(201).json(newBlock.name);
    });

router.route("/:name").all(function(request, response, next) { // alternative to app.param
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.blockName = block; // so then blockName can be accessed by all routes in the application
    next();
}).get(function(request, response) {
    var description = blocks[request.blockName];
    if (!description) {
        response.status(404).json("No description found for " + request.params.name);
    }
    response.json(description);
}).delete("/blocks/:name", function(request, response) {
    delete blocks[request.blockName]; // blockName is set via app.param()
    response.sendStatus(200); // sendStatus sets the response body automatically for us based on status code
});

module.exports = router; // exports the router as a node module
