import db from "../models/index.js";
const Exercise = db.exercise;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Exercise
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.params.categoryId) {
    res.status(400).send({
      message: "Exercise name and categoryId are required!",
    });
    return;
  }

  // Create an Exercise
  const exercise = {
    categoryId: req.params.categoryId, 
    name: req.body.name,
    description: req.body.description,
    equipment: req.body.equipment,
    duration: req.body.duration,
  };

  Exercise.create(exercise)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Exercise.",
      })
    );
};

// Retrieve all Exercises
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Exercise.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving exercises.",
      })
    );
};

// Retrieve all Exercises for a category
exports.findAllForCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  Exercise.findAll({ where: { categoryId } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving exercises for category.",
      })
    );
};

// Find a single Exercise by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Exercise.findByPk(id)
    .then((data) => {
      if (data) res.send(data);
      else
        res.status(404).send({
          message: `Cannot find Exercise with id=${id}.`,
        });
    })
    .catch((err) =>
      res.status(500).send({
        message: "Error retrieving Exercise with id=" + id,
      })
    );
};

// Update an Exercise
exports.update = (req, res) => {
  const id = req.params.id;

  Exercise.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Exercise was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Exercise with id=${id}. Exercise was not found.`,
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: "Error updating Exercise with id=" + id,
      })
    );
};

// Delete an Exercise
exports.delete = (req, res) => {
  const id = req.params.id;

  Exercise.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Exercise was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Exercise with id=${id}. Maybe Exercise was not found!`,
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Could not delete Exercise with id=" + id,
      })
    );
};



export default exports;
