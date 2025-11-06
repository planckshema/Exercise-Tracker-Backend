  import coachs from "../controllers/coach.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Coach
  router.post("/", [authenticate], coachs.create);

  // Retrieve all Coaches
  router.get("/", [authenticate], coachs.findAll);

  // Retrieve all Coaches for user
  router.get("/userTut/:userId", [authenticate], coachs.findAllForUser);

  // Retrieve a single Coach with id
  router.get("/:id", [authenticate], coachs.findOne);

  // Update a Coach with id
  router.put("/:id", [authenticate], coachs.update);

  // Delete a Coach with id
  router.delete("/:id", [authenticate], coachs.delete);


  export default router;

