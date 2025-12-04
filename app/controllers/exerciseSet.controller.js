import fs from "fs";
import path from "path";

const dataPath = path.resolve("./app/data/exerciseSets.json");

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
  const sets = readData();
  res.send(sets);
};

exports.findOne = (req, res) => {
  const id = Number(req.params.id);
  const sets = readData();
  const set = sets.find((s) => s.id === id);
  if (set) res.send(set);
  else
    res.status(404).send({ message: `Exercise set with id=${id} not found.` });
};

export default exports;
