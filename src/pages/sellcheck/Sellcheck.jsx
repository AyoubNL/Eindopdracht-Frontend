import './Sellcheck.css'
import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import Button from "../../components/button/button.jsx";
import notStolen from "../../helpers/notStolen.jsx";
import assessment from "../../helpers/assessment.jsx";
import insurance from "../../helpers/insurance.jsx";
import recall from "../../helpers/recall.jsx";


function Sellcheck() {
    const [sell, setSell] = useState([{
        assessmentyear: 'jaar laatste registratie tellerstand',
        assessment: 'tellerstandoordeel',
        notstolen: 'tenaamstellen_mogelijk',
        insurance: 'verzekerd',
        recall: 'openstaande terugroepactie',
    }])
    const navigate = useNavigate()
    const {list} = useContext(AuthContext)

    async function handleCheck(e) {

        // navigate('/sellcheck')
        // e.preventDefault();

        try {
            const check = await axios.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${list.plate}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-App-Token': `${import.meta.env.VITE_RDW_KEY}`
                }
            })
            setSell({
                    assessmentyear: check.data[0].jaar_laatste_registratie_tellerstand,
                    assessment: check.data[0].tellerstandoordeel,
                    notstolen: check.data[0].tenaamstellen_mogelijk,
                    insurance: check.data[0].wam_verzekerd,
                    recall: check.data[0].openstaande_terugroepactie_indicator,
                }
            )
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className="wrapper-check">
                <h1>Verkoopcheck</h1>
                <h2>{list.plate}</h2>

                <p>Dit voertuig heeft {assessment(sell.assessment)} kilometerstand, de laatste registratie dateert uit het jaar {sell.assessmentyear}.
                    Uit de meest recente gegevens blijkt dat deze auto {notStolen(sell.notstolen)} gestolen is.
                    De fabrikant heeft {recall(sell.recall)} terugroepactie voor dit voertuig, en je  bent {insurance(sell.insurance)}.</p>


                <Button className='sellcheck-button' type='button'
                        onClick={() => handleCheck()}>Verkoopcheck</Button>
            </div>
        </>
    );

}

export default Sellcheck;
