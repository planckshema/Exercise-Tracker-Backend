import { Router } from "express";
import NutritionController from "../controllers/nutrition.controller.js";

const router = Router();

router.get("/", NutritionController.findAll);
router.get("/:id", NutritionController.findOne);

export default router;
