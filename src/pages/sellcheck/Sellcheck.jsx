import './Sellcheck.css'
import axios from "axios";
import {useEffect, useState} from "react";
import notStolen from "../../helpers/notStolen.jsx";
import assessment from "../../helpers/assessment.jsx";
import insurance from "../../helpers/insurance.jsx";
import recall from "../../helpers/recall.jsx";
import {useParams} from "react-router-dom";

import uppercase from "../../helpers/uppercase.jsx";

function Sellcheck() {
    const [sell, setSell] = useState([{
        assessmentyear: 'jaar laatste registratie tellerstand',
        assessment: 'tellerstandoordeel',
        notstolen: 'tenaamstellen_mogelijk',
        insurance: 'verzekerd',
        recall: 'openstaande terugroepactie',
        brand: 'merk',
        model: 'model',
    }])

    const {id} = useParams();

    useEffect(() => {
   async function handleCheck() {

            try {
                const check = await axios.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-App-Token': `${import.meta.env.VITE_RDW_KEY}`
                    }
                })
                setSell({
                        brand: check.data[0].merk,
                        model: check.data[0].handelsbenaming,
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
        handleCheck()
    }, []);

    return (
        <>
            <div className="wrapper-check">
                {Object.keys(sell).length > 0 &&
                    <article className="search-result-box">
                            <span className="title-container">
                             <h1>Verkoopcheck {uppercase(sell.brand, sell.model)}</h1>
                            </span>
                        <p>Dit voertuig heeft {assessment(sell.assessment)} kilometerstand, en de laatste registratie
                            dateert uit het jaar {sell.assessmentyear}.</p>
                        <p>Uit de meest recente politie-gegevens blijkt dat deze
                            auto {notStolen(sell.notstolen)} gestolen
                            is.</p>
                        <p>De fabrikant heeft {recall(sell.recall)} terugroepactie voor dit voertuig, en je
                            bent {insurance(sell.insurance)}.</p>
                    </article>

                }
            </div>
        </>
    );
}

export default Sellcheck;
