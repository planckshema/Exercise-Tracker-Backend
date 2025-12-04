import workoutPlans from "../controllers/workoutPlan.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";

var router = Router();

// Create a new Workout Plan
router.post("/", [authenticate], workoutPlans.create);

// Retrieve a single Workout Plan by id
router.get("/:id", [authenticate], workoutPlans.findOne);

// Update a Workout Plan by id
router.put("/:id", [authenticate], workoutPlans.update);

// Delete a Workout Plan by id
router.delete("/:id", [authenticate], workoutPlans.delete);

// Retrieve all Workout Plans for a specific coach
router.get("/coach/:coachId", [authenticate], workoutPlans.findPlansForCoach);

// Retrieve all Workout Plans for a specific athlete
router.get("/athlete/:athleteId", [authenticate], workoutPlans.findPlansForAthlete);

export default router;
