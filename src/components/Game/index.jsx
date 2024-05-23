import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToken, useTokenSetter } from '../../hooks/useToken.jsx';
import getCompanyById from "../../business/getCompanyById.js";
import { useNavigate } from "react-router-dom";

import Game from "./view";
import { useUser, useUserSetter } from "../../hooks/useUser.jsx";

async function handleAdd(id, setUser, currentGame) {
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
    if(result.status === 204) {
        console.log("Ajout au favori ok") ;
        setUser((currUser) => {
            currUser.favorites.push(currentGame);

            return {...currUser};
        });
    } else {
        const errorData = await result.json();	
        throw new Error(errorData || "Une erreur s'est produite pour ajouter le jeu aux favoris");
    }

}

async function handleRemove(id, setUser) {
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

    if(result.status === 204) {
        console.log("Retrait des favoris ok") ;
        setUser((currUser) => {
            currUser.favorites = currUser.favorites.filter(x => x.id != id);
            
            return {...currUser};
        })
    } else {
        const errorData = await result.json();	
        throw new Error(errorData || "Une erreur s'est produite pour retirer le jeu des favoris");
    }
}

export default function GameDetails() {

    let { gameId } = useParams();
    const [infos, setInfos] = useState(null) ;
    const [cover, setCover] = useState("null") ;
    const [screenshots, setScreenshots] = useState([]) ;
    const [compagnies, setCompagnies] = useState([]) ;
    const token = useToken() ;
    const user = useUser() ;
    const setUser = useUserSetter() ;
    const navigate = useNavigate();


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

        if(token == "null"){
            console.log("redirection") ;
            navigate("/authentication");
        }
        
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


        async function getCompagnies() {
            setCompagnies([]) ;
            let ids = infos.involvedCompanies.ids ;


            for(const id of ids){
                const { data, error } = await getCompanyById(id);

                setCompagnies((currentTab) => ([
                    ...currentTab,
                    [id, data.name]
                ])) ;
            }
        }


        getCover() ;
        getScreenshots() ;
        getCompagnies() ;
        // console.log(screenshots) ;

    }, [infos])


    

    if(infos != null) {
        const uniqueItems = [...new Set(screenshots)];
        return <Game 
            name={infos.name} 
            summary={infos.summary} 
            cover={cover} 
            screens={uniqueItems}
            compagnies={compagnies}
            handleAdd={() => handleAdd(gameId, setUser, infos)}
            handleRemove={() => handleRemove(gameId, setUser)}
            isFavorite={typeof user?.favorites?.find(x => x.id === infos.id) !== 'undefined'}
        /> ;
    }
    else {
        return <p>Désolé, il n'y a rien par ici :/</p> ;
    }


}