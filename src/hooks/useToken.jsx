import { createContext, useContext, useEffect, useState } from 'react';

export const TokenContext = createContext();

export function TokenContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        localStorage
            .setItem('token', token);
    }
    ,[token]);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
}

export function useToken() {
    return useContext(TokenContext);
}

export function useTokenSetter() {
    const { setToken } = useContext(TokenContext);
    return setToken;
}