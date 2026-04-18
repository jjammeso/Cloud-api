import express from "express";
import 'dotenv/config';
import { connectRedis } from "./redis.js";
import { pool } from "./db.js";

await connectRedis();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req,res)=>{
    res.send("Cloud is working");
});

app.get("/health", (req,res) =>{
    res.json({status:"OK"});
})

app.get("/test-db", async(req,res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
})

app.post("/users", async (req,res) =>{
    const {name, email} = req.body;

    const result = await pool.query(
        "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
        [name, email]
    );

    res.json(result.rows[0]);
})

app.get("/users", async (req,res) =>{
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
})

app.get("/products", async(req, res) =>{

})

app.listen(PORT, ()=>console.log(`Cloud Api server is running at PORT: ${PORT}`));
