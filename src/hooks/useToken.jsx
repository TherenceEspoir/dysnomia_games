import { createContext, useContext, useEffect, useState } from 'react';

const TokenContext = createContext();

export function TokenContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    async function renewToken() {
        const result = await fetch(
            "https://m1.dysnomia.studio/api/Users/renewToken", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : "Bearer " + token
                },
                method: "GET",
                mode: "cors"
            }
        ) ;
    
        if(!result.ok){
            throw "Pas OK !" ;
        }
    
        const data = await result.text() ;
    
        setToken(() => data) ;
    }

    useEffect(() => {
        localStorage
            .setItem('token', token);
    }
    ,[token]);

    // Renouvellement automatique du token
    useEffect(() => {
		if(token === null) {
			return ;
		}

		let timeoutId = setTimeout(() => {
            renewToken() ;
            // console.log("RENEW") ;
            // console.log(token) ;
		}, 6600000); // 6600000 ms = 1h50min OU 5000 ms pour test

		return () => clearTimeout(timeoutId);

	}, [token]) ;

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
}

export function useToken() {
    const { token } = useContext(TokenContext);
    return token;
}

export function useTokenSetter() {
    const { setToken } = useContext(TokenContext);
    return setToken;
}