import { useState, useEffect } from 'react'
import {
  API_SIMULADA,
  POR_PAGINA,
  listarPublicaciones,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion,
  mensajeError,
} from './api/publicaciones'
import FilaPublicacion from './components/FilaPublicacion'
import DetallePublicacion from './components/DetallePublicacion'



import './App.css'


function App() {
  const [publicacion, setPublicacion] = useState([]);
  const [pagina, setPaginacion] = useState(1);
  const [hayMas, setHayMas] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);
  const [busqueda, setBusqueda] = useState('');

  const [formulari,setFormulario] = useState(null);
  const [verPublicacion, setVerPublicacion] = useState(null);
  const [porEliminar, setPorEliminar] = useState(null);
  const [eliminado, setEliminado] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState('');
 
  const [aviso, setAviso] = useState('');

  useEffect(()=>{
    let cancelado = false;
    async function cargar(){
      setCargando(true);
      setError('');
      try{
        const datos = await listarPublicaciones(pagina);
        if(!cancelado){
          setPublicacion(datos);
          setHayMas(datos.length === POR_PAGINA);
        }
      }
      catch(e){
        if(!cancelado) setError(mensajeError(e));
      }
      finally{
        if(!cancelado) setCargando(false);
      }
    }
    cargar();
    return()=>{
      cancelado=true;
    }

  },[pagina, intento])


}

export default App
