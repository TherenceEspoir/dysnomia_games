//composant qui affiche le profil de l'utilisateur

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//utiliser le hook useProfile
import useProfile from "../../hooks/useProfile";
import useDeleteAccount from "../../hooks/useDeleteAccount";
import { useToken, useTokenSetter } from '../../hooks/useToken.jsx';
import ProfilePage from "./view.jsx";

export default function Profile() {
    //récupérer les données du profil de l'utilisateur
    const { data, error, loading } = useProfile();
    //récupérer les données de la suppression du compte
    const { deleteAccount, deleting,deleteError } = useDeleteAccount();
    const token = useToken() ;
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

    if(token == "null"){
        console.log("redirection") ;
        navigate("/authentication");
    }


    //si le chargement est en cours
    if (loading) {
        return <p>Loading...</p>;
    }

    //si une erreur est survenue
    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <ProfilePage data={data} handleDeleteAccount={handleDeleteAccount} deleting={deleting} deleteError={deleteError}/>
    );
}
