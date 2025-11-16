  import athletes from "../controllers/athlete.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new Athlete
  router.post("/", [authenticate], athletes.create);

  // Retrieve all Coaches
  router.get("/", [authenticate], athletes.findAll);

  // Retrieve all Coaches for user
  router.get("/userTut/:email", [authenticate], athletes.findAllForUser);

  // Retrieve a single Athlete with id
  router.get("/:id", [authenticate], athletes.findOne);

  // Update a Athlete with id
  router.put("/:id", [authenticate], athletes.update);

  // Delete a Athlete with id
  router.delete("/:id", [authenticate], athletes.delete);

export default router