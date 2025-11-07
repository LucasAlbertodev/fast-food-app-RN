import { getCurrentUser } from "@/lib/appwrite";
import { create } from 'zustand';
import { AuthState, User } from './interfaces/auth-actions';

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setIsAuthenticated: (value) => set({
        isAuthenticated:value
    }),
    setUser: (user) => set({
        user
    }),
    setLoading: (value) => set({
        isLoading: value
    }),
    fetchAuthenticatedUsers: async () => {
        set({isLoading: true});

        try {
            const user = await getCurrentUser();

            if(user) set({isAuthenticated:true, user: user as unknown as User })
            else set( { isAuthenticated: false, user: null } );
        } catch (error) {
            console.log('fetchAuthenticated Error',error),
            set({isAuthenticated: false, user:null})
        }finally{
            set({isLoading:false})
        }
    }

}))
