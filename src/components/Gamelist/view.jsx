import './index.css' ;

export default function ViewList({data, page, pageSize, setFct}){

    return (
        <div>
            <h1 className='text-center mb-4'>Game List</h1>

            {data.map((game) => (
                <div key={game.id} className='row'>
                    <div className='col-6 text-end mb-3'><a href={`/game/${game.id}`} className='aGame'>{game.name}</a></div>
                    <div className='col-6'>{(game.rating || NaN).toFixed(3)}</div>
                </div>
            ))}

{/* 
            <ul>
                {data.map((game) => (
                    <li key={game.id}>
                        <a href={`/game/${game.id}`}>{game.name}</a>
                    </li>
                ))}
            </ul> */}


            <p className='text-center mt-5'>Page: {page}</p>
            <p className='text-center'>Page Size: {pageSize}</p>
            <div className='btn-div'>
                <button onClick={() => setFct(page - 1)} disabled={page === 1} className='btn btn-secondary'>Previous</button>
                <button onClick={() => setFct(page + 1)} className='btn btn-secondary'>Next</button>
            </div>
            

        </div>

    );
}