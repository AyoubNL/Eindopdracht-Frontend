
function convertLicence(licence) {



    let newLicence = licence.replaceAll('-', '').toUpperCase()

    return (

       newLicence

    );
}

export default convertLicence;