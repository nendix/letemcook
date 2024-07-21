require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5050;
const cron = require("node-cron");
const { deleteOldMenus } = require("./controllers/menuController");
const {
  deleteOldOrders,
  resetOrdersAndTickets,
} = require("./controllers/orderController");

console.log(process.env.NODE_ENV);
console.log(process.env.DB_URI);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/users", require("./routes/userRoutes"));
app.use("/menus", require("./routes/menuRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log("Server running on port: " + PORT));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log",
  );

  // Esegui il cron job ogni giorno a mezzanotte
  cron.schedule("0 0 * * *", () => {
    console.log(
      "Running the cron job to delete two-week-old menus and orders...",
    );
    deleteOldMenus();
  });
  cron.schedule("0 6 * * *", () => {
    console.log("Running the cron job to reset orders and tickets");
    resetOrdersAndTickets();
  });
});
