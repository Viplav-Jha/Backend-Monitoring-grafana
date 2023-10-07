const express = require('express')

const app =express()


app.get("/",(req,res)=> {

});

app.get("/slow", (req,res)=>{

});

app.listen(PORT,()=>
console.log("Server is running on ")
)