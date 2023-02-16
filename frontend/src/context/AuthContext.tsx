import { createContext, ReactNode, use } from "react";

interface UserProps {
    name: string
    avatarUrl: string
}

export interface AuthContextProps {
    user: UserProps
    signIn: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({children}: AuthProviderProps){

    async function signIn(){
        console.log('entrou')
    }

    return(
        <AuthContext.Provider value={{ signIn, user: {name: 'Vicen', avatarUrl: 'foto'}}}>
            {children}
        </AuthContext.Provider>
    )
}