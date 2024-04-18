import { createContext, useContext, useEffect, useState } from 'react';

const TokenContext = createContext();

export function TokenContextProvider({ children }) {
	const [token, setToken] = useState(localStorage.token || null);

	useEffect(() => {
		localStorage.token = token;
	}, [token]);

	return (
		<TokenContext.Provider value={{token, setToken}}>
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