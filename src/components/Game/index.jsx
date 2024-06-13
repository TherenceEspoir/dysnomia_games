import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToken, useTokenSetter } from '../../hooks/useToken.jsx';
import { useNavigate } from "react-router-dom";

import Game from "./view";
import { useUser, useUserSetter } from "../../hooks/useUser.jsx";
import postFavorite from "../../business/postFavorite.js";
import deleteFavorite from "../../business/deleteFavorite.js";
import getInfosByGameId from "../../business/getInfosByGameId.js";
import useInfosGame from "../../hooks/useInfosGame.jsx";

async function handleAdd(id, setUser, currentGame) {
    console.log("j'ajoute : " , id) ;

    await postFavorite(id) ;
    
    setUser((currUser) => {
        currUser.favorites.push(currentGame);
        return {...currUser};
    });

}

async function handleRemove(id, setUser) {
    console.log("je retire : ", id) ;

    await deleteFavorite(id) ;

    setUser((currUser) => {
        currUser.favorites = currUser.favorites.filter(x => x.id != id);
        
        return {...currUser};
    })
}

export default function GameDetails() {

    let { gameId } = useParams();
    const [infos, setInfos] = useState(null) ;
    const token = useToken() ;
    const user = useUser() ;
    const setUser = useUserSetter() ;
    const navigate = useNavigate();

    // console.log("INFOS user") ;
    // let user = JSON.parse(localStorage.getItem("user")) ;
    // console.log(user) ;

    useEffect(() => {
        async function getInfos() {
            const {data, error} = await getInfosByGameId(gameId) ; // appel d'un hook non possible ici => getFct dans bisiness
            setInfos(data) ;
        };

        if(token == "null"){
            console.log("redirection") ;
            navigate("/authentication");
        }
        
        getInfos() ;

    }, [gameId]) ;


    const {cover, screenshots, compagnies} = useInfosGame(infos) ;

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