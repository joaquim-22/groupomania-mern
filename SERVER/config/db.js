const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://joaquim:joaquim22@cluster0.ercv5yu.mongodb.net/test",
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));