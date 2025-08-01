const {generateReport}=require("../controller/reportController");
const express=require("express");
const { protect } = require("../utils/authenticationMidleware");

const reportRouter=express.Router();

reportRouter.post("/createReport",protect,generateReport);

module.exports=reportRouter;//  /report/createReport