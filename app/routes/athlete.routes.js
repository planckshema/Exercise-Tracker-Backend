  import athletes from "../controllers/athlete.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new Athlete for a Coach
  router.post("/:coachId/athletes/", [authenticate], athletes.create);

  // Retrieve all Athletes for a Coach
  router.get(
    "/:coachId/athletes/",
    [authenticate],
    athletes.findAllForCoach
  );

  // Retrieve a single Athlete with id
  router.get("/:coachId/athletes/:id", [authenticate], athletes.findOne);

  // Update a Athlete with id
  router.put("/:coachId/athletes/:id", [authenticate], athletes.update);

  // Delete a Athlete with id
  router.delete("/:coachId/athletes/:id", [authenticate], athletes.delete);

export default router