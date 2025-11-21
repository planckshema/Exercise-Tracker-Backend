import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  const CoachAthlete = SequelizeInstance.define("CoachAthlete", {
    Status: 
    {
      type: Sequelize.STRING
    },
    Sport: 
    {
      type: Sequelize.STRING
    },
}, 
);
export default CoachAthlete;