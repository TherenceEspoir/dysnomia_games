import './index.css' ;

export default function Top({best10}) {
    
    return (
        <div className='w-75 m-auto'>
            <h1 className='text-center mb-4'>Top 10</h1>
            
            
            {best10.map((game) => (
                <div key={game.id} className='row'>
                    <div className='col-6 text-end mb-3'><a href={`/game/${game.id}`} className='aGame'>{game.name}</a></div>
                    <div className='col-6'>{(game.rating).toFixed(3)}</div>
                </div>
            ))}

        </div>

    );
}
