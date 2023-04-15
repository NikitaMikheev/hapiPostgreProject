export interface PHost {
    port: number,
    host: string
}

export interface myUser {
    firstName: string,
    lastName: string,
    userEmail: string,
    userPass: string,
    userPassConfm?: string,
    age: number,
    city: string
}

export interface Tokens {
    accessToken: string,
    refreshToken: string,
}

export interface refreshToken {
    aud: string,
    iss: string,
    id: number,
    sub: boolean,
    timeSkewSec: number,
    iat: number,
    exp: number
}