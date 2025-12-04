import db from "../models/index.js";
const Admin = db.admin;
const User = db.user;
const Op = db.Sequelize.Op;

const exports = {};

// Create and Save a new Admin
exports.create = async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(400).send({ message: "userId is required!" });
    }

    // Verify that the user exists
    const user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Create Admin record
    const admin = await Admin.create({ userId: req.body.userId });
    res.status(201).send(admin);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error creating Admin." });
  }
};

// Retrieve all Admins
exports.findAll = (req, res) => {
  Admin.findAll({ include: [{ model: User }] })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Admins.",
      });
    });
};

// Find Admin by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Admin.findByPk(id, { include: [{ model: User }] })
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Admin with id=${id} not found.` });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Admin with id=" + id });
    });
};

// Delete Admin by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Admin.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Admin deleted successfully!" });
      } else {
        res.status(404).send({ message: `Admin with id=${id} not found.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete Admin with id=" + id });
    });
};

export default exports;
