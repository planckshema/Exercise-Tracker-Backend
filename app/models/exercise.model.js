import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  const Exercise = SequelizeInstance.define("exercise", {
    name: 
    {
      type: Sequelize.STRING,
      unique: true 
    },
    categoryId: 
    {
      type: Sequelize.INTEGER
    },
    description: 
    {
      type: Sequelize.STRING
    },
    equipment: 
    {
      type: Sequelize.STRING
    },
    duration: 
    {
      type: Sequelize.INTEGER
    }
  }, {
  timestamps: false
});
export default Exercise;
