function Assessment(assessment)  {

    assessment.toLowerCase()

    if(assessment === "geen"){
        return "geen beoordeelde"
    }
    else{
        return "een logisch beoordeelde"
    }

}
export default Assessment;