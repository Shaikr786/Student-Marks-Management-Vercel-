const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use(cors({
  origin: ["https://student-marks-management-vercel-g2zo.vercel.app"],
  methods: ["POST", "GET","PUT", "DELETE"],
  credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://student-marks-management-vercel-g2zo.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
      return res.sendStatus(204); // Handle preflight requests
  }
  next();
});


app.use("/", studentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});


app.get('/', (req, res) => {
  console.log("Root route accessed");
  res.json({ messg: 'Welcome to app' });
});


module.exports = app;