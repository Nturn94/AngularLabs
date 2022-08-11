export interface JwtResponse {
    user:{
        username: string;
        userid: number;
        userbirthdate: number;
        userage: number;
        access_token: string;
        expires_in: number;
    }
}
