import express from "express";
import { Register, Login, Logout, Certificate } from "../controllers/user.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/certificate").post(Certificate);

export default router;