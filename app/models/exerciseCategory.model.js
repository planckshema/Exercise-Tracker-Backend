import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  const ExerciseCategory = SequelizeInstance.define("exerciseCategory", {
    name: 
    {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true 
    },
    description: 
    {
      type: Sequelize.STRING
    }
  }, {
  timestamps: false
});
export default ExerciseCategory;
