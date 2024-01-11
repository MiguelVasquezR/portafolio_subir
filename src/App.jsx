import styles from './App.module.css';
import { useRef, useState } from 'react';

import Header from './Components/Header/Header';
import Certificado from './Components/Certificado/Certificado';
import Proyecto from './Components/Proyecto/Proyecto';


function App() {

  const [vista, setVista] = useState('certificado');

  const choseView = (value) => {    
    setVista(value);
  }



  return (
    <>
      <Header choseView={choseView}/>

      <div>
        {
          vista === 'certificado' ?
          <Certificado />
          :
          <Proyecto />
        }
      </div>
    </>
  );
}

export default App;