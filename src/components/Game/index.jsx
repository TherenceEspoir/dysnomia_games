import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Game from "./view";

export default function GameDetails() {

    let { gameId } = useParams();
    const [infos, setInfos] = useState(null) ;
    const [cover, setCover] = useState("null") ;
    const [screenshots, setScreenshots] = useState([]) ;


    // récupérer les infos comme : 
    // - name OK
    // - summary OK
    // - cover id
    // - screenshots ids

    useEffect(() => {
        async function getInfos() {

            const result = await fetch(
                "https://m1.dysnomia.studio/api/Games/" + gameId, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : "Bearer " + localStorage.getItem('token')
                    },
                    method: "GET",
                    mode: "cors"
                }
            ) ;
    
            if(!result.ok){
                const errorData = await result.json();			
                throw new Error(errorData || "Une erreur s'est produite pour obtenir les infos du jeu");
                
            }
    
            const data = await result.json() ;
            setInfos(data) ;
        };

        getInfos() ;

    }, [gameId]) ;


    useEffect(() => {
        if(infos === null)
            return ;

        async function getCover() {
            setCover("null") ;

            const result = await fetch(
                "https://m1.dysnomia.studio/api/Games/covers/" + infos.cover.id, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : "Bearer " + localStorage.getItem('token')
                    },
                    method: "GET",
                    mode: "cors"
                }
            ) ;
            
            if(!result.ok || result.status == 204){ //No content
                const errorData = await result.text();
                throw new Error(errorData || "Une erreur s'est produite pour récupérer la couverture");
            }
    
            const data = await result.json() ;
            setCover(data[0].url) ;
        };


        async function getScreenshots() {
            setScreenshots([]) ;
            let ids = infos.screenshots.ids ;

            for(const id of ids){
                const result = await fetch(
                    "https://m1.dysnomia.studio/api/Games/screenshots/" + id, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization : "Bearer " + localStorage.getItem('token')
                        },
                        method: "GET",
                        mode: "cors"
                    }
                ) ;
                
                if(!result.ok || result.status == 204){
                    const errorData = await result.text();
                    throw new Error(errorData || "Une erreur s'est produite pour récupérer un screen du jeu");
                }
        
                const data = await result.json() ;
                setScreenshots((currentTab) => ([
                    ...currentTab,
                    data[0].url
                ])) ;
            }

        };


        getCover() ;
        getScreenshots() ;
        // console.log(screenshots) ;

    }, [infos])


    

    if(infos != null) {
        const uniqueItems = [...new Set(screenshots)];
        return <Game name={infos.name} summary={infos.summary} cover={cover} screens={uniqueItems}/> ;
    }
    else {
        return <p>Désolé, il n'y a rien par ici :/</p> ;
    }



}