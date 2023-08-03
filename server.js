const express=require("express")

const app=express();

app.get("/",(req,res)=>{
    res.send("I am hear you")
})


app.get("/identify",(req,res)=>{
    res.send("I am hear you at /identify")
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})