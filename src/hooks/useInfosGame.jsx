import { useState, useEffect } from "react";

import getCompanyById from "../business/getCompanyById";


export default function useInfosGame(infos) {
    const [cover, setCover] = useState("null") ;
    const [screenshots, setScreenshots] = useState([]) ;
    const [compagnies, setCompagnies] = useState([]) ;

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

                if(data != null){
                    setCompagnies((currentTab) => ([
                        ...currentTab,
                        [id, data.name]
                    ])) ;
                }
                
            }
        }


        getCover() ;
        getScreenshots() ;
        getCompagnies() ;
        // console.log(screenshots) ;

    }, [infos]) ;

    return {cover, screenshots, compagnies} ;
}