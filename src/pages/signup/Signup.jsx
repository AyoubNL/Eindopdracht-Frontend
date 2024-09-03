import './Signup.css'
import user_icon from "../../assets/icons/person.png";
import email_icon from "../../assets/icons/email.png";
import password_icon from "../../assets/icons/password.png";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../components/button/button.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import Input from "../../components/input/Input.jsx";

function Signup() {
    const {isAuth, toggleIsAuth} = useContext(AuthContext)
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        const changedFieldName = e.target.name

        toggleIsAuth({
            ...isAuth,
            user: {...isAuth.user, [changedFieldName]: e.target.value}
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post('https://api.datavortex.nl/apkdash/users', {
                    email: isAuth.user.email,
                    password: isAuth.user.password,
                    username: isAuth.user.username,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': `${import.meta.env.VITE_API_KEY}`
                    }
                }
            );
            navigate('/signin');
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <div className='container'>
            <header>
                <span className="text">Registreren</span>
                <span className="underline"></span>
            </header>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className="inputs-up">
                    <div className="input-up">
                        <img src={user_icon} alt="afbeelding van persoon"/>
                        <Input type="text" placeholder='Gebruikersnaam' id='username' name='username'
                               value={isAuth.user.username} onChange={handleChange}/>
                    </div>
                    <div className="input-up">
                        <img src={email_icon} alt="afbeelding van email"/>
                        <Input type="email" placeholder='E-mailadres' id='email' name='email' value={isAuth.user.email}
                               onChange={handleChange}/>

                    </div>
                    <div className="input-up">
                        <img src={password_icon} alt="afbeelding van wachtwoord"/>
                        <Input type="password" placeholder='Wachtwoord' id='password' name='password'
                               value={isAuth.user.password} onChange={handleChange}/>
                    </div>
                </div>
                <article className="submit-container-up">
                    <Button type='submit' disabled={loading} className='submit-signup-up' onClick={handleSubmit}>Meld
                        mij
                        aan</Button>
                </article>
                <article className='signup-container-up'>
                    {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres.</p>}
                    <p>Heb je al een account? Je kunt je <Link
                        to="/signin">hier</Link> inloggen.</p>
                </article>

            </form>
        </div>
    );
}

export default Signup;