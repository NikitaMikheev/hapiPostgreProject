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

export interface RefreshToken {
    aud: string,
    iss: string,
    id: number,
    sub: boolean,
    timeSkewSec: number,
    iat: number,
    exp: number
}

export interface TUserTree {
    firstName: string,
    lastName: string,
    parentID: number[],
    childID: number[],
    partnerID: number[]

}