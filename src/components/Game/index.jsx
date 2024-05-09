import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Game from "./view";

async function handleAdd(id) {
    console.log("j'ajoute : " , id) ;

    const result = await fetch(
        "https://m1.dysnomia.studio/api/Users/favorites/add/" + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization : "Bearer " + localStorage.getItem('token')
            },
            method: "POST",
            mode: "cors"
        }
    ) ;

    if(result.status === 409)
        throw "Conflit : Déjà en favori !" ;
    if(result.status === 204)
        console.log("Ajout au favori ok") ;
    else {
        const errorData = await result.json();	
        throw new Error(errorData || "Une erreur s'est produite pour ajouter le jeu aux favoris");
    }

}

async function handleRemove(id) {
    console.log("je retire : ", id) ;

    const result = await fetch(
        "https://m1.dysnomia.studio/api/Users/favorites/remove/" + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization : "Bearer " + localStorage.getItem('token')
            },
            method: "DELETE",
            mode: "cors"
        }
    ) ;

    if(result.status === 204)
        console.log("Retrait des favoris ok") ;
    else {
        const errorData = await result.json();	
        throw new Error(errorData || "Une erreur s'est produite pour retirer le jeu des favoris");
    }
}

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

    // console.log("INFOS user") ;
    // let user = JSON.parse(localStorage.getItem("user")) ;
    // console.log(user) ;

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
        return <Game 
            name={infos.name} 
            summary={infos.summary} 
            cover={cover} 
            screens={uniqueItems}
            handleAdd={() => handleAdd(gameId)}
            handleRemove={() => handleRemove(gameId)} /> ;
    }
    else {
        return <p>Désolé, il n'y a rien par ici :/</p> ;
    }


}