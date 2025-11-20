import db  from "../models/index.js";
const Nutrition = db.Nutrition;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Nutrient
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create Nutrient data
  const nutrient = {
    nutriId: req.params.nutriId,
    userId: req.body.userId,
    item: req.body.item,
    calories: req.body.calories,
    carbs: req.body.carbs,
    protien: req.body.protien,
    fat: req.body.fat,
    loggedAt: req.body.loggedAt,
    
  };
  // Save Nutrition in the database
  Nutrition.create(nutrient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating nutrient.",
      });
    });
};
// Retrieve all Nutrient from the database.
exports.findAll = (req, res) => {
  const nutriId = req.query.nutriId;
  var condition = nutriId
    ? {
        nutriId: {
          [Op.like]: `%${nutriId}%`,
        },
      }
    : null;

  Nutrition.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving nutrient.",
      });
    });
};
// Retrieve all Nutrients from a user from the database.
exports.findAllForNutrient = (req, res) => {
  const coachId = req.params.coachId;

  Nutrition.findAll({ where: { nutriId: nutriId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving nutrient.",
      });
    });
};
// Find a single Nutrition with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Nutrition.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Nutrition with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Nutrition with id=" + id,
      });
    });
};

// Delete a Nutrition from group with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Nutrition.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Nutrition was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Nutrition with id=${id}. Maybe Nutrition was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Nutrition with id=" + id,
      });
    });
};

export default exports;
