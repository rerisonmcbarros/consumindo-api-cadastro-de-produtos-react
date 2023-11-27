import { createContext, useEffect, useState } from "react"
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const {get, create, loading} = useFetch();

    const isLoged = () => {
        return localStorage.getItem("user") ? true : false;
    }

    const signOut = async () => {
        let response = await get("/logout", token);

        if (!response.ok) {
            console.log(await response.json());
            return;
        }

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    }
    
    const signIn = async (email, password) => {
        let response = await create("/sign-in", {email, password});

        if (!response.ok) {
            console.log(response);
            response = await response.json();
            console.log(response);
            setError(response);
            return;
        }

        response = await response.json();

        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setToken(response.token);
        setError(null);
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
        setToken(localStorage.getItem("token"));
    }, []);

    return (
        <AuthContext.Provider value={{user, token, signIn, signOut, isLoged, error, setError, loading}}>
            {children}
        </AuthContext.Provider>
    );
}
