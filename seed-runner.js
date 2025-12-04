import db from './app/models/index.js';
import seedExercises from './app/seeds/seedExercises.js';

(async () => {
  try {
    await db.sequelize.sync();
    console.log('Database synced — running seeder...');
    await seedExercises();
    console.log('Seeding finished — exiting.');
    process.exit(0);
  } catch (err) {
    console.error('Seeder error:', err);
    process.exit(1);
  }
})();
