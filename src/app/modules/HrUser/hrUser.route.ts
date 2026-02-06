import { Router } from "express";
import { HrUserController } from "./hrUser.controller";

const router = Router()

router.get("/", HrUserController.getAllHrUser)
router.post("/create", HrUserController.createHrUser)
router.get("/:email", HrUserController.getUserByEmail)
router.patch("/:email", HrUserController.updateHrUser)
router.delete("/:email", HrUserController.deleteHrUser)


export const HrUserRoutes = router