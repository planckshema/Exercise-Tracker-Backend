import Exercise from "../models/exercise.model.js";
import ExerciseCategory from "../models/exerciseCategory.model.js";

class ExerciseController {
  async create(req, res) {
    try {
      const exercise = await Exercise.create(req.body);
      res.status(201).json(exercise);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const exercises = await Exercise.findAll({
        include: ExerciseCategory,
      });
      res.json(exercises);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const exercise = await Exercise.findByPk(req.params.id, {
        include: ExerciseCategory,
      });

      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      res.json(exercise);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const exercise = await Exercise.findByPk(req.params.id);

      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      await exercise.update(req.body);

      res.json(exercise);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const exercise = await Exercise.findByPk(req.params.id);

      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      await exercise.destroy();

      res.json({ message: "Exercise deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new ExerciseController();
