import { Router } from "express";
import ExerciseSetController from "../controllers/exerciseSet.controller.js";

const router = Router();

router.get("/", ExerciseSetController.findAll);
router.get("/:id", ExerciseSetController.findOne);

export default router;
