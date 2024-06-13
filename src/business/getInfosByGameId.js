export default async function getInfosByGameId(gameId) {
    try {
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

        const data = await result.json();
        return { data: data, error: null };
    } 
    catch (err) {
        return { data: null, error: err };
    }
}