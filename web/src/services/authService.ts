import axios, {AxiosResponse} from "axios";
import {ILoginUser, INewUser, IUser} from "@/types";
import Cookies from "js-cookie";

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

export async function createUserAccountApi(data: INewUser) {
    const req = {
        query: `
        mutation{
          createUser(userInput: {email:"${data.email}",  password:"${data.password}",username: "${data.username}", name: "${data.name}"}) {
        id
        name
            }
        }`
    }
    const resData: AxiosResponse = await graphQlClient.post('', req)

    if (!resData.data.data.createUser) {
        const errMsg = resData.data.errors[0].message
        throw new Error(errMsg)
    }
    const userCreated = resData.data.data.createUser
    return userCreated
}

export async function loginUserApi(data: ILoginUser) {
    const req = {
        query: `
        mutation {
            loginUser(userLogin:{email: "${data.email}", password:"${data.password}"}) {
        jwtToken
            }
        }`
    }
    const resData: AxiosResponse = await graphQlClient.post('', req)

    if (!resData.data.data.loginUser) {
        const errMsg = resData.data.errors[0].message
        throw new Error(errMsg)
    }
    const jwt = resData.data.data.loginUser.jwtToken
    return jwt
}

export async function getCurrentUser(): Promise<IUser> {
    const data: any = await authClient.get('', {
        headers: {
            Authorization: Cookies.get('jwt')

        }
    })
    return data.data.user;
}

export async function destroyJwt(): Promise<boolean> {
    try{
    Cookies.remove('jwt', {path: ''})
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}