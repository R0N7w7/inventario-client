import { Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { fetchCategorias } from "../api/categoria.ts";



type Categoria = {
    id?: number,
    nombre: string,
    descripcion: string,
}

type props = {
    onChange : (value: string | undefined) => void
}

const CategoriaSelect = ( props : props) => {

    const [categorias, setCategorias] = useState([{}] as Array<Categoria>);

    useEffect(() => {

        const getCategorias = async () => {
            const response = await fetchCategorias();

            const cat = response?.data;
            setCategorias(cat);
        }

        getCategorias();
    }, [])


    return (
        <Select placeholder={"Categoria"} label="Categoria" onChange={(props.onChange)} value="">
            {categorias.map((categoria, index) => (
                <Option value={categoria.id?.toString()} key={index}> {categoria.nombre}</ Option>
            ))}
        </Select>
    )
}

export default CategoriaSelect