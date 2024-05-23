import { useState, useEffect } from "react";
import getCompanyById from "../business/getCompanyById";

//hook pour les détails de l'entreprise dont on a l'id
export default function useCompanyDetails(companyId) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const { data, error } = await getCompanyById(companyId);
            
            setData(data);
            setError(error);
            setLoading(false);
        }

        getData();
    }, [companyId]);

    return { data, error, loading };
}