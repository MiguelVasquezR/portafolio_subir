import styles from './Header.module.css';

const Header = ({ choseView }) => {

    const handleChangePane = (e) => {
        const value = e.target.id;
        choseView(value);
    }

    return (
        <header className={styles.header__container}>
            <ul className={styles.header__ul}>
                <li className={styles.header__li}><button className={styles.header__btn} id='certificado' onClick={handleChangePane}>Subir Certificado</button> </li>
                <li className={styles.header__li}><button className={styles.header__btn} id='proyecto' onClick={handleChangePane}>Subir Proyecto</button> </li>
            </ul>
        </header>
    );
}

export default Header;