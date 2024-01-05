export type ILoginResponse = {
    jwtToken : String
}

export type IDecodedToken = {
    id: number,
    iat: number,
    exp: number
}

export type IUser = {
    id: number,
    username : string,
    email: string,
    password: string,
    bio: string | null,
    created_at: Date,
    updated_at: Date
}
