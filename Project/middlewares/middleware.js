const express = require("express");

const filter = (req, res, next) => {
  if (!req.query.age) {
    res.send("Provide your age");
  } else if (req.query.age < 15) {
    res.send("Under age for shopping");
  } else {
    next();
  }
};

module.exports = filter;
