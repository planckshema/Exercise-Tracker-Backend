import exercises from "../controllers/exercise.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";
var router = Router();

// Create a new Exercise under a category
router.post("/category/:categoryId", [authenticate], exercises.create);

// Retrieve all Exercises
router.get("/", [authenticate], exercises.findAll);

// Retrieve all Exercises for a specific category
router.get("/category/:categoryId", [authenticate], exercises.findAllForCategory);

// Retrieve a single Exercise by id
router.get("/:id", [authenticate], exercises.findOne);

// Update an Exercise by id
router.put("/:id", [authenticate], exercises.update);

// Delete an Exercise by id
router.delete("/:id", [authenticate], exercises.delete);

export default router;
