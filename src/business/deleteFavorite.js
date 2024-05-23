export default async function deleteFavorite(id) {
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
        
    } else {
        const errorData = await result.json();	
        throw new Error(errorData || "Une erreur s'est produite pour retirer le jeu des favoris");
    }
    
}