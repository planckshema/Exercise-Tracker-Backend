import db  from "../models/index.js";
const WorkoutPlan  = db.coachAthlete;
const Op = db.Sequelize.Op;
const exports = {};

// Create a coach-athlete relationship
exports.create = (req, res) => {
  const { coachId, athleteId, sport, status, initiator } = req.body;

  if (!coachId || !athleteId) {
    return res.status(400).send({ message: "CoachId and AthleteId are required." });
  }

  WorkoutPlan.create({ coachId, athleteId, sport, status, initiator })
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};


exports.findOne = (req, res) => {
  const { coachId, athleteId } = req.params;

  if (!coachId || !athleteId) {
    return res.status(400).send({ message: "CoachId and AthleteId are required." });
  }

  WorkoutPlan.findOne({ where: { coachId, athleteId } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: "Relationship not found." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};



// Update sport or status for a coach-athlete pair
exports.update = (req, res) => {
  const { coachId, athleteId } = req.params;

  WorkoutPlan.update(req.body, {
    where: { coachId, athleteId }
  })
    .then(num => {
      if (num == 1) {
        res.send({ 
          message: "Relationship updated successfully." });
      } else {
        res.status(404).send({ 
          message: "Relationship not found or no changes made." });
      }
    })
    .catch(err => res.status(500).send({ 
      message: err.message || "Error updating Coach and Athlete",}));
};

// Delete the relationship
exports.delete = (req, res) => {
  const { coachId, athleteId } = req.params;

  WorkoutPlan.destroy({
    where: { coachId, athleteId }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Relationship deleted successfully." });
      } else {
        res.status(404).send({ message: "Relationship not found." });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Get all athletes for a coach
exports.findAthletesForCoach = (req, res) => {
  const coachId = req.params.coachId;

  WorkoutPlan.findAll({ where: { coachId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Get all coaches for an athlete
exports.findCoachesForAthlete = (req, res) => {
  const athleteId = req.params.athleteId;

  WorkoutPlan.findAll({ where: { athleteId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

export default exports;