import { useState} from "react";
import { useUserSetter } from "./useUser";
import { useTokenSetter } from "./useToken";

export default function useDeleteAccount() {
    const setUser = useUserSetter() ;
	const setToken = useTokenSetter();

    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    const deleteAccount = async () => {
        setDeleting(true);
        setError(null);
        try {
            const response = await fetch('https://m1.dysnomia.studio/api/Users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error deleting account');
            }

            setUser("null");
            setToken("null") ;

            return true; // or any other success indication
        } catch (err) {
            setError(err);
            return false; // or any other failure indication
        } finally {
            setDeleting(false);
        }
    };

    return { deleteAccount, deleting, error };
}

