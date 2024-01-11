import styles from './Proyecto.module.css';
import { useState, useRef } from 'react';

const Proyecto = () => {
    const [imgUrls, setImgUrls] = useState([]);
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcionBreve, setDescripcionBreve] = useState('');
    const [descripcionLarga, setDescripcionLarga] = useState('');
    const [tecnologia, setTecnologia] = useState('');
    const [url, setUrl] = useState('');

    const [countB, setCountB] = useState(0);
    const [countL, setCountL] = useState(0);

    const onChange = (e) => {
        e.preventDefault();
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        const urls = selectedFiles.map((file) => URL.createObjectURL(file));
        setImgUrls((prevUrls) => [...prevUrls, ...urls]);
    };

    const handleFileButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre)
        formData.append('descripcionBreve', descripcionBreve)
        formData.append('descripcionLarga', descripcionLarga)
        formData.append('tecnologia', tecnologia)
        formData.append('url', url)
        formData.append('file1', files[0])
        formData.append('file2', files[1])
        formData.append('file3', files[2])
        formData.append('file4', files[3])
        const handleSubmitData = () => {
            const fetchData = async () => {
                const res = await fetch('http://192.168.1.67:9000/saved/project', { method: 'POST', body: formData });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                }
            }
            fetchData();
        }
        handleSubmitData();

        setNombre('');
        setDescripcionBreve('')
        setDescripcionLarga('');
        setTecnologia('');
        setImgUrls([]);
        setUrl('')
        setCountB(0);
        setCountL(0);
    };

    return (
        <div>
            <form className={styles.form__container} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa nombre del Proyecto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={styles.form__title}
                />
                <input
                    type="text"
                    placeholder='Tecnología del Proyecto'
                    value={tecnologia}
                    onChange={(e) => setTecnologia(e.target.value)}
                    className={styles.form__title}
                />
                <input
                    type="url"
                    placeholder='URL Repositorio'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className={styles.form__title}
                />
                <div className={styles.textarea__container}>
                    <textarea
                        type="text"
                        placeholder="Ingresa breve descripción"
                        value={descripcionBreve}
                        onChange={(e) => {
                            setDescripcionBreve(e.target.value)                            
                            setCountB(countB + 1)
                            if (e.target.value.length === 0) { setCountB(0) }
                        }
                        }
                        className={styles.form__descripcion}
                    />
                    <div className={styles.txta__p}>
                        <p>Caracteres {countB}/100</p>
                    </div>
                </div>
                <div className={styles.textarea__container}>
                    <textarea
                        type="text"
                        placeholder="Ingresa una descripción más larga"
                        value={descripcionLarga}
                        onChange={(e) => {
                            setDescripcionLarga(e.target.value)
                            setCountL(countL + 1)
                            if (e.target.value.length === 0) { setCountL(0) }
                        }
                        }
                        className={styles.form__descripcion}
                    />
                    <div className={styles.txta__p}>
                        <p>Caracteres {countL}/200</p>
                    </div>
                </div>

                <fieldset className={styles.form__fieldset}>
                    <legend className={styles.form__legend}>Imágenes</legend>
                    <div className={styles.imgs__container}>
                        {imgUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Imagen ${index}`} className={styles.form__img} />
                        ))}
                    </div>
                    <input
                        name="image"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={onChange}
                        ref={fileInputRef}
                        multiple
                    />
                    <button className={styles.form__button} onClick={handleFileButtonClick}>
                        Elegir Fotos
                    </button>
                </fieldset>

                <button type="submit" className={styles.form__button}>Guardar</button>
            </form>
        </div>
    );
};

export default Proyecto;
