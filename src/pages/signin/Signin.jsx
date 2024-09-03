import './Signin.css'
import password_icon from '../../assets/icons/password.png'
import user_icon from '../../assets/icons/person.png'
import {useContext, useState} from "react";
import axios from 'axios'
import Button from "../../components/button/button.jsx";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import Input from "../../components/input/Input.jsx";

function Signin() {
    const [error, toggleError] = useState(false);
    const [account, setAccount] = useState({
        username: '',
        password: ''
    })
    const {login} = useContext(AuthContext)

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
        } catch (e) {
            console.error(e)
            toggleError(true);
        }
    }

    return (
        <div className='container'>
            <header>
                <span className="text">Aanmelden</span>
                <span className="underline"></span>
            </header>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className="inputs-in">
                    <div className="input-in">
                        <img src={user_icon} alt="icoon van gebruiker"/>
                        <Input type='text' placeholder='Gebruikersnaam' id='username' name='username'
                               onChange={handleChange} value={account.username}/>
                    </div>
                    <div className="input-in">
                        <img src={password_icon} alt="icoon van wachtwoord"/>
                        <Input type="password" placeholder='Wachtwoord' id='password' name='password'
                               onChange={handleChange} value={account.password}/>
                    </div>
                </div>
                <article className="submit-container-in">
                    <Button type='submit' className='submit-signin-in' onClick={handleSubmit}>Aanmelden</Button>
                </article>
                <article className='signin-container-in'>
                    {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}
                    <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
                </article>
            </form>
        </div>
    )

}

export default Signin;