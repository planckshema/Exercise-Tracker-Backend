import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js"; 
import CoachAthlete from "./coachAthlete.model.js";
import Athlete from "./athlete.model.js";
import Coach from "./coach.model.js";
import ExerciseCategory from "./exerciseCategory.model.js";
import Exercise from "./exercise.model.js";
import WorkoutPlan from "./workoutPlan.model.js";
import WorkoutPlanExercise from "./workoutPlanExercise.model.js";


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;
db.lesson = Lesson;
db.coachAthlete = CoachAthlete;
db.athlete = Athlete;
db.coach = Coach;
db.exerciseCategory = ExerciseCategory;
db.exercise = Exercise;
db.workoutPlan = WorkoutPlan;
db.workoutPlanExercise = WorkoutPlanExercise;

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for tutorials
db.user.hasMany(
  db.tutorial,
  { as: "tutorial" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tutorial.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for lessons
db.tutorial.hasMany(
  db.lesson,
  { as: "lesson" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.lesson.belongsTo(
  db.tutorial,
  { as: "tutorial" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// // foreign key for athletes
// db.coach.hasMany(
//   db.athlete,
//   { as: "athlete" },
//   { foreignKey: { name: "coachId", allowNull: true }, onDelete: "SET NULL" }
// );
// db.athlete.belongsTo(
//   db.coach,
//   { as: "coach" },
//   { foreignKey: { name: "coachId", allowNull: true }, onDelete: "SET NULL" }
// );

//many to many relationship for coaches and athletes
db.coach.belongsToMany(db.athlete, {
  through: "CoachAthlete",
  as: "athletes",
  foreignKey: { name: "coachId", allowNull: true }, 
  onDelete: "CASCADE" 
});

db.athlete.belongsToMany(db.coach, {
  through: "CoachAthlete",
  as: "coaches",
  foreignKey: { name: "athleteId", allowNull: true }, 
  onDelete: "CASCADE" 
});


//Category has many exercises and each exercise belongs to one category
db.exercise.belongsTo(db.exerciseCategory,
{
  foreignKey: { name: "categoryId", allowNull: false },
  onDelete: "CASCADE"
});

db.exerciseCategory.hasMany(db.exercise, 
{
  foreignKey: { name: "categoryId", allowNull: false }
});


//foreign key for workout plan
db.workoutPlan.belongsTo(db.user, 
{
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE"
});

db.user.hasMany(db.workoutPlan, 
{
  foreignKey: { name: "userId", allowNull: false }
});

db.workoutPlan.belongsTo(db.athlete, 
{
  foreignKey: { name: "athleteId", allowNull: true },
  onDelete: "CASCADE"
});

db.workoutPlan.belongsTo(db.coach, 
{
  foreignKey: { name: "coachId", allowNull: true },
  onDelete: "CASCADE"
});


//foreign key for workoutPlanExercise
db.workoutPlanExercise.belongsTo(db.workoutPlan, {
  foreignKey: { name: "workoutPlanId", allowNull: false },
  onDelete: "CASCADE"
});

db.workoutPlan.hasMany(db.workoutPlanExercise, {
  foreignKey: { name: "workoutPlanId", allowNull: false }
});

db.workoutPlanExercise.belongsTo(db.exercise, {
  foreignKey: { name: "exerciseId", allowNull: false },
  onDelete: "CASCADE"
});

db.exercise.hasMany(db.workoutPlanExercise, {
  foreignKey: { name: "exerciseId", allowNull: false }
});



//module.exports = db;
export default db;
