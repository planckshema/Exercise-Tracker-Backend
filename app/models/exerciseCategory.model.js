import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const ExerciseCategory = SequelizeInstance.define("exerciseCategories", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default ExerciseCategory;
