const protect=require("../controller/userActivityController")

function userBudget(req,res){
    res.send("the user has spend 100M this week that is terrible");
}

module.exports=userBudget;