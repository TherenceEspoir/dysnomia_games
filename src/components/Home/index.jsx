import { useEffect, useState } from 'react';

import Results from './view';
import useAPI from '../../hooks/useApi';
import useSearchGame from '../../hooks/useSearchGame';


export default function Home() {

    const [searchWords, setSearchWords] = useState(localStorage.getItem("searchWords") || null) ;
	const top10 = useAPI() ;
	const gamesData = useSearchGame(searchWords) ;



	async function handleSearch(e) {
		console.log("mes mots sont : ", e.target.value) ;
		
		setSearchWords(() => (e.target.value));
		localStorage.setItem("searchWords", e.target.value);

	}

	
	if (searchWords != null && searchWords.length >= 4) {
		return <Results games={gamesData} handleChange={handleSearch} title={"Résultats"} /> ;
	} else {
		return <Results games={top10} handleChange={handleSearch} title={"Top 10"}/> ;
	}
}