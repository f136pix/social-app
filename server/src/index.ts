import express, {Express, Request, Response} from "express";
import {graphqlHTTP} from "express-graphql";
import {buildSchema, GraphQLSchema, Source} from "graphql";
import "dotenv/config";
import bodyParser from "body-parser";
import {AppDataSource} from "./data-source";
import {resolvers} from "./graphql/resolvers";
import cors from 'cors'
import * as fs from 'fs';
import {authenticateToken} from "./http/auth";

const app: Express = express()

// necessario para receber base64 imgs
app.use(bodyParser({limit: '50mb'}))
app.use(express.json({ limit: "50mb" }))
app.use(bodyParser.json())

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));


const graphqlSchema : string | Source = fs.readFileSync('./src/graphql/schema/index.graphql', 'utf-8')
const graphqlResolvers : {} = resolvers

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(graphqlSchema),
    rootValue: graphqlResolvers,
    graphiql: true,
}))

app.get('/auth', authenticateToken)

AppDataSource.initialize().then((): void => {
    app.listen(3333, (): void => {
        console.log(`[server]: Server is running at http://localhost:${3000}`);
    });
}).catch((err): void => {
    console.log(err)
});
