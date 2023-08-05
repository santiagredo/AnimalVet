import '../styles/Header.css'

export function Header(){
    return(

        <header className="container-header">
            <img src="" alt="Logo" className="logo-header" />
            <nav className="list-header">
                <li className="list-header__item">Home</li>
                <li className="list-header__item">Citas</li>
                <li className="list-header__item">Contacto</li>
            </nav>
            <button className="whatsApp">WhatsApp</button>
        </header>
       
    )
}