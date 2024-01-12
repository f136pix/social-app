import {INewPost} from "@/types";
import axios, {AxiosResponse} from "axios";
import {jsToPostgressArr} from "@/services/index.ts";

const headers = {
    "Content-Type": "application/json"
}

const graphQlClient = axios.create({
    baseURL: "http://localhost:3333/graphql",
    headers: headers
})

const authClient = axios.create({
    baseURL: "http://localhost:3333/auth",
    headers: headers
})

export async function createPostApi(data: INewPost): Promise<boolean> {

    const req = {
        query: `
        mutation {
  createPost(postInput: {caption: "${data.caption}", tags:"${data.tags}", user:${data.user}, location :"${data.location}", imageUrl:"${data.imageUrl}"})
  }`
    }
    console.log('apicall' + data.imageUrl)
    const resData: AxiosResponse = await graphQlClient.post('', req)
    console.log('axios', resData)
    return true
}
