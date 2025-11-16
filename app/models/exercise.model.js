import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise = SequelizeInstance.define("exercises", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  equipment: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  duration: {
    type: Sequelize.INTEGER, 
    allowNull: true,
  },
});

export default Exercise;
