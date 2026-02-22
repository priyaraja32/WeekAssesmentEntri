const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");

const app = express();
// middleware to read JSON
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/postDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Use Routes
app.use("/", postRoutes);

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});