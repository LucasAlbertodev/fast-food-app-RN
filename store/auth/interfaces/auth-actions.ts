import { Models } from "react-native-appwrite";

export type User  =  {
    name: string,
    email: string,
    avatar: string,
} & Models.Document

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUsers: () => Promise<void>
}