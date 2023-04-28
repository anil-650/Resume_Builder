const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Authorization route
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard route
app.use("/dashboard", require("./routes/dashboard"));

// Get templates data
app.use("/templates", require("./routes/templates"));

app.use("/resume", require("./routes/resume"));

// check server running
app.get("/", (req, res)=>{
    res.json({message: "hello from server"});
});

// SERVER START
app.listen(5000, ()=> {
console.log("Server runig at 5000")
});
