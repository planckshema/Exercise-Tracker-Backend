import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  const Athlete = SequelizeInstance.define("athlete", {
    sport: 
    {
      type: Sequelize.STRING
    },
     position: 
    {
      type: Sequelize.STRING
    },
    firstName: 
    {
      type: Sequelize.STRING
    },
    lastName: 
    {
      type: Sequelize.STRING
    },
    gender: 
    {
      type: Sequelize.STRING
    },
    height: 
    {
      type: Sequelize.STRING
    },
    weight: 
    {
      type: Sequelize.STRING
    },
    email: 
    {
      type: Sequelize.STRING
    },
    phoneNumber: 
    {
      type: Sequelize.STRING
    },
  }, 
);
export default Athlete;