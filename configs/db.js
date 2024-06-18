const mongoose = require("mongoose");

const db = mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.9myjudn.mongodb.net/movie?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Mongo connection field");
  });

module.exports = db;
