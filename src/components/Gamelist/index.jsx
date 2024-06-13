import { useState } from 'react';
import usePaginatedGames from '../../hooks/usePaginatedGames';
import ViewList from './view';

export default function Gamelist() {
    const [pageSize, setPageSize] = useState(25);
    const [page, setPage] = useState(1);
    const { data, error, loading } = usePaginatedGames(pageSize, page);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <ViewList data={data} page={page} pageSize={pageSize} setFct={setPage} />
    );
}