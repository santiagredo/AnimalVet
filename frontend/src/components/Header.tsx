import '../styles/Header.css'
import logo from '../images/logo.jpg'

export function Header(){
    return(

        <header className="container-header">
            {/* <img src={logo} alt="Logo" className="logo-header" /> */}
            <p className="nombre">Dra Erika Mayte Murcia Agudelo</p>
            <nav className="list-header">
                <li className="list-header__item">Home</li>
                <li className="list-header__item">Citas</li>
                <li className="list-header__item">Contacto</li>
            </nav>
            <button className="whatsApp">WhatsApp</button>
        </header>
       
    )
}