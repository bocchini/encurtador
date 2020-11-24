import { Sequelize } from "sequelize";

const password = "root";
const user = "root";
const bd = "encurtador_node";
const port = 3306;

const sequelize = new Sequelize(
  `mysql://${user}:${password}@localhost:${port}/${bd}`
);

export default sequelize;
