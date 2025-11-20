  import nutrient from "../controllers/nutrition.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  
  //COACH SECTION
  // Create a new Nutrient for a Coach
  router.post("/:coachId/nutrient/", [authenticate], nutrient.create);

  // Retrieve all Nutrients for a Coach
  router.get(
    "/:coachId/nutrient/",
    [authenticate],
    nutrient.findAllForCoach
  );

  // Retrieve a single Nutrient with id
  router.get("/:coachId/nutrient/:id", [authenticate], nutrient.findOne);

  // Update a Nutrient with id
  router.put("/:coachId/nutrient/:id", [authenticate], nutrient.update);

  // Delete a Nutrient with id
  router.delete("/:coachId/nutrient/:id", [authenticate], nutrient.delete);



  //ATHLETE SECTION
  // Create a new Nutrient for an Athlete
  router.post("/:athleteId/nutrient/", [authenticate], nutrient.create);

  // Retrieve all Nutrients for an Athlete
  router.get(
    "/:athleteId/nutrient/",
    [authenticate],
    nutrient.findAllForCoach
  );

  // Retrieve a single Nutrient with id
  router.get("/:athleteId/nutrient/:id", [authenticate], nutrient.findOne);

  // Update a Nutrient with id
  router.put("/:athleteId/nutrient/:id", [authenticate], nutrient.update);

  // Delete a Nutrient with id
  router.delete("/:athleteId/nutrient/:id", [authenticate], nutrient.delete);

export default router