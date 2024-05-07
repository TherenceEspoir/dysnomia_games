import './index.css' ;

function Error({mess}) {
    if (mess != null) {
        return (
            <div id="frameError">
                <h4>{mess.title}</h4>
                <p>{mess.message}</p>
            </div>
        ) ;
    } else {
        return <p></p> ;
    }
}

export default function Form({handleChange, onClick, mess}) {
    
    return (
        <form id="subscriptionForm">
            <p className='text-center'>Bienvenu nouvel ami !</p>

            <Error mess={mess}/>

            <div className="mb-3">
                <label htmlFor="username" className='form-label'>Username: </label>
                <input type='text' placeholder='toto' id='username' name='username' className='form-control' onChange={handleChange}/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="password" className='form-label'>Password: </label>
                <input type='password' id='password' name='password' className='form-control' onChange={handleChange}/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="confirmationPassword" className='form-label'>Confirmation: </label>
                <input type='password' id='confirmationPassword' name='confirmationPassword' className='form-control' onChange={handleChange}/>
            </div>
            

            <input type='submit' value="S'inscrire" className="btn btn-primary w-100" onClick={onClick}/>
        </form>
    ) ;
}