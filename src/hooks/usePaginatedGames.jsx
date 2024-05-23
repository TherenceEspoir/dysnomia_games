import { useEffect, useState } from 'react';

//tenir compte de la pagination : pageSize et page

export default function usePaginatedGames(pageSize, page) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const result = await fetch(`https://m1.dysnomia.studio/api/Games/top?pageSize=${pageSize}&page=${page}`);

                if (!result.ok) {
                    throw new Error("Error fetching games");
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
    }, [pageSize, page]);

    return { data, error, loading };
}