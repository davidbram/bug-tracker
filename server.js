// jshint esversion : 6

const express = require("express");
const app = express();
const body_parser = require("body-parser");
body_parser.urlencoded({extended : true});

//Entry Point
app.get("/",function(req,res){
  res.sendFile("D:\\Bug_Tracker\\bug-tracker\\frontend\\src\\Views\\Login\\login.jsx");
});

app.post("/",function(req,res){

});

app.listen(3000,function(){
  console.log("Server started at port 3000");
});
