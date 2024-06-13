import { useEffect, useState } from 'react';

import Results from './view';
import useAPI from '../../hooks/useApi';


export default function Home() {

	const [content, setContent] = useState(null) ;
    const [searchWords, setSearchWords] = useState(localStorage.getItem("searchWords") || null) ;
	const top10 = useAPI() ;
    const [games, setGames] = useState(null) ; // par défaut : les 10 meilleurs films


	useEffect(() => {

		if (games != null) {
			setContent(() => (
				<Results games={games} handleChange={handleSearch} title={"Résultats"} />
			));
		} else {
			setContent(() => (
				<Results games={top10} handleChange={handleSearch} title={"Top 10"}/>
			)) ;
		}
	  
	}, [games, top10]) ;


	async function fetchGames(words){

		const result = await fetch(
			"https://m1.dysnomia.studio/api/Games/search?term=" + words, {
				headers: {
					"Content-Type": "application/json",
					Authorization : "Bearer " + localStorage.getItem("token")
				},
				method: "GET",
				mode: "cors"
			}
		) ;
		
		if(result.status === 400){
			throw new Error(result || "Une erreur 400 s'est produite lors de la recherche");
		}
		if(result.status === 200){
			console.log("recherche ok") ;
		} else {
			const errorData = await result.json();
			throw new Error(errorData || "Une erreur s'est produite lors de la recherche");
		}

		const data = await result.json() ;

		setGames(() => data) ;
	}


	async function handleSearch(e) {
		console.log("mes mots sont : ", e.target.value) ;
		
		setSearchWords(() => (e.target.value));
		localStorage.setItem("searchWords", e.target.value);

		if(e.target.value.length >= 4) {
			await fetchGames(e.target.value) ;
		} else if(e.target.value.length == 0) 
			setFilms(null) ;

	}

	useEffect(() => {
		if(searchWords != null)
			fetchGames(searchWords) ;
	}, [])
	

	return content ;
}