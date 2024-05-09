import './index.css' ;
import useAPI from '../../hooks/useApi';

export default function Home() {
    const data = useAPI();

    console.log(data) ;
    
    return (
        <div>
            <h1>Home</h1>
            <table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((game) => (
                        <tr key={game.id}>
                            <td>{game.name}</td>
                            <td>{game.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}
