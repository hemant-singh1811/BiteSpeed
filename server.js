const express=require("express")  
const route=require("./routes/api");

var app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/",(req,res)=>{
    res.send("I am hear you")
})

app.use("/identify", route)

app.all("*", (req, res) =>
  res.status(404).send({ statusCode: 404, data: {}, message: " Path Not Found" })
);



app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})