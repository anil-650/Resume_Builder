const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authorization route
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard route
app.use("/dashboard", require("./routes/dashboard"));

//  Password
app.use("/resetpasswd", require("./routes/resetPassword"));

// Get templates data
app.use("/templates", require("./routes/templates"));

// Resume route
app.use("/resume", require("./routes/resume"));

// check server running
app.get("/", (req, res) => {
    res.json({ message: "hello from server" });
});

// SERVER START
app.listen(port, () => {
    console.log("Server runig at", port)
});
