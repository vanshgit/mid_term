const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./model/student");
const studentRoutes = require("./routes/studentRoutes");

mongoose.connect("mongodb://localhost:27017/Students", {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Student API");
});

app.use("/students", studentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Invalid route" });
});

app.listen(3000);
