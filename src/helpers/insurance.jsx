
function Insurance(insurance) {

    insurance.toLowerCase()

    if(insurance === "Ja"){
        return "minimaal WA verzekerd"
    }
    else{
        return "niet verzekerd"
    }

}

export default Insurance;