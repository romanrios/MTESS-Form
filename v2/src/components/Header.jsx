import '../css/Header.css'

export const Header = () => {
    return <header className='Header' style={{ backgroundImage: `url('../assets/header_impulsa.jpg')` }}>
        <img src="./assets/impulsa_blanco.svg" alt="Logo de Impulsa"></img>
        <h1>Formulario de Presentación de Proyecto</h1>
    </header>
}