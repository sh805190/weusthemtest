const pgPool = require("./db/dbconfig");
const contactDB = require("./db/contactDB")(pgPool);

// Express
const express = require("express");
const app = express();

//Solve cross-domain issues by setting all accessible methods
app.all("*", function (req, res, next) {
    //Set domain names that allow cross-domain, * means that any domain name is allowed to cross-domain
    res.header("Access-Control-Allow-Origin", "*");
    //Allowed header types
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    //Cross-domain allowed request methods
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");


    if (req.method.toLowerCase() === 'options')
        res.sendStatus(200); //Let options try to request a quick end
    else
        next();
})

var ROUTER = express.Router();

app.use(express.urlencoded({ extended: true }));


const contactAPI = require("./api/contactAPI.js")(contactDB);
const contactAPIroutes = require("./api/contactAPIRoutes.js")(
    ROUTER,
    app,
    contactAPI
);

app.use("/contact",contactAPIroutes);

app.post('/', function (req, res, next) {
    res.send({})
});

app.get('/', function(req, res, next) {
    res.send('Got a get request')
});




const port = 4000;
app.listen(port, () => {

    console.log(`listening on port ${port}`);
});