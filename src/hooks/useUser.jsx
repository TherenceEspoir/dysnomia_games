import { createContext, useContext, useEffect, useState } from 'react';
import { useToken } from './useToken';

const UserContext = createContext();


export function UserContextProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('user') || null);
    const token = useToken();

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
            setUser(data);
        }
        getData();
    }
    ,[token]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    },[user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const { user } = useContext(UserContext);
    return user;
}

export function useUserSetter() {
    const { setUser } = useContext(UserContext);
    return setUser;
}