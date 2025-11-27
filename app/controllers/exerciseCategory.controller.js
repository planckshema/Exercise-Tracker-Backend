import db from "../models/index.js";
const ExerciseCategory = db.exerciseCategory;
const Op = db.Sequelize.Op;
const exports = {};

// Create a new ExerciseCategory
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Category name cannot be empty!" });
    return;
  }

  const category = 
  { 
    name: req.body.name,
    description: req.body.description 
  };

  ExerciseCategory.create(category)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Error creating ExerciseCategory."
    }));
};

// Retrieve all categories
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  ExerciseCategory.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Error retrieving ExerciseCategories."
    }));
};

// Find one category by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ExerciseCategory.findByPk(id)
    .then(data => data ? res.send(data) : res.status(404).send({ message: `Category with id=${id} not found.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Update category
exports.update = (req, res) => {
  const id = req.params.id;
  ExerciseCategory.update(req.body, { where: { id } })
    .then(num => num == 1
      ? res.send({ message: "Category updated successfully." })
      : res.send({ message: `Cannot update category with id=${id}.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Delete category
exports.delete = (req, res) => {
  const id = req.params.id;
  ExerciseCategory.destroy({ where: { id } })
    .then(num => num == 1
      ? res.send({ message: "Category deleted successfully." })
      : res.send({ message: `Cannot delete category with id=${id}.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};

export default exports;
