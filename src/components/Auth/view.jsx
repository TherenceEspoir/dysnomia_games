import './index.css' ;


export default function Register({user, handleChange, handleSubmit}) {

    return (           

        <form id="subscriptionForm">
            <p className='text-center'>Bienvenu nouvel ami !</p>

            <div className="mb-3">
                <label htmlFor="username" className='form-label'>Username: </label>
                <input type='text' value={user.name} id='username' name='username' className='form-control' onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className='form-label'>Password: </label>
                <input type='password' id='password' name='password' value={user.password} className='form-control' onChange={handleChange}/>
            </div>


            <input type='submit' value="Se connecter" className="btn btn-primary w-100" onClick={handleSubmit}/>
        </form>

    );
}
