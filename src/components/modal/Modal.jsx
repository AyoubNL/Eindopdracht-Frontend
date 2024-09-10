import {useContext, useState} from "react";
import "./Modal.css";
import Button from "../button/button.jsx";
import magnifying_glass from "../../assets/icons/magnifying_glass.png";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function Modal() {
    const [modal, setModal] = useState(false);
    const {fleet, setPark, list,licence} = useContext(AuthContext)

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    let fleetDetails = ''
    fleetDetails = Object.values(fleet).map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.kenteken}</td>
                    <td>{item.merk}</td>
                    <td>{item.handelsbenaming}</td>
                </tr>
            )
        }
    )

    const newCar = () => {
        setPark((prevState) => [...prevState, list])
    }


    return (
        <>
            <Button disabled={!licence} onClick={() => {
                toggleModal()
            }} className='magnifying-glass'><img src={magnifying_glass} alt="afbeelding zoekknop"/></Button>


            {modal && (
                <div className="modal">
                    <div onClick={() => toggleModal} className="overlay"></div>
                    <div className="modal-content">

                        {fleet.length > 0 ?  <h4>Kloppen de kentekengegevens?</h4> : <h4></h4>}

                        {fleet.length > 0 ?
                        <section className='table-body'>

                            <table>
                                <thead>
                                <tr>
                                    <th>Kenteken</th>
                                    <th>Merk</th>
                                    <th>Model</th>
                                </tr>
                                </thead>
                                <tbody>
                                {fleetDetails}
                                </tbody>

                            </table>
                        </section>
                            : <p className="error-licence">Het ingevoerde kenteken is onbekend. Probeer het opnieuw.</p>}
                        {fleet.length > 0 ?  <Button className='submit-modal' onClick={()=> {toggleModal(), newCar()}}>Toevoegen</Button> : ""}

                        <Button className='close-modal' onClick={toggleModal}>Sluiten</Button>

                    </div>
                </div>
            )}
        </>
    );
}