import { useState, useEffectEvent, useEffect } from "react"
import { listarComentarios, mensajeDeError } from "../api/publicaciones"

export default function DetallePublicacion({publicacion, onCerrar}){
    const [comentarios, setComentarios] = useState({publicacion, onCerrar});
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        if(publicacion.local) return;

        let cancelado = false;
        listarComentarios(publicacion.id)
        .then((datos)=>{
            if(!cancelado) setComentarios(datos);
        })
        .catch((e)=>{
            if(!cancelado) setError(mensajeDeError(e));
        });
        return()=>{
            cancelado = true;}
        },[publicacion]);

        const cargando = !publicacion.local && comentarios === null && !error;
        const lista = comentarios ?? [];

        return(
            <div className="fondo-modal" onClick={onCerrar} >
                <div className="modal modal-ancho" onClick={(e)=> e.stopPropagation()} >
                    <button className="modal-cerrar" onClick={onCerrar} aria-label="Cerrar"  >X</button>
                    <h2>{publicacion.title}</h2>
                    <p>{publicacion.body}</p>

                    <h3>Comentarios</h3>
                    {cargando && <p>Cargando Comentarios</p>}
                    {error && <p className="mensaje-error" >{error}</p>}
                    <ul className="comentarios">
                        {
                            lista.map((c)=>(
                                <li key={c.id}>
                                    <strong>{e.email}</strong>
                                    <p>{c.body}</p>
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        );
    }


