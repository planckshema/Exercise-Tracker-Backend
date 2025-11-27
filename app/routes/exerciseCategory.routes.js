import exerciseCategories from "../controllers/exerciseCategory.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";
var router = Router();

// Create a new ExerciseCategory
router.post("/", [authenticate], exerciseCategories.create);

// Retrieve all ExerciseCategories
router.get("/", [authenticate], exerciseCategories.findAll);

// Retrieve a single ExerciseCategory by id
router.get("/:id", [authenticate], exerciseCategories.findOne);

// Update an ExerciseCategory by id
router.put("/:id", [authenticate], exerciseCategories.update);

// Delete an ExerciseCategory by id
router.delete("/:id", [authenticate], exerciseCategories.delete);

export default router;
