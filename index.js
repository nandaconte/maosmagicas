const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const app = express();
const conn = require("./db/conn");

// ROUTES E CONTROLLERS
const magicHandsRoutes = require("./routes/magicHandsRoutes");
const authRoutes = require("./routes/authRoutes");
const magicHandsController = require("./controllers/magicHandsController");

// HANDLEBARS
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// SESSION
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)

// FLASH MESSAGES
app.use(flash());

// STATIC
app.use(express.static("public"));

// SET SESSION TO RES
app.use((req, res, next) => {
    console.log(req.session.userid);
    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});

app.use("/", magicHandsRoutes);
app.use("/", authRoutes);
app.get("/", magicHandsController.showHome);

conn
  .sync()
  .then(() => {
    app.listen(7000);
  })
  .catch((err) => console.log(err));