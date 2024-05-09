import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GameDetails() {

    let { gameId } = useParams();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [infos, setInfos] = useState(null) ;


    // récupérer les infos comme : 
    // - name
    // - storyline
    // - summary
    // - cover id
    // - screenshots ids

    useEffect(() => {
        async function getInfos() {

            const result = await fetch(
                "https://m1.dysnomia.studio/api/Games/" + gameId, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : "Bearer " + token
                    },
                    method: "GET",
                    mode: "cors"
                }
            ) ;
    
            if(!result.ok){
                const errorData = await result.json();			
                throw new Error(errorData || "Une erreur s'est produite");
                
            }
    
            const data = await result.json() ;
            setInfos(data) ;
        };

        getInfos() ;

    }, [gameId]) ;
    

    if(infos != null) {
        return <p>{infos.name}</p> ;
    }
    else {
        return <p>Rien</p> ;
    }



}