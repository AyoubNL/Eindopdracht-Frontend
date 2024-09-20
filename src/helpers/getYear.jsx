function getYear(build) {

    const d = new Date(build);
    let year = d.getFullYear();


    return year

}

export default getYear;