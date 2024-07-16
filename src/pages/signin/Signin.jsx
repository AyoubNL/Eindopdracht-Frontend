import './Signin.css'
import password_icon from '../../assets/icons/password.png'
import user_icon from '../../assets/icons/person.png'
import {useState} from "react";
import axios from 'axios'
import Button from "../../components/button/button.jsx";
import {Link} from "react-router-dom";

function Signin() {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })
    const [error, toggleError] = useState(false);

    function handleChange(e) {
        const changefieldName = e.target.name

        setLogin({
            ...login,
            [changefieldName]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        toggleError(false);

        async function putData() {
            try {
                const send = await axios.post('http://localhost:3000/login', login)
                login(send.data.accessToken)
            } catch (e) {
                console.error(e)
                toggleError(true);
            }
        }
        putData()
    }

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Aanmelden</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input type="text" placeholder='Gebruikersnaam' id='username' name='username'
                               onChange={handleChange} value={login.username}/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password" placeholder='Wachtwoord' id='password' name='password'
                               onChange={handleChange} value={login.password}/>
                    </div>
                    {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}
                </div>
                <div className="submit-container">
                    <Button className='submit' onClick={handleSubmit}>Aanmelden</Button>
                </div>
                <div className='signin-container'><p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p></div>

            </form>
        </div>
    )
        ;
}

export default Signin;