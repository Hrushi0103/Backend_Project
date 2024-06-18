const express = require("express");
const app = express();
const usermodel = require("../models/userschema");
const mongoose = require("mongoose");
const mydb = require("../configs/mydb");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

const allusers = (req, res) => {
  usermodel
    .find()
    .then((mongoData) => res.json(mongoData))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const searchusers = (req, res) => {
  usermodel
    .findById(req.params.id)
    .then((mongoData) => res.json(mongoData))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const deleteusers = (req, res) => {
  usermodel
    .deleteOne({ _id: req.params.id })
    .then(() => res.json({ success: true, message: "Data Deleted" }))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const updateusers = (req, res) => {
  const { name, age, location } = req.body;
  usermodel
    .updateOne({ _id: req.params.id }, { $set: { name, age, location } })
    .then(() =>
      res.json({ success: true, message: "Data Updated Successfully" })
    )
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const addusers = (req, res) => {
  const { name, age, location } = req.body;
  const newuser = new usermodel({
    _id: new mongoose.Types.ObjectId(),
    name,
    age,
    location,
  });
  newuser
    .save()
    .then(() => res.json({ success: true, message: "Data added" }))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const abs = async (req, res) => {
  try {
    const users = await usermodel.find();
    res.render("dashboard2", { users });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const login = (req, res) => {
  res.render("login");
};

const Plogin = (req, res) => {
  const { username, password } = req.body;
  mydb.query(
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
};

const register = (req, res) => {
  res.render("register");
};

const Pregister = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    mydb.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hash],
      (err, result) => {
        if (err) throw err;
        res.redirect("/login");
      }
    );
  });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
};

const home = (req, res) => {
  if (req.session.user) {
    res.render("home", { user: req.session.user });
  } else {
    res.redirect("/login");
  }
};

const contact = (req, res) => {
  res.render("contact");
};

const about = (req, res) => {
  res.render("about");
};

module.exports = {
  allusers,
  searchusers,
  deleteusers,
  updateusers,
  addusers,
  abs,
  login,
  Plogin,
  register,
  Pregister,
  logout,
  home,
  contact,
  about,
};
