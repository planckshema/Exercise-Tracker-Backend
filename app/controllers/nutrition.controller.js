import fs from "fs";
import path from "path";

const dataPath = path.resolve("./app/data/nutritionPlans.json");

const readData = () => {
  try {
    const raw = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
};

const exports = {};

exports.findAll = (req, res) => {
  const plans = readData();
  res.send(plans);
};

exports.findOne = (req, res) => {
  const id = Number(req.params.id);
  const plans = readData();
  const plan = plans.find((p) => p.id === id);
  if (plan) res.send(plan);
  else res.status(404).send({ message: `Nutrition plan with id=${id} not found.` });
};

export default exports;
