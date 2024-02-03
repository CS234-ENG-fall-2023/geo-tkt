import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
  getAllUsers,
  findUserById,
} from "../controllers/userControler.js";
import { updateUserInput } from "../middleware/vallidationMiddleware.js";
import { authorizedPermisions } from "../middleware/authMIddleware.js";
import upload from "../middleware/multerMiddleware.js";
import { authenticateUser } from "../middleware/authMIddleware.js";

const router = Router();

router.get("/current-user", authenticateUser, getCurrentUser);
router.get(
  "/admin/find-user/:id",
  authenticateUser,
  authorizedPermisions("ADMIN"),
  findUserById
);

router.get("/admin/app-stats", [
  authenticateUser,
  authorizedPermisions("ADMIN"),
  getApplicationStats,
]);

router.get("/admin/all-users", [getAllUsers]);
router.patch(
  "/update-user/:id",
  authenticateUser,
  authorizedPermisions("ADMIN"),
  updateUser
);

export default router;
