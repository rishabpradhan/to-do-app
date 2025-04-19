const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config(); //load env variables

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "https://to-do-app-chi-brown-91.vercel.app", //frontend port enabling cross-side-scripting
    credentials: true,
    exposedHeaders: ["set-cookie"], // Important for cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
