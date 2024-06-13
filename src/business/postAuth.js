export default async function postAuth(user, setter) {


    const response = await fetch('https://m1.dysnomia.studio/api/Users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        console.error('Erreur lors de la connexion : ', response);

        const errorData = await response.text();
        setter(() => ({
            title : "Mais qu'est ce qu'il se passe ?!",
            message : "Error de log"
        })) ;
        
        throw new Error(errorData || "Une erreur s'est produite");
    }

    const data = await response.text();

    return data ;
}