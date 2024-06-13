import { useEffect, useState } from 'react';

export default function useSearchGame(words) {

    const [data, setData] = useState([]) ;

    useEffect(() => {

        if(words === null || words.length < 4) return ;

        async function getData() {

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
    
            const gamesfound = await result.json() ;
            // console.log(gamesfound) ;
            setData(gamesfound) ;
            
        }
    
        getData() ;
    }, [words]);  
    
    
    return data;
}