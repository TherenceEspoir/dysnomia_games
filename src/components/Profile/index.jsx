//composant qui affiche le profil de l'utilisateur

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//utiliser le hook useProfile
import useProfile from "../../hooks/useProfile";
import useDeleteAccount from "../../hooks/useDeleteAccount";

export default function Profile() {
    //récupérer les données du profil de l'utilisateur
    const { data, error, loading } = useProfile();
    //récupérer les données de la suppression du compte
    const { deleteAccount, deleting,deleteError } = useDeleteAccount();
    const navigate = useNavigate(); 

    const handleDeleteAccount = async () => {
        const success = await deleteAccount();
        if (success) {
            alert('Compte supprimé avec succès');
            navigate('/') ;// Redirection vers la page d'accueil après la suppression du compte
        } else {
            alert(`Erreur lors de la suppression du compte : ${deleteError?.message}`);
        }
    };


    //si le chargement est en cours
    if (loading) {
        return <p>Loading...</p>;
    }

    //si une erreur est survenue
    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {data.name}</p>
            <h2>Favorites</h2>
            <ul>
                {data.favorites.map((game) => (
                    <li key={game.id}>
                        <a href={`/game/${game.id}`}>{game.name}</a>
                    </li>
                ))}
            </ul>
            <button onClick={handleDeleteAccount} disabled={deleting}>
                {deleting ? 'Suppression en cours...' : 'Supprimer mon compte'}
            </button>
            {deleteError && <p style={{ color: 'red' }}>Erreur: {deleteError.message}</p>}
        </div>
    );
}
