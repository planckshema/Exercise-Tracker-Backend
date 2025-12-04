import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  const WorkoutPlanExercise = SequelizeInstance.define("workoutPlanExercise", {
    workoutPlanId: 
    {
      type: Sequelize.INTEGER
    },
    exerciseId: 
    {
      type: Sequelize.INTEGER
    },
    sets: 
    {
      type: Sequelize.STRING
    },
    reps: 
    {
      type: Sequelize.STRING
    },
    duration: 
    {
      type: Sequelize.INTEGER
    },
    durationUnit:
    {
      type: Sequelize.STRING
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
   }, {
  timestamps: false
});
export default WorkoutPlanExercise;
