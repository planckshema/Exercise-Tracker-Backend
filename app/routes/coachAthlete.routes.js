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

// Accept a pending request (coach or athlete accepts)
router.put("/:coachId/:athleteId/accept", [authenticate], coachAthletes.acceptRequest);

// Reject a pending request (coach or athlete rejects)
router.delete("/:coachId/:athleteId/reject", [authenticate], coachAthletes.rejectRequest);

// Get all athletes for a coach
router.get("/coach/:coachId", [authenticate], coachAthletes.findAthletesForCoach);

// Get pending requests for a coach (athletes requesting to be coached)
router.get("/coach/:coachId/pending", [authenticate], coachAthletes.getPendingCoachRequests);

// Get all coaches for an athlete
router.get("/athlete/:athleteId", [authenticate], coachAthletes.findCoachesForAthlete);

// Get pending requests for an athlete (coaches requesting to coach)
router.get("/athlete/:athleteId/pending", [authenticate], coachAthletes.getPendingAthleteRequests);

// Get a single coach-athlete relationship
router.get("/:coachId/:athleteId", [authenticate], coachAthletes.findOne);

export default router;
