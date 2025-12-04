import db from "../models/index.js";
const CoachAthlete = db.coachAthlete;
const Op = db.Sequelize.Op;
const exports = {};

// Create a coach-athlete relationship
exports.create = (req, res) => {
  const { coachId, athleteId, sport, status, initiator } = req.body;

  if (!coachId || !athleteId) {
    return res.status(400).send({ message: "CoachId and AthleteId are required." });
  }

  CoachAthlete.create({ coachId, athleteId, sport, status, initiator })
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Find one relationship
exports.findOne = (req, res) => {
  const { coachId, athleteId } = req.params;

  if (!coachId || !athleteId) {
    return res.status(400).send({ message: "CoachId and AthleteId are required." });
  }

  CoachAthlete.findOne({ where: { coachId, athleteId } })
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: "Relationship not found." });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Update relationship
exports.update = (req, res) => {
  const { coachId, athleteId } = req.params;

  CoachAthlete.update(req.body, { where: { coachId, athleteId } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Relationship updated successfully." });
      } else {
        res.status(404).send({ message: "Relationship not found or no changes made." });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Coach and Athlete" }));
};

// Delete relationship
exports.delete = (req, res) => {
  const { coachId, athleteId } = req.params;

  CoachAthlete.destroy({ where: { coachId, athleteId } })
    .then(num => {
      if (num == 1) res.send({ message: "Relationship deleted successfully." });
      else res.status(404).send({ message: "Relationship not found." });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Get all accepted athletes for a coach
exports.findAthletesForCoach = (req, res) => {
  const coachId = req.params.coachId;

  CoachAthlete.findAll({
    where: { coachId, status: "accepted" },
    include: [{ model: db.athlete, as: "athlete" }]
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Get all accepted coaches for an athlete
exports.findCoachesForAthlete = (req, res) => {
  const athleteId = req.params.athleteId;

  CoachAthlete.findAll({
    where: { athleteId, status: "accepted" },
    include: [{ model: db.coach, as: "coach" }] 
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Get pending requests for a coach (athletes requesting to be coached)
exports.getPendingCoachRequests = (req, res) => {
  const coachId = req.params.coachId;

  CoachAthlete.findAll({ 
    where: { 
      coachId, 
      status: "pending",
      initiator: "athlete"
    } 
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Get pending requests for an athlete (coaches requesting to coach)
exports.getPendingAthleteRequests = (req, res) => {
  const athleteId = req.params.athleteId;

  CoachAthlete.findAll({ 
    where: { 
      athleteId, 
      status: "pending",
      initiator: "coach"
    } 
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Accept a request (update status from pending to accepted)
exports.acceptRequest = (req, res) => {
  const { coachId, athleteId } = req.params;

  CoachAthlete.update(
    { status: "accepted" },
    { where: { coachId, athleteId, status: "pending" } }
  )
    .then(num => {
      if (num == 1) {
        res.send({ message: "Request accepted successfully." });
      } else {
        res.status(404).send({ message: "Request not found or already processed." });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Reject a request (delete the relationship)
exports.rejectRequest = (req, res) => {
  const { coachId, athleteId } = req.params;

  CoachAthlete.destroy({
    where: { coachId, athleteId, status: "pending" }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Request rejected successfully." });
      } else {
        res.status(404).send({ message: "Request not found or already processed." });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

export default exports;
