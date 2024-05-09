import './index.css' ;

export default function Results({movies, handleChange, title}){
    let myvalue = localStorage.getItem("searchWords") ;
    // console.log("en vue : ") ;
    // console.log(movies) ;

    return (
        <div className='w-75 m-auto'>
            <div className="mb-3 w-75 m-auto">
                <input type='text' defaultValue={myvalue} placeholder="Search... (minimum 4 caractères)" id='search' name='search' className='form-control' onChange={handleChange}/>
            </div>

            <h1 className='text-center mb-4'>{title}</h1>
            
            
            {movies.map((game) => (
                <div key={game.id} className='row'>
                    <div className='col-6 text-end mb-3'><a href={`/game/${game.id}`} className='aGame'>{game.name}</a></div>
                    <div className='col-6'>{(game.rating || NaN).toFixed(3)}</div>
                </div>
            ))}

        </div>

    );
}
