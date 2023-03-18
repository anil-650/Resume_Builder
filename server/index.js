const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

// Regisration
app.use("/auth", require("./routes/jwtAuth"));

// ROUTES
app.get("/", (req, res)=>{
    res.json({message: "hello from server"});
});

// SERVER START
app.listen(5000, ()=> {
console.log("Server runig at 5000")
});