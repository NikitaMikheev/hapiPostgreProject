export interface PHost {
    port: number,
    host: string
}

export interface myUser {
    firstName: string,
    lastName: string,
    userEmail: string,
    userPass: string,
    userPassConfm: string,
    age: number
}

export interface Tokens {
    accessToken: string,
    refreshToken: string,
}