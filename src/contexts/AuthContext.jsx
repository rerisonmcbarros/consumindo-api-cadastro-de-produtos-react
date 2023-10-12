import { createContext, useEffect, useState } from "react"
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const {data, httpConfig, baseURL, error: httpError, loading} = useFetch();

    const isLoged = () => {
        return localStorage.getItem("user") ? true : false;
    }

    const signOut = async () => {
        httpConfig("/logout", "GET", null, token);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    }
    
    const signIn = (email, password) => {
        httpConfig(
            "/sign-in", 
            "POST",
            {email, password} 
        );
    }

    useEffect(() => {
        if (data) {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setToken(data.token);
        }
    }, [data]);

    useEffect(() => {
        if (httpError) {
            setError(httpError.data);
        }
    }, [httpError]);

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
