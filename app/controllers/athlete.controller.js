import db  from "../models/index.js";
const Athlete = db.athlete;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Athlete
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.email) {
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
      res.status(201).send(data);
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
  const name = req.query.name;
 var condition = name
    ? {
        [Op.or]: [
          { firstName: { [Op.like]: `%${name}%` } },
          { lastName: { [Op.like]: `%${name}%` } },
        ],
      }
    : null;
  Athlete.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving athletes.",
      });
    });
};

// Find a single Athlete with an id
exports.findAllForUser = (req, res) => {
  const email = req.params.email;
  Athlete.findAll({ where: { email: email } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Athletes for user with email=${email}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Athletes for user with email=${email}`,
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
        message: err.message || "Error retrieving Athlete with id=" + id,
      });
    });
};
// Update a Athlete by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Athlete.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Athlete was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Athlete with id=${id}. Maybe Athlete was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Athlete with id=" + id,
      });
    });
};
// Delete a Athlete with the specified id in the request
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
        message: err.message || "Could not delete Athlete with id=" + id,
      });
    });
};

export default exports;