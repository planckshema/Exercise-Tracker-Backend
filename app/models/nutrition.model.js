import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  const Athlete = SequelizeInstance.define("nutri", {
    item: 
    {
      type: Sequelize.STRING
    },
    calories: 
    {
      type: Sequelize.STRING
    },
    carbs: 
    {
      type: Sequelize.STRING
    },
    protein: 
    {
      type: Sequelize.STRING
    },
    fat: 
    {
      type: Sequelize.STRING
    },
    loggedat: 
    {
      type: Sequelize.STRING
    },
   
  }, 
);
export default Athlete;
