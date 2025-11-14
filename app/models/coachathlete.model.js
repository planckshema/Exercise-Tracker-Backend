import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  const CoachAthlete = SequelizeInstance.define("CoachAthlete", {
    status: 
    {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "pending"
    },
    sport: 
    {
      type: Sequelize.STRING
    },
    coachId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "coaches",
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  athleteId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "athletes",
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
}, 
{
  timestamps: false,
}
);
export default CoachAthlete;