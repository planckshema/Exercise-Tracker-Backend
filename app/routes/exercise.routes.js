import { Router } from "express";
import ExerciseController from "../controllers/exercise.controller.js";

const router = Router();

router.post("/", ExerciseController.create);
router.get("/", ExerciseController.getAll);
router.get("/:id", ExerciseController.getById);
router.put("/:id", ExerciseController.update);
router.delete("/:id", ExerciseController.delete);

export default router;
