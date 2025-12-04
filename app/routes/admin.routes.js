  import admins from "../controllers/admin.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new Admin
  router.post("/", [authenticate], admins.create);

  // Retrieve all admins
  router.get("/", [authenticate], admins.findAll);

  // Retrieve a single Admin with id
  router.get("/:id", [authenticate], admins.findOne);

  // Update a Admin with id
  // router.put("/:id", [authenticate], admins.update);

  // Delete a Admin with id
  router.delete("/:id", [authenticate], admins.delete);

export default router