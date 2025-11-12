import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  const Athlete = SequelizeInstance.define("CoachAthlete", {
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
export default Athlete;