import styles from './Certificado.module.css'
import { useState, useRef } from 'react';

const Certificado = () => {
    const [imgUrl, setImgUrl] = useState('');
    const ref = useRef(null);
    const [file, setFile] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const onChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImgUrl(url);
        setFile(file);
    }

    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);

        const fetchUpload = async () => {
            const res = await fetch('https://backportafolio-production.up.railway.app/saved/certificate', { method: 'POST', body: formData });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
            }
        }
        fetchUpload();
        setNombre('');
        setDescripcion('');
        setImgUrl('');
    }


    return (
        <>
            <h2 className={styles.title}>Sube Certificado</h2>
            <form className={styles.form}>
                {imgUrl ? <img src={imgUrl} alt='Imagen de certificado a subir' className={styles.form__img} /> : <div className={styles.form__not__image}>Elige la fotografia</div>}
                <input name='image' type="file" style={{ display: 'none' }} onChange={onChange} ref={ref} />
                <button className={styles.form__button} onClick={(e) => { e.preventDefault(); ref.current.click() }} >Elegir Foto</button>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" className={styles.form__name} placeholder='Nombre del Curso' />
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className={styles.form__description} placeholder='Escribe una breve descripción'></textarea>
                <button onClick={handleUpload} type='submit' className={styles.form__button}>Subir</button>
            </form>
        </>
    )
}

export default Certificado;