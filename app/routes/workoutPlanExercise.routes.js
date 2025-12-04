import workoutPlanExercises from "../controllers/workoutPlanExercise.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";

var router = Router();

// Create a new Workout Plan Exercise
router.post("/", [authenticate], workoutPlanExercises.create);

// Retrieve a single Workout Plan Exercise by id
router.get("/:id", [authenticate], workoutPlanExercises.findOne);

// Update a Workout Plan Exercise by id
router.put("/:id", [authenticate], workoutPlanExercises.update);

// Delete a Workout Plan Exercise by id
router.delete("/:id", [authenticate], workoutPlanExercises.delete);

// Retrieve all Exercises for a specific Workout Plan
router.get("/plan/:workoutPlanId", [authenticate], workoutPlanExercises.findByWorkoutPlan);

// Mark a Workout Plan Exercise as completed
router.patch("/:id/complete", [authenticate], workoutPlanExercises.markCompleted);

export default router;
