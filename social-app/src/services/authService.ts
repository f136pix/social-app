import axios from "axios";
import {INewUser} from "@/types";

const headers = {
    "Content-Type": "application/json"
}

const graphQlClient = axios.create({
    baseURL: "http://localhost:3000/graphql",
    headers: headers
})

export async function createUserAccount(data: INewUser) {
    const req = {
        query: `
        mutation{
          createUser(userInput: {email:"${data.email}",  password:"${data.password}",username: "${data.username}", name: "${data.name}"}) {
        id
        name
            }
        }`
    }

    return graphQlClient.post('', req)
}