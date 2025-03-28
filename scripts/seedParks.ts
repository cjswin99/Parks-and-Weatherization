// @ts-ignore
import { sequelize, Park } from "../server/src/models/index.js";
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
    await sequelize.sync({ force: true }); // DANGEROUS: wipes tables. Good for dev!

    await Park.bulkCreate([
      {
        name: "Rocky Mountain",
        fullName: "Rocky Mountain National Park",
        state: "CO",
        description: "Beautiful alpine scenery and wildlife.",
        latitude: "40.3428",
        longitude: "-105.6836",
      },
      {
        name: "Zion",
        fullName: "Zion National Park",
        state: "UT",
        description: "Massive sandstone cliffs and canyons.",
        latitude: "37.2982",
        longitude: "-113.0263",
      },
      {
        name: "Yosemite",
        fullName: "Yosemite National Park",
        state: "CA",
        description: "Waterfalls, cliffs, and giant sequoias.",
        latitude: "37.8651",
        longitude: "-119.5383",
      },
    ]);

    console.log("✅ Parks seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedParks();
