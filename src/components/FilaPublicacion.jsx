import { useState } from "react";
import {mensajeDeError} from '../api/publicaciones'

export default function FilaPublicacion ({modo, inicial, onGuardar, onCancelar}){
    const[titulo, setTitulo] = useState(inicial ?.title ?? '');
    const[cuerpo, setCuerpo] = useState(inicial ?.body ?? '');
    const[errorCampo, setErrorCampo] = useState('');
    const[errorApi, setErrorApi] = useState('');
    const[guardando, setGuardando] = useState(false);

    async function manejarSubmit(evento){
        evento.preventDefault();
        setErrorApi('');

        if(titulo.trim().length<3){
            setErrorCampo('El titulo necesita al menos 3 caracteres');
            return;
        }
        if(cuerpo.trim()===''){
            setErrorCampo('El contenido no puede estar Vacio');
        }
        setErrorCampo('');
        setGuardando(true);

        try{
            await onGuardar({title: titulo.trim(), body: cuerpo.trim()});
        }
        catch(e){
            setErrorApi(mensajeDeError(e));
            setGuardando(false)
        }
    };


    return(
        <div className="fondo-modal">
            <form onSubmit={manejarSubmit} className="modal">
                <h2>{modo === 'crear' ? 'Nueva Publicacion': 'Editar publicacion'}</h2>
                <label htmlFor="titulo">Titulo</label>
                <input
                    id="titulo"
                    value={titulo}
                    onChange={(e)=> setTitulo(e.target.value)}
                />
                <label htmlFor="cuerpo">Contenido</label>
                <textarea
                    id="cuerpo"
                    rows="5"
                    value={cuerpo}
                    onChange={(e)=>setCuerpo(e.target.value)}
                 />
                {errorCampo && <p className="mensaje-error" >{errorCampo}</p>}
                {errorApi && <p className="mensaje-error" >{errorApi}</p>}

                <div className="modal-botones">
                    <button type="button" onClick={onCancelar} disabled={guardando} >cancelar</button>
                    <button type="submit" className="principal" disabled={guardando} >
                        {guardando ? 'Guardando ...':'Guardar'}
                    </button>
                </div>

            </form>
        </div>
    );
}