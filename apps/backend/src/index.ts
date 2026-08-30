import express from "express";
import { PORT } from "./config/env.js";
import { authRouter } from "./Routes/auth.router.js";

const app =express();

app.get("/health",(req,res)=>{
    res.json({ message:"app is running fine" });
})

app.use("auth",authRouter);

app.listen(PORT, () => {
  console.log(`Volt backend listening on http://localhost:${PORT}`);
});