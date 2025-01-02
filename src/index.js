const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const { hash } = require("bcryptjs");
const path = require("path");
const flash = require("connect-flash");

const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);
const {database} = require("./keys");
const sessionStore = new MySQLStore(database);

// inicializacion 
const app = express();

//configuracion
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars.js")
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs"); 

//middlewares - son funciones que se ejecutan cuando hay una peticion


app.use(session({
    secret: "fabricioSqlSession",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

// Variables Globales
app.use((req,res,next) => {
    app.locals.success = req.flash("success");
    next();
});

// Rutas
app.use(require("./routes/index.js"));
app.use(require("./routes/authentication.js"));
app.use("/links", require("./routes/links.js"));


// Public
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
app.listen(app.get("port"), ()=> {
    console.log("Server on port", app.get("port"));
});