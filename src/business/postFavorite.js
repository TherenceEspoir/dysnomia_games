export default async function postFavorite(id) {
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

    if(result.status === 204){
        console.log("Ajout au favori ok") ;
    }
    else {
        const errorData = await result.json();	
        throw new Error(errorData || "Une erreur s'est produite pour ajouter le jeu aux favoris");
    }
}