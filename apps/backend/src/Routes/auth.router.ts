import {Router} from "express";
import {signup,signin,me,profile} from "../controllers/auth.controller.js"
import { middleware } from "../middleware/auth.js";


const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", middleware, me);
router.post("/profile", middleware, profile);


export const authRouter:Router = router;
