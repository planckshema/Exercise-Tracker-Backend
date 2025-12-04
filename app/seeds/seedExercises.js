import db from "../models/index.js";

/**
 * Seed exercise categories and pre-set exercises into the database.
 * This function checks if categories/exercises already exist before inserting
 * to avoid duplicates on multiple runs.
 */
export const seedExercises = async () => {
  try {
    // Define exercise categories with their exercises
    const categories = [
      {
        name: "Chest",
        description: "Exercises targeting the chest muscles",
        exercises: [
          { name: "Bench Press", description: "Lie on a flat bench and press weight upward", equipment: "Barbell, Bench", duration: 60 },
          { name: "Push-ups", description: "Classic bodyweight chest exercise", equipment: "None", duration: 30 },
          { name: "Dumbbell Flyes", description: "Lying chest flyes with dumbbells", equipment: "Dumbbells, Bench", duration: 45 },
          { name: "Cable Crossovers", description: "Cable machine chest exercise", equipment: "Cable Machine", duration: 45 },
          { name: "Incline Bench Press", description: "Bench press on an incline", equipment: "Barbell, Incline Bench", duration: 60 },
        ]
      },
      {
        name: "Back",
        description: "Exercises targeting the back muscles",
        exercises: [
          { name: "Deadlifts", description: "Lift a barbell from the ground", equipment: "Barbell", duration: 60 },
          { name: "Pull-ups", description: "Bodyweight back exercise", equipment: "Pull-up Bar", duration: 30 },
          { name: "Bent Over Rows", description: "Row weight to chest while bent over", equipment: "Barbell", duration: 60 },
          { name: "Lat Pulldowns", description: "Pull down a cable machine bar", equipment: "Cable Machine", duration: 45 },
          { name: "Rows", description: "Machine-based rowing exercise", equipment: "Rowing Machine", duration: 45 },
        ]
      },
      {
        name: "Legs",
        description: "Exercises targeting the leg muscles",
        exercises: [
          { name: "Squats", description: "Full body leg exercise with barbell", equipment: "Barbell, Rack", duration: 60 },
          { name: "Lunges", description: "Single leg stepping exercise", equipment: "None or Dumbbells", duration: 45 },
          { name: "Leg Press", description: "Machine-based leg pressing", equipment: "Leg Press Machine", duration: 60 },
          { name: "Leg Curls", description: "Hamstring isolation exercise", equipment: "Leg Curl Machine", duration: 45 },
          { name: "Calf Raises", description: "Standing calf strengthening", equipment: "Barbell or Dumbbells", duration: 30 },
        ]
      },
      {
        name: "Shoulders",
        description: "Exercises targeting the shoulder muscles",
        exercises: [
          { name: "Shoulder Press", description: "Press weight overhead", equipment: "Barbell or Dumbbells", duration: 60 },
          { name: "Lateral Raises", description: "Raise dumbbells to sides", equipment: "Dumbbells", duration: 30 },
          { name: "Face Pulls", description: "Cable machine shoulder exercise", equipment: "Cable Machine", duration: 30 },
          { name: "Shrugs", description: "Lift shoulders up toward ears", equipment: "Barbell or Dumbbells", duration: 30 },
          { name: "Military Press", description: "Standing shoulder press", equipment: "Barbell", duration: 60 },
        ]
      },
      {
        name: "Arms",
        description: "Exercises targeting biceps and triceps",
        exercises: [
          { name: "Bicep Curls", description: "Curl dumbbells or barbell", equipment: "Dumbbells or Barbell", duration: 30 },
          { name: "Tricep Dips", description: "Bodyweight tricep exercise", equipment: "Dip Bar", duration: 30 },
          { name: "Skull Crushers", description: "Tricep isolation with dumbbells", equipment: "Dumbbells or Barbell", duration: 30 },
          { name: "Cable Curls", description: "Machine-based bicep curls", equipment: "Cable Machine", duration: 30 },
          { name: "Hammer Curls", description: "Bicep curls with neutral grip", equipment: "Dumbbells", duration: 30 },
        ]
      },
      {
        name: "Core",
        description: "Exercises targeting abdominal and core muscles",
        exercises: [
          { name: "Planks", description: "Isometric core exercise", equipment: "None", duration: 45 },
          { name: "Crunches", description: "Abdominal isolation exercise", equipment: "None or Mat", duration: 30 },
          { name: "Russian Twists", description: "Rotational core exercise", equipment: "Dumbbell or Medicine Ball", duration: 30 },
          { name: "Leg Raises", description: "Hanging leg raising exercise", equipment: "Pull-up Bar", duration: 30 },
          { name: "Cable Crunches", description: "Machine-based crunches", equipment: "Cable Machine", duration: 30 },
        ]
      },
      {
        name: "Cardio",
        description: "Cardiovascular and aerobic exercises",
        exercises: [
          { name: "Running", description: "Steady state running", equipment: "None or Treadmill", duration: 1800 },
          { name: "Cycling", description: "Stationary or outdoor cycling", equipment: "Bike", duration: 1800 },
          { name: "Swimming", description: "Full body cardiovascular exercise", equipment: "Pool", duration: 1800 },
          { name: "Jumping Jacks", description: "High intensity bodyweight cardio", equipment: "None", duration: 60 },
          { name: "Rowing", description: "Rowing machine cardio", equipment: "Rowing Machine", duration: 1800 },
        ]
      },
    ];

    // Process each category
    for (const categoryData of categories) {
      // Check if category exists
      let category = await db.exerciseCategory.findOne({
        where: { name: categoryData.name }
      });

      // Create category if it doesn't exist
      if (!category) {
        category = await db.exerciseCategory.create({
          name: categoryData.name,
          description: categoryData.description
        });
        console.log(`✓ Created category: ${category.name}`);
      } else {
        console.log(`→ Category already exists: ${category.name}`);
      }

      // Add exercises for this category
      for (const exerciseData of categoryData.exercises) {
        const exerciseExists = await db.exercise.findOne({
          where: { 
            name: exerciseData.name,
            categoryId: category.id
          }
        });

        if (!exerciseExists) {
          await db.exercise.create({
            name: exerciseData.name,
            description: exerciseData.description,
            equipment: exerciseData.equipment,
            duration: exerciseData.duration,
            categoryId: category.id
          });
          console.log(`  ✓ Added exercise: ${exerciseData.name}`);
        } else {
          console.log(`  → Exercise already exists: ${exerciseData.name}`);
        }
      }
    }

    console.log("\n✓ Exercise seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding exercises:", error);
  }
};

export default seedExercises;
