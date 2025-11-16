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
import Exercise from "./exercise.model.js";
import ExerciseCategory from "./exerciseCategory.model.js";


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

// Exercise → Category (FK)
Exercise.belongsTo(ExerciseCategory, {
  foreignKey: { name: "categoryId", allowNull: false },
  onDelete: "CASCADE",
});

// Category → Exercises (One-to-Many)
ExerciseCategory.hasMany(Exercise, {
  foreignKey: { name: "categoryId", allowNull: false },
  onDelete: "CASCADE",
});
//module.exports = db;
export default db;
