import { seedDemo } from '../lib/seed';

seedDemo()
  .then((r) => {
    console.log('Seeded demo data:', r);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
