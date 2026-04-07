export interface AuthenticationResponse {
    id: number;
    email: string;
    name: string;
    lastNames: string;
    jwtToken: string;
    refreshToken: string;
    role: string;
}