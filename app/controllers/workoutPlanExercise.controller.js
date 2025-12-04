import db from "../models/index.js";
const WorkoutPlanExercise = db.workoutPlanExercise;
const Op = db.Sequelize.Op;
const exports = {};

// Create WorkoutPlanExercise
exports.create = async (req, res) => {
  const { workoutPlanId, exerciseId, sets, reps, duration, durationUnit } = req.body;

  if (!workoutPlanId || !exerciseId) {
    return res.status(400).send({
      message: "WorkoutPlanId and ExerciseId are required!",
    });
  }

  try {
    const exercise = await WorkoutPlanExercise.create({
      workoutPlanId,
      exerciseId,
      sets,
      reps,
      duration,
      durationUnit,
    });
    res.status(201).send(exercise);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the WorkoutPlanExercise.",
    });
  }
};

// Retrieve all exercises for a workout plan
exports.findByWorkoutPlan = async (req, res) => {
  const workoutPlanId = req.params.workoutPlanId;

  try {
    const data = await WorkoutPlanExercise.findAll({ where: { workoutPlanId } });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error retrieving exercises for workoutPlanId=${workoutPlanId}`,
    });
  }
};

// Find a single WorkoutPlanExercise by id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await WorkoutPlanExercise.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: `Cannot find WorkoutPlanExercise with id=${id}.` });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving WorkoutPlanExercise with id=" + id,
    });
  }
};

// Update a WorkoutPlanExercise by id
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [num] = await WorkoutPlanExercise.update(req.body, { where: { id } });
    if (num === 1) {
      res.send({ message: "WorkoutPlanExercise was updated successfully." });
    } else {
      res.status(404).send({
        message: `Cannot update WorkoutPlanExercise with id=${id}. Not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating WorkoutPlanExercise with id=" + id,
    });
  }
};

// Delete a WorkoutPlanExercise by id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await WorkoutPlanExercise.destroy({ where: { id } });
    if (num === 1) {
      res.send({ message: "WorkoutPlanExercise was deleted successfully!" });
    } else {
      res.status(404).send({ message: `Cannot delete WorkoutPlanExercise with id=${id}. Not found!` });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Could not delete WorkoutPlanExercise with id=" + id,
    });
  }
};

exports.markCompleted = async (req, res) => {
  const id = req.params.id;
  try {
    const [num] = await WorkoutPlanExercise.update({ isCompleted: true }, { where: { id } });
    if (num === 1) {
      const exercise = await WorkoutPlanExercise.findByPk(id);
      const exercises = await WorkoutPlanExercise.findAll({ where: { workoutPlanId: exercise.workoutPlanId } });
      const allDone = exercises.every(e => e.isCompleted);
      if (allDone) {
        await db.workoutPlan.update({ isCompleted: 1 }, { where: { id: exercise.workoutPlanId } });
      }
      res.send({ message: "Exercise marked as completed." });
    } else {
      res.status(404).send({ message: `Cannot mark WorkoutPlanExercise with id=${id}. Not found.` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Error marking WorkoutPlanExercise as completed." });
  }
};


export default exports;
