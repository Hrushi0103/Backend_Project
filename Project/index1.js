const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/routes");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3100;
const db = require("./configs/db");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const mydb = require("./configs/mydb");

// Initialize the app
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());
// Set view engine
app.set("view engine", "ejs");

// Use routes
app.use("/", userRoutes);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "yourSecretKey", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure: true if using HTTPS
  })
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            req.session.user = results[0];
            res.redirect("/home");
          } else {
            res.send("Incorrect Password");
          }
        });
      } else {
        res.send("No user with that username");
      }
    }
  );
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hash],
      (err, result) => {
        if (err) throw err;
        res.redirect("/login");
      }
    );
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/home`);
});
