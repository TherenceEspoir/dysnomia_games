import './index.css' ;

export default function ProfilePage({data, handleDeleteAccount, deleting, deleteError}){

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-left mb-4'>Mes infos</h2>
            <p className='text-center'>Name: {data.name}</p>
            
            <h2 className='text-left mb-4'>Mes favoris</h2>
            <ul>
                {data.favorites.map((game) => (
                    <div key={game.id} className='row'>
                        <a href={`/game/${game.id}`} className='col-12 text-center mb-3 aGame'>{game.name}</a>
                    </div>
                ))}
            </ul>
            <button onClick={handleDeleteAccount} disabled={deleting} className='btn btn-danger'>
                {deleting ? 'Suppression en cours...' : 'Supprimer mon compte'}
            </button>
            {deleteError && <p style={{ color: 'red' }}>Erreur: {deleteError.message}</p>}
        </div>

    );
}