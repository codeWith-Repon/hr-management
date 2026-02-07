import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { HrUserValidation } from "./hrUser.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { hrUserController } from "./hrUser.controller";

const router = Router()

router.get("/", checkAuth(), hrUserController.getAllHrUsers)

router.post(
    "/create",
    validateRequest(HrUserValidation.createHrUserSchema),
    hrUserController.createHrUser
)
router.get("/me", checkAuth(), hrUserController.getMe)
router.get("/:email", hrUserController.getUserByEmail)

router.patch(
    "/",
    checkAuth(),
    validateRequest(HrUserValidation.updateHrUserSchema),
    hrUserController.updateHrUser
)

router.delete("/:email", checkAuth(), hrUserController.deleteHrUser)


export const HrUserRoutes = router