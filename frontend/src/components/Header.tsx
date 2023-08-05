import '../styles/Header.css'
//import logo from '../images/logo.jpg'

export function Header(){
    return(

        <header className="container-header">
            {/* <img src='../images/logo.jpg' alt="Logo" className="logo-header" /> */}
            <p className="nombre">Dra Erika Mayte Murcia Agudelo</p>
            <nav className="list-header">
                <li className="list-header__item">Home</li>
                <li className="list-header__item">Citas</li>
                <li className="list-header__item">Contacto</li>
            </nav>
            <div className="whatsApp">
            <a
        href="https://api.whatsapp.com/send?phone=573114768615"
        target="_blank"
      >WhatsApp</a></div>
        </header>
       
    )
}