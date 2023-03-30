const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

// Authorization route
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard route
app.use("/dashboard", require("./routes/dashboard"));

// check server running
app.get("/", (req, res)=>{
    res.json({message: "hello from server"});
});

// SERVER START
app.listen(5000, ()=> {
console.log("Server runig at 5000")
});
