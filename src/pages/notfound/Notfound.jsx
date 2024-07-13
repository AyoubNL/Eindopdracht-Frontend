import './Notfound.css'
import Button from "../../components/button/button.jsx";

function Notfound() {
    return (
        <section className="not-found-section outer-content-container">
            <div className="inner-content-container">
                <h1>404</h1>
                <h2>De pagina waar je naar zoekt bestaat niet</h2>
                <span>
                    <Button type="button" variant="primary" onClick={() => navigate('/')}>Terug naar home</Button>
                </span>
            </div>
        </section>
    );
}

export default Notfound;