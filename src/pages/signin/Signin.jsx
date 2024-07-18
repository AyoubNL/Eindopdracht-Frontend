import './Signin.css'
import password_icon from '../../assets/icons/password.png'
import user_icon from '../../assets/icons/person.png'
import {useContext, useState} from "react";
import axios from 'axios'
import Button from "../../components/button/button.jsx";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";

function Signin() {
    const {login,isAuth, toggleIsAuth} = useContext(AuthContext)
    const [error, toggleError] = useState(false);
    const [account, setAccount] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        const changefieldName = e.target.name

        setAccount({
            ...account,
            [changefieldName]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        toggleError(false);
        try {
            const send = await axios.post('https://api.datavortex.nl/apkdash/users/authenticate', account)
            login(send.data.jwt)
            toggleIsAuth({
                ...isAuth,
                isAuth: true})
        } catch (e) {
            console.error(e)
            toggleError(true);
        }
    }

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Aanmelden</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input type="text" placeholder='Gebruikersnaam' id='username' name='username'
                               onChange={handleChange} value={account.username}/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password" placeholder='Wachtwoord' id='password' name='password'
                               onChange={handleChange} value={account.password}/>
                    </div>
                </div>
                <div className="submit-container">
                    <Button type='submit' className='submit-signin' onClick={handleSubmit}>Aanmelden</Button>
                </div>
                <div className='signin-container'>
                    {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}
                    <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p></div>

            </form>
        </div>
    )
        ;
}

export default Signin;