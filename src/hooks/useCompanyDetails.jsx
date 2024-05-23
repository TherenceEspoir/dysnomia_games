import { useState, useEffect } from "react";

//hook pour les détails de l'entreprise dont on a l'id
export default function useCompanyDetails(companyId) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const result = await fetch(`https://m1.dysnomia.studio/api/Companies/${companyId}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                if(result.status===204){
                    //si le statut est 204, il n'y a pas de contenu à afficher pour cette entreprise
                    setData(null);
                    setLoading(false);
                    return;
                }

                if (!result.ok) {
                    throw new Error("Error fetching company details");
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
    }, [companyId]);

    return { data, error, loading };
}