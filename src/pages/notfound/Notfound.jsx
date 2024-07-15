import './Notfound.css'
import Button from "../../components/button/button.jsx";
import {useNavigate} from "react-router-dom";

function Notfound() {
    const navigate = useNavigate()
    return (
        <section className="not-found-section">
            <div>
                <h1>404</h1>
                <h2>De pagina waar je naar zoekt bestaat niet</h2>
                <span>
                    <Button type="button" onClick={() => navigate('/')}>Terug naar home</Button>
                </span>
            </div>
        </section>
    );
}

export default Notfound;