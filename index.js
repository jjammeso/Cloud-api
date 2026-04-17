import express from "express";

const app = express();

const PORT = 4000;

app.get("/", (req,res)=>{
    res.send("Cloud is working");
});

app.get("/health", (req,res) =>{
    res.send("Server is running");
})

app.listen(PORT, ()=>console.log(`Cloud Api server is running at PORT: ${PORT}`));
