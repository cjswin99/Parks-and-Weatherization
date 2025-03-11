import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/your_db_name', {
  dialect: 'postgres',
  logging: false, // Disable logging if desired
});

export default sequelize;
