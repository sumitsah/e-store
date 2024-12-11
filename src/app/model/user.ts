export interface UserLogin {
    username: string | null | undefined,
    password: string | null | undefined
}

export interface LoginResponse {
    token: string
}

export interface UserDetails {
    id: number,
    username: string
}