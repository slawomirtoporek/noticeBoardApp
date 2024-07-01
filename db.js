const mongoose = require("mongoose");

const connectToDB = () => {
  const dbURL =
    process.env.NODE_ENV === "production"
      ? `mongodb+srv://toporekslawomir:${process.env.DB_PASS}@clusterO.rimjfuu.mongodb.net/noticeBoardDB?retryWrites=true&w=majority&appName=Cluster0`
      : "mongodb://0.0.0.0:27017/noticeBoardDB";

  mongoose.connect(dbURL, {});
  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to the database");
  });

  db.on("error", (err) => console.log("Error " + err));
};

module.exports = connectToDB;