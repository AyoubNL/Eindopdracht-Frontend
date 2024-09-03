import './Input.css'

function Input({type, placeholder, id, name, onChange, value, className, maxLength, autoComplete}) {
    return (
        <input type={type} placeholder={placeholder} id={id} name={name} onChange={onChange} className={className}
               value={value} maxLength={maxLength} autoComplete={autoComplete}
        />

    );
}


export default Input;