import { useState } from 'react';
import usePaginatedGames from '../../hooks/usePaginatedGames';

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
        <div>
            <h1>Game List</h1>
            <ul>
                {data.map((game) => (
                    <li key={game.id}>
                        <a href={`/game/${game.id}`}>{game.name}</a>
                    </li>
                ))}
            </ul>
            <p>Page: {page}</p>
            <p>Page Size: {pageSize}</p>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>

        </div>
    );
}