import { Router } from "express";

const router = Router();

import {
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  createEvent,
  showStats,
  buyTicket,
} from "../controllers/eventControler.js";
import { authenticateUser } from "../middleware/authMIddleware.js";
import {
  validateIdParam,
  validateEventInput,
} from "../middleware/vallidationMiddleware.js";

router
  .route("/")
  .get(getAllEvents)
  .post(authenticateUser, validateEventInput, createEvent);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(getEvent)
  .patch(authenticateUser, updateEvent)
  .delete(authenticateUser, validateIdParam, deleteEvent)
  .put(authenticateUser, buyTicket);

export default router;
