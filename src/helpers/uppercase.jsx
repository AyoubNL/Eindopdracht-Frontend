

function Uppercase(merk, model) {

    let name = merk
    let type = model

    if(merk && model){
     return `${name.toLowerCase()[0].toUpperCase()}${name.slice(1).toLowerCase()} ${type.toLowerCase()[0].toUpperCase()}${type.slice(1).toLowerCase()}`
    }
}

export default Uppercase;