import { Router } from "express";
import { HrUserController } from "./hrUser.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { HrUserValidation } from "./hrUser.validation";

const router = Router()

router.get("/", HrUserController.getAllHrUser)
router.post(
    "/create",
    validateRequest(HrUserValidation.createHrUserSchema),
    HrUserController.createHrUser
)
router.get("/:email", HrUserController.getUserByEmail)
router.patch(
    "/:email",
    validateRequest(HrUserValidation.updateHrUserSchema),
    HrUserController.updateHrUser
)
router.delete("/:email", HrUserController.deleteHrUser)


export const HrUserRoutes = router