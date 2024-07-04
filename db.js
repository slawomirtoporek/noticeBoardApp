const mongoose = require("mongoose");

const connectToDB = () => {
  const dbURL = `mongodb+srv://toporekslawomir:z698iPAwqggXI4mO@cluster0.rimjfuu.mongodb.net/NoticeBoardDB?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.connect(dbURL, {});
  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to the database");
  });

  db.on("error", (err) => console.log("Error " + err));
};

module.exports = connectToDB;