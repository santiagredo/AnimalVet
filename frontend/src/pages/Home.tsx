import '../styles/Home.css'
import image1 from '../images/download.jpg';
import image2 from '../images/razas-de-perros.jpg';
import image3 from '../images/images.jpg'

export function Home(){
    return(

           <div className="container-home">
            <section className="section1-home">
                <h1 className="title">Separa tu cita</h1>
                <ul className="list-home">
                    <li className="list-item__home">
                        <img src={image1}  alt="Gato" className="list-item__image" />
                        <h2 className="list-item__title">Cita Medica</h2>
                        <p className="list-item__paragraph">El bienestar animal es nuestra prioriedad</p>
                        <button className="list-item__btn">Reservar ahora</button>
                    </li>
                    <li className="list-item__home">
                        <img src={image2} alt="Perro" className="list-item__image" />
                        <h2 className="list-item__title">Baño y peluquería</h2>
                        <p className="list-item__paragraph">Dale el mejor look a tu mascota para que luzca brillante</p>
                        <button className="list-item__btn">Reservar ahora</button>
                    </li>
                    <li className="list-item__home">
                        <img src={image3}  alt="Otro Gato" className="list-item__image" />
                        <h2 className="list-item__title">Homeopática</h2>
                        <p className="list-item__paragraph">Ciencia avanzada a nuestro alcance</p>
                        <button className="list-item__btn">Reservar ahora</button>
                    </li>
                </ul>
            </section>

           </div>

    );
}

