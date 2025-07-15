const {generateReport}=require("../controller/reportController");
const express=require("express")

const reportRouter=express.Router();

reportRouter.post("/createReport",generateReport);

module.exports=reportRouter;//  /report/createReport