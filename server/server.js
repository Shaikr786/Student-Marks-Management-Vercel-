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
  methods: ["POST", "GET"],
  credentials: true
}));


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