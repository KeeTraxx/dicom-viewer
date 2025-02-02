import { Sequelize } from "sequelize";


// Centralize database configuration
export const sequelize = new Sequelize(process.env.DATABASE_URL ?? "sqlite:./sqlite.db");