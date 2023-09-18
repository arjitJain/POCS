import "reflect-metadata";
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "demo",
    password: "root@123",
    database: "twofa",
    synchronize: true,
    logging: false,
    entities: ["./src/entity/*.ts"],
    migrations: ["./src/migration/*.ts"],
    subscribers: [],
})
