import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Admin = SequelizeInstance.define("admin", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
});

export default Admin;
