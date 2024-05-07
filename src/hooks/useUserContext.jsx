import { createContext, useContext, useEffect, useState } from 'react';
import { useToken } from './useToken';

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider({ children }) {
    const [userData, setUserData] = useState({});
    const { token } = useToken();

    //https://m1.dysnomia.studio/api/Users/me : c'est le lien pour récupérer les données de l'utilisateur connecté
    useEffect(() =>{
        async function getData(){
            const result = await fetch('https://m1.dysnomia.studio/api/Users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(!result.ok){
                throw 'Pas OK';
            }

            const data = await result.json();
            setUserData(data);
        }
        getData();
    }
    ,[token]);

    useEffect(() => {
        // Mise à jour des données utilisateur dans localStorage à chaque changement
        localStorage.setItem('userData', JSON.stringify(userData));
    },[userData]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}