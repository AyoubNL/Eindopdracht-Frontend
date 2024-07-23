import {useContext, useState} from "react";
import "./Modal.css";
import Button from "../button/button.jsx";
import magnifying_glass from "../../assets/icons/magnifying_glass.png";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function Modal() {
    const [modal, setModal] = useState(false);
    const {fleet, setPark, list} = useContext(AuthContext)

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
        console.log('Kenteken toevoegen aan tabel')

        setPark((prevState) => [...prevState, list])

    }

    return (
        <>
            <Button onClick={() => {
                toggleModal()
            }} className='magnifying-glass'><img src={magnifying_glass} alt="afbeelding zoekknop"/></Button>

            {modal && (
                <div className="modal">
                    <div onClick={() => toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h4>Kloppen de kentekengegevens?</h4>
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
                        <Button className='close-modal' onClick={toggleModal}>Sluiten</Button>
                        <Button className='submit-modal' onClick={newCar}>Toevoegen</Button>
                    </div>
                </div>
            )}
        </>
    );
}