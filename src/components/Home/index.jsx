import View from './view';
import { useUserContext } from '../../hooks/useUserContext';
export default function Home() {
	const { userData } = useUserContext();
	console.log(userData)
	return (
		<View />
	);
}