var express = require("express");
var app = express();

app.use(express.static("public")); // app.use adds a middleware. In this case, add "static" middleware: serves shizzle under "public" folder

var blocks = require("./routes/blocks");
app.use("/blocks", blocks); // mount the module blocks, which is a router

app.listen(3000, function() {
    console.log("Verbanck luistert.");
}); 
