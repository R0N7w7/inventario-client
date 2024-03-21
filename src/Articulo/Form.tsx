import { Button, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { notification } from "antd";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { createArticulo } from "../api/articulo";
import CategoriaSelect from "../components/CategoriaSelect";

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

type Props = {
    setLoading: Dispatch<SetStateAction<boolean>>
}

function ArticuloForm({ setLoading }: Props) {

    const [formData, setFormData] = useState({
        nombre: "",
        codigo: "",
        descripcion: "",
        serie: "",
        precio: 0,
        estado: "",
        categoria: -1,
        espacio: -1,
        posicion: "",
        caracteristicas: {}
    } as ArticuloData);

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {

        const { name, value } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelect = (value: string | undefined, name: string) => {

        if (value == undefined) return;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleCaracteristicas = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        const { caracteristicas } = formData;

        setFormData((prevState) => ({
            ...prevState,
            caracteristicas: {
                ...caracteristicas,
                [name]: value,
            },
        }));

    };

    const postArticulo = async () => {
        try {
            const res = await createArticulo(formData);
            console.log((res?.status));
            if (res?.status != 201) {
                notification.error({
                    message: "Articulo no registrado",
                    description: "No ha sido posible registrar el articulo en la BD",
                    placement: "bottomRight"
                });
                return;
            }
            setLoading(true);
            notification.success({
                message: "Articulo registrado correctamente",
                description: "El articulo se ha guardado con éxito en la BD",
                placement: "bottomRight"
            })
        } catch (error) {
            console.error(error)
            notification.error({
                message: "Articulo no registrado",
                description: "No ha sido posible registrar el articulo en la BD",
                placement: 'bottomRight'
            })
        }
    }



    return (
        <section className="w-full mt-5 ">
            <form className="w-full max-w-4xl mx-auto my-auto grid grid-cols-1 gap-5 p-2">
                <div className="mx-auto">
                    <Typography variant="h3" placeholder={undefined}>Registra Un Artículo</Typography>
                </div>

                <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2">
                    <Input crossOrigin={undefined} variant="standard" label="Nombre del Artículo:" name="nombre" value={formData.nombre} onChange={handleChange} />
                    <Input crossOrigin={undefined} variant="standard" label="Código del Artículo:" name="codigo" value={formData.codigo} onChange={handleChange} />
                </div>

                <div className="">
                    <Textarea label="Descripción del artículo:" name="descripcion" value={formData.descripcion} onChange={handleChange} />
                </div>

                <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Input crossOrigin={undefined} variant="outlined" label="Número de serie:" name="serie" value={formData.serie} onChange={handleChange}></Input>
                    <Input crossOrigin={undefined} variant="outlined" label="Precio:" name="precio" value={formData.precio} onChange={handleChange} ></Input>
                    <Select placeholder="Estado:" label="Estado:" name="estado" value={formData.estado} onChange={(value) => handleSelect(value, 'estado')}>
                        <Option value="Nuevo">Nuevo</Option>
                        <Option value="Seminuevo">Seminuevo</Option>
                        <Option value="Mal estado">Mal estado</Option>
                        <Option value="Inservible">Inservible</Option>
                    </Select>
                </div>

                <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <CategoriaSelect onChange={(value : string | undefined) => handleSelect(value, 'categoria')} />
                    <Select placeholder="Espacio:" label="Espacio:" name="espacio" value={formData.espacio.toString()} onChange={(value) => handleSelect(value, 'espacio')} >
                        <Option value="1">Aula 14</Option>
                        <Option value="2">Aula 10</Option>
                        <Option value="3">Aula 15</Option>
                    </Select>
                </div>

                <div>
                    <Typography variant="lead" className="text-blue-gray-500 font-medium" placeholder={""}>Opcionales:</Typography>
                </div>

                <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Input crossOrigin={undefined} variant="outlined" label="Posición:" name="posicion" value={formData.posicion} onChange={handleChange}></Input>
                    <Input crossOrigin={undefined} variant="outlined" label="Color:" name="color" onChange={handleCaracteristicas}></Input>
                    <Input crossOrigin={undefined} variant="outlined" label="Material:" name="material" onChange={handleCaracteristicas}></Input>
                </div>

                <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input crossOrigin={undefined} variant="outlined" label="Dimensiones:" name="dimensiones" onChange={handleCaracteristicas}></Input>
                    <Input crossOrigin={undefined} variant="outlined" label="Marca  :" name="marca" onChange={handleCaracteristicas}></Input>
                </div>

                <div className="mx-auto">
                    <Button placeholder={undefined} onClick={postArticulo} >
                        <Typography variant="small" placeholder={""} className="w-32">Registrar</Typography>
                    </Button>
                </div>
            </form>
        </section >
    )
}

export default ArticuloForm