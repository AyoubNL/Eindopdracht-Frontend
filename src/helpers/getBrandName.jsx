function getBrandName(build) {

    let firstBlank = build.indexOf(' ');
    if (firstBlank == -1) { // There is no space at all -- return the whole string
        return build;
    }
    return build.slice(0, firstBlank);

}

export default getBrandName;
