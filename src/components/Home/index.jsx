import Top from './view';
import useAPI from '../../hooks/useApi';


export default function Home() {
	const data = useAPI();
	
	return (
		<Top best10={data}/>
	);
}