//hook pour le profil de l'utilisateur
import { useState, useEffect } from "react";


export default function useProfile() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const result = await fetch("https://m1.dysnomia.studio/api/Users/me", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (!result.ok) {
                    localStorage.clear();
                    throw new Error("Error fetching profile");
                }

                const data = await result.json();
                setData(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        getData();
    }, []);

    return { data, error, loading };
}
