import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  const WorkoutPlan = SequelizeInstance.define("workoutPlan", {
    title: 
    {
      type: Sequelize.STRING
    },
    scheduledTime: 
    {
      type: Sequelize.TIME
    },
    createdByUserId: 
    {
      type: Sequelize.INTEGER
    },
    assignedAthleteId: 
    {
      type: Sequelize.INTEGER
    },
    assignedCoachId: 
    {
      type: Sequelize.INTEGER
    },
    notes: 
    {
      type: Sequelize.STRING
    },
   }, {
  timestamps: false
});
export default WorkoutPlan;
