const express = require("express");
const cors = require("cors"); //allows frontend & backend communication
require("dotenv").config();

const app = express(); // create express app

app.use(cors()); //middleware
app.use(express.json());

app.use(express.static("public")); //serve frontend files from folder

app.get("/api/test", function(req,res) {
    res.json({
       success : true,
       message : "Project Idea Rescue backend is running!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("App running on http://localhost:"+ PORT);
});