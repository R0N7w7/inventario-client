import axios from "axios";
import { API_BASE_URL } from "./API";

type ArticuloData = {
    nombre: string,
    codigo: string,
    descripcion: string,
    serie: string,
    precio: number,
    estado: string,
    categoria: number,
    espacio: number,
    posicion: string,
    caracteristicas: object
}

type Articulo = {
    nombre: string,
    descripcion: string,
    codigo: string,
    cantidad: number,
    estado: string,
    categoria_id: number,
    espacio_id: number,
    fecha_adquisicion: string,
    numero_serie: string,
    posicion: string,
    caracteristicas: object,
    precio: number
}

export const fetchArticulos = async () => {
    try {
        const articulos = await axios.get(`${API_BASE_URL}/articulos`);
        const res = articulos;
        return res;
    } catch (error) {
        console.error(error);
    }
}

export const createArticulo = async (formData: ArticuloData) => {
    try {
        const articulo = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            codigo: formData.codigo,
            cantidad: 1,
            estado: formData.estado,
            categoria_id: formData.categoria,
            espacio_id: formData.espacio,
            posicion: formData.posicion,
            numero_serie: formData.serie,
            fecha_adquisicion: new Date().toISOString(),
            caracteristicas: formData.caracteristicas,
            precio: formData.precio

        } as Articulo

        const response = await axios.post(`${API_BASE_URL}/articulos`, articulo);
        const data = response;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getArticuloById = async (id: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/articulos/${id}`);
        const data = response;
        return data;
    } catch (error) {
        console.error(error);
    }
};


export const updateArticulo = async (id: number, formData: ArticuloData) => {
    try {
        const articulo = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            codigo: formData.codigo,
            estado: formData.estado,
            categoria_id: formData.categoria,
            espacio_id: formData.espacio,
            posicion: formData.posicion,
            numero_serie: formData.serie,
            caracteristicas: formData.caracteristicas,
            precio: formData.precio,
        } as Articulo;

        const response = await axios.put(
            `${API_BASE_URL}/articulos/${id}`,
            articulo
        );
        const data = response;
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteArticulo = async (id: number) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/articulos/${id}`);
        const data = response;
        return data;
    } catch (error) {
        console.error(error);
    }
};


