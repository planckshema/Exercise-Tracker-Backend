import db from "../models/index.js";
const WorkoutPlan = db.workoutPlan;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new WorkoutPlan
exports.create = (req, res) => {
  if (!req.body.title || !req.body.createdByUserId) {
    res.status(400).send({
      message: "Title and userId are required!",
    });
    return;
  }
  const plan = {
    title: req.body.title,
    scheduledTime: req.body.scheduledTime,
    createdByUserId: req.body.createdByUserId,
    assignedAthleteId: req.body.assignedAthleteId,
    assignedCoachId: req.body.assignedCoachId,
    notes: req.body.notes,
  };

  // Create WorkoutPlan
  WorkoutPlan.create(plan)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the WorkoutPlan.",
      });
    });
};

// Retrieve all WorkoutPlans
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  WorkoutPlan.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving WorkoutPlans.",
      });
    });
};

// Find a single WorkoutPlan by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  WorkoutPlan.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find WorkoutPlan with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving WorkoutPlan with id=" + id,
      });
    });
};

// Update a WorkoutPlan by id
exports.update = (req, res) => {
  const id = req.params.id;

  WorkoutPlan.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "WorkoutPlan was updated successfully." });
      } else {
        res.send({
          message: `Cannot update WorkoutPlan with id=${id}. Maybe not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating WorkoutPlan with id=" + id,
      });
    });
};

// Delete a WorkoutPlan by id
exports.delete = (req, res) => {
  const id = req.params.id;

  WorkoutPlan.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "WorkoutPlan was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete WorkoutPlan with id=${id}. Not found!` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete WorkoutPlan with id=" + id,
      });
    });
};

// Get all workout plans for a coach
exports.findPlansForCoach = (req, res) => {
  const coachId = req.params.coachId;

  WorkoutPlan.findAll({ where: { assignedCoachId: coachId } })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving WorkoutPlans for coachId=${coachId}`,
      });
    });
};

// Get all workout plans for an athlete
exports.findPlansForAthlete = (req, res) => {
  const athleteId = req.params.athleteId;

  WorkoutPlan.findAll({ where: { assignedAthleteId: athleteId } })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving WorkoutPlans for athleteId=${athleteId}`,
      });
    });
};

export default exports;
