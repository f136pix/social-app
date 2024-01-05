import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Post} from "./entity/Post";
import {PostLike} from "./entity/PostLike";
import {PostSave} from "./entity/PostSave";

export const AppDataSource : DataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Filipeco123!",
    database: "social",
    synchronize: true,
    logging: false,
    entities: [User, Post, PostLike, PostSave],
    migrations: [],
    subscribers: [],
})
