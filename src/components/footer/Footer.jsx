import './Footer.css'

function Footer() {
    return (
        <>
        <footer className="footer">
            <p className="footer-copyright">Copyright &copy; {new Date().getFullYear()}, All rights reserved.</p>
        </footer>
        </>
    );
}

export default Footer;