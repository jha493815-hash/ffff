require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

/* ===== MIDDLEWARES ===== */
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* ===== ROUTES ===== */
app.use("/api/students", studentRoutes);

/* ===== DATABASE + SERVER ===== */
const PORT = process.env.PORT || 6000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
})
.catch((err) => {
  console.log("DB ERROR:");
  console.log(err);
});