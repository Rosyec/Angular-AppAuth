export interface AuthResponse {
    error:  boolean;
    id?:     string;
    name?:   string;
    email?:  string;
    token?: string;
    msg:    string;
}

export interface Usuario {
    id:     string;
    name:   string;
    email:  string;
}