// @ts-ignore
import { sequelize, Park } from "../models/index.js"; // or .ts if needed
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, "../server/.env") });


console.log("🌱 Seeding using credentials:", {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});

const seedParks = async () => {
  try {
    await sequelize.sync({ force: true });

    await Park.bulkCreate([
      {
        name: "Rocky Mountain National Park",
        state: "CO",
        description: "Beautiful alpine scenery and wildlife.",
      },
      {
        name: "Zion National Park",
        state: "UT",
        description: "Massive sandstone cliffs and canyons.",
      },
      {
        name: "Yosemite National Park",
        state: "CA",
        description: "Waterfalls, cliffs, and giant sequoias.",
      },
    ]);

    console.log("Parks seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedParks();
