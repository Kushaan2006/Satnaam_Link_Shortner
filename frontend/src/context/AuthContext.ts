import { type Dispatch, type SetStateAction, createContext } from "react";


export type User = {
    id: number;
    name: string;
    email: string;
};

export type AuthContextType = {
    isLoading: boolean;
    user: User | null;
    accessToken: string | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);