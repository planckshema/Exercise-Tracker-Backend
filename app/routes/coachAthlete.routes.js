import coachAthletes from "../controllers/coachAthlete.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";

const router = Router();

// Create a coach-athlete relationship
router.post("/", [authenticate], coachAthletes.create);

// Update sport/status for a relationship
router.put("/:coachId/:athleteId", [authenticate], coachAthletes.update);

// Delete a relationship
router.delete("/:coachId/:athleteId", [authenticate], coachAthletes.delete);

// Get all athletes for a coach (ANY status)
router.get("/coach/:coachId/all", authenticate, coachAthletes.findAllAthletesForCoach);

// Get all athletes for a coach
router.get("/coach/:coachId", [authenticate], coachAthletes.findAthletesForCoach);

// Get all coaches for an athlete
router.get("/athlete/:athleteId", [authenticate], coachAthletes.findCoachesForAthlete);

// Get a single coach-athlete relationship
router.get("/:coachId/:athleteId", [authenticate], coachAthletes.findOne);

export default router;
