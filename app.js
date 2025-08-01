const express=require("express");
const {userRouter}=require("./Route/userRoute.js")
const {expenseRouter}=require("./Route/expenseRoute.js")
const incomeRouter=require("./Route/incomeRoute.js");
const budgetRouter=require("./Route/budgetRouter.js")
const categoryRouter=require("./Route/categoryRoute.js");
const expense_categories=require("./Route/expenseCategoryRoute.js")
const reportRouter=require("./Route/reportRoute.js")
const cors=require("cors");
const app=express();
app.use(
  cors({
    origin: ["http://localhost:3000","https://track-your-expenses-fron-git-b72c79-wilideparisdenodes-projects.vercel.app","https://track-your-expenses-frontend-pz4a7qn81.vercel.app/"], // Your frontend URL
    credentials: true, // Allow cookies/auth headers
  })
);app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",userRouter);
app.use("/budget",budgetRouter);
app.use("/expense",expenseRouter);
app.use("/income",incomeRouter);
app.use("/category",categoryRouter);
app.use("/expense_category",expense_categories);
app.use("/report",reportRouter);
module.exports=app;    