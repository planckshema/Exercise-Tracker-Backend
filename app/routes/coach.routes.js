  import coaches from "../controllers/coach.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Coach
  router.post("/", [authenticate], coaches.create);

  // Retrieve all Coaches
  router.get("/", [authenticate], coaches.findAll);

  // Retrieve all Coaches for user
  router.get("/userTut/:email", [authenticate], coaches.findAllForUser);

  // Retrieve a single Coach with id
  router.get("/:id", [authenticate], coaches.findOne);

  // Update a Coach with id
  router.put("/:id", [authenticate], coaches.update);

  // Delete a Coach with id
  router.delete("/:id", [authenticate], coaches.delete);


  export default router;

