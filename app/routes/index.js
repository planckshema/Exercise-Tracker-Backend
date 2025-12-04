import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";
import CoachAthleteRoutes from "./coachAthlete.routes.js";
import AthleteRoutes from "./athlete.routes.js";
import CoachRoutes from "./coach.routes.js";
import ExerciseCategoryRoutes from "./exerciseCategory.routes.js";
import ExerciseRoutes from "./exercise.routes.js";
import AdminRoutes from "./admin.routes.js";


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);
router.use("/athletes", AthleteRoutes);
router.use("/coaches", CoachRoutes);
router.use("/coachAthletes", CoachAthleteRoutes);
router.use("/exerciseCategories", ExerciseCategoryRoutes);
router.use("/exercises", ExerciseRoutes);
router.use("/admins", AdminRoutes);

export default router;
