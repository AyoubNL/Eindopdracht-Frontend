import './Navbar.css'
import icon from '../../assets/logo-color.png'
import {Link, useNavigate} from "react-router-dom";

function NavBar() {
    const navigate = useNavigate()

    return (
        <nav>
            <Link to="/">
          <span className="icon-container">
            <img src={icon} alt="icon"/>
            <h3>
              APKdash
            </h3>
          </span>
            </Link>

            <div>
                <button
                    type="button"
                    // onClick={logout}
                >Log out</button>
                <button
                    type="button"
                    onClick={() => navigate('/signin')}
                >Inloggen</button>

                <button
                    type="button"
                    onClick={() => navigate('/signup')}
                >Registreren</button>

            </div>
        </nav>
    );
}

export default NavBar;