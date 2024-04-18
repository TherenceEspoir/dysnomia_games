import './index.css' ;
import useAPI from '../../hooks/useApi';

export default function Home() {
    const data = useAPI();
    console.log(data);
    return (
        <p>Ma belle page d'accueil avec Router !</p>
    ) ;
}
