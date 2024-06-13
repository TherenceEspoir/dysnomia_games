export default async function postSubscription(user, setter) {


    const result = await fetch(
        "https://m1.dysnomia.studio/api/Users/register", {
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            mode: "cors"
        }
    ) ;

    if(!result.ok){
        const errorData = await result.text();
        
        setter(() => ({
            title : "Mais qu'est ce qu'il se passe ?!",
            message : errorData
        })) ;
        throw new Error(errorData || "Une erreur s'est produite");
        
    }

    const data = await result.text() ;

    return data ;
}