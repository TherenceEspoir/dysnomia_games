export default async function postAuth(user) {
    const response = await fetch('https://m1.dysnomia.studio/api/Users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        console.error('Erreur lors de la connexion : ', response);
        return;
    }

    const data = await response.text();

    return { data: data, error: null };
}