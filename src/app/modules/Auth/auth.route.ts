import { Router } from "express";
import { AuthController } from "./auth.controller";


const router = Router()

router.post("/login", AuthController.loginUser)
router.post("/logout", AuthController.logOutUser)

export const AuthRoutes = router;