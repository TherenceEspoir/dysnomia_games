import './index.css' ;
import useAPI from '../../hooks/useApi';
import { useUserContext } from '../../hooks/useUserContext';

export default function Home() {
    const data = useAPI();
    const { userData } = useUserContext(); // Accéder aux données utilisateur depuis le contexte
    //afficher dans la console les données de l'utilisateur
    console.log(userData);
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
