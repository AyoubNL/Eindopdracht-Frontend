import './Signup.css'
import user_icon from "../../assets/icons/person.png";
import email_icon from "../../assets/icons/email.png";
import password_icon from "../../assets/icons/password.png";
import {Link} from "react-router-dom";
import Button from "../../components/button/button.jsx";

function Signup() {

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Registreren</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input type="text" placeholder='Gebruikersnaam' id='username' name='username'
                               value={isAuth.user.username} onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <img src={email_icon} alt=""/>
                        <input type="email" placeholder='E-mailadres' id='email' name='email' value={isAuth.user.email}
                               onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password" placeholder='Wachtwoord' id='password' name='password'
                               value={isAuth.user.password} onChange={handleChange}/>
                    </div>
                </div>
                {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres.</p>}
                <div className="submit-container">
                    <Button type='submit' disabled={loading} className='submit' onClick={handleSubmit}>Aanmelden</Button>
                </div>
                <div className='signup-container'><p>Heb je al een account? Je kunt je <Link
                    to="/signin">hier</Link> inloggen.</p></div>

            </form>
        </div>
    );
}

export default Signup;