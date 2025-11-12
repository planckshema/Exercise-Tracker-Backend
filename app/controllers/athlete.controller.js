import db  from "../models/index.js";
const Athlete = db.athlete;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Athlete
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Athlete
  const athlete = {
    coachId: req.params.coachId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    sport: req.body.sport,
    gender: req.body.gender,
    height: req.body.height,
    weight: req.body.weight,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  };
  // Save Athlete in the database
  Athlete.create(athlete)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Athlete.",
      });
    });
};
// Retrieve all Athletes from the database.
exports.findAll = (req, res) => {
  const athleteId = req.query.athleteId;
  var condition = athleteId
    ? {
        athleteId: {
          [Op.like]: `%${athleteId}%`,
        },
      }
    : null;

  Athlete.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving athletes.",
      });
    });
};
// Retrieve all Athletes for a coach from the database.
exports.findAllForCoach = (req, res) => {
  const coachId = req.params.coachId;

  Athlete.findAll({ where: { coachId: coachId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving athletes.",
      });
    });
};
// Find a single Athlete with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Athlete.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Athlete with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Athlete with id=" + id,
      });
    });
};
// Update a Lesson by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Lesson.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Lesson with id=${id}. Maybe Lesson was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Lesson with id=" + id,
      });
    });
};

// Delete a Athlete from group with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Athlete.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Athlete was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Athlete with id=${id}. Maybe Athlete was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Athlete with id=" + id,
      });
    });
};

export default exports;
