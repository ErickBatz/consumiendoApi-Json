const BASE = import.meta.env.VITE_API_URL ?? 'https://jsonplaceholder.typicode.com';

export const API_SIMULADA = BASE.includes('jsonplaceholder');
export const POR_PAGINA = 10;

export class ErrorApi extends Error{
    constructor(estado){
        super(`El servidor respondio con el codigo ${estado}`);
        this.estado = estado;
    }
}

async function peticion(ruta, {metodo = 'GET', datos} = {}){
    const opciones = {method: metodo};
    if(datos !== undefined){
        opciones.headers={'Content-Type':'aplication/json; charset=UTF-8'};
        opciones.body=JSON.stringify(datos);
    }

    const respuesta = await fetch(BASE + ruta, opciones);
    if(!respuesta.ok) throw new ErrorApi(respuesta.status);

    if(respuesta.status == 204) return null;

    return respuesta.json();
}
export function listarPublicaciones(pagina){
    return peticion(`/posts?_page=${pagina}&_limit = ${POR_PAGINA}`);
}

export function listarComentarios(idPublicacion){
    return peticion(`/posts/${idPublicacion}/comments`);
}
export function crearPublicacion(datos){
    return peticion('/posts',{metodo:'POST',datos});
}
export function actualizarPublicacion(id, datos){
    return peticion (`/posts/${id}`,{metodo: 'PUT',datos});
}
export function eliminarPublicacion(id){
    return peticion(`/posts/${id}`,{metodo : 'DELETE'});
}

export function mensajeDeError(error){
    if(error instanceof TypeError) return 'No hay conexion con el servidor';
    if(error instanceof ErrorApi){
        if(error.estado ===404) return 'Esa publicacion no existe';
        if(error.estado >= 500) return 'El servidor fallo';
        return error.message;
    }
    return 'Ocurrio un error inesperado';
}