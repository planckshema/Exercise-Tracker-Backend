import db  from "../models/index.js";
const Coach = db.coach;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Coach
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Coach
  const coach = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    sport: req.body.sport,
    gender: req.body.gender,
    height: req.body.height,
    weight: req.body.weight,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };
  // Save Coach in the database
  Coach.create(coach)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Coach.",
      });
    });
};
// Retrieve all Coaches from the database.
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
  Coach.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coaches.",
      });
    });
};

// Find a single Coach with an id
exports.findAllForUser = (req, res) => {
  const email = req.params.email;
  Coach.findAll({ where: { email: email } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Coaches for user with email=${email}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Coaches for user with email=${email}`,
      });
    });
};
// Find a single Coach with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Coach.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Coach with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Coach with id=" + id,
      });
    });
};
// Update a Coach by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Coach.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Coach was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Coach with id=${id}. Maybe Coach was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Coach with id=" + id,
      });
    });
};
// Delete a Coach with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Coach.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Coach was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Coach with id=${id}. Maybe Coach was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Coach with id=" + id,
      });
    });
};

export default exports;