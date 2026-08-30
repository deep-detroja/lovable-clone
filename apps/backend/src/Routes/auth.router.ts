import {Router} from "express";
import { middleware } from "../middleware/auth.js";


const router = Router();

router.post("/signup", (req,res)=>{
    //signup endpoint
});
router.post("/signin", (req,res)=>{
    //signin endpoint
});
router.get("/me", middleware, (req,res)=>{
    //me endpoint
});
router.post("/profile", middleware, (req,res)=>{
    //profile endpoint
});


export const authRouter:Router = router;
