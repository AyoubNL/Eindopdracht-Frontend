import './button.css'

function Button({type, children, onClick, disabled = false, className}) {
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={className}
                >
            {children}
        </button>
    );
}

export default Button;