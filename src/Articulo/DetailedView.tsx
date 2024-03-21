import { Input, Option, Select, Textarea, Typography } from '@material-tailwind/react'
import { Button, Modal, Popconfirm } from 'antd'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BiSave } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'
import { getArticuloById, updateArticulo } from '../api/articulo'

type Props = {
  id: number,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

interface ArticuloData {
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

const DetailedView = ({ open, setOpen, id, setIsLoading }: Props) => {

  const handleOpen = () => setOpen(!open);

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


  useEffect(() => {
    if (open == false) return;

    const getArticulo = async () => {
      try {
        const response = await getArticuloById(id);
        const articulo = response?.data as Articulo;
        const newDataSource = {
          nombre: articulo.nombre,
          caracteristicas: { ...articulo.caracteristicas },
          categoria: articulo.categoria_id,
          codigo: articulo.codigo,
          descripcion: articulo.descripcion,
          espacio: articulo.espacio_id,
          estado: articulo.estado,
          posicion: articulo.posicion,
          precio: articulo.precio,
          serie: articulo.numero_serie

        } as ArticuloData

        setFormData(newDataSource);

      } catch (error) {
        console.error(error);
      }
    }

    getArticulo();
  }, [id, open]);

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

  const fetchUpdateArticulo = async () => {
    try {
      await updateArticulo(id, formData);
      setOpen(false);
      setIsLoading(true);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      className="w-screen"
      open={open}
      onCancel={handleOpen}
      width={1000}
      footer={[
        <Popconfirm
          key={Date.now()}
          title="Guardar Cambios"
          description="¿Estás Seguro de guardar los cambios?"
          onConfirm={fetchUpdateArticulo}
          okText="Si"
          cancelText="No"
          okButtonProps={{
            className: 'bg-blue-600',
          }}
        >
          <Button icon={<BiSave />} type='primary' className='bg-blue-600'>Guardar Cambios</Button>
        </Popconfirm>,
        <Button icon={<CgClose />} type='default' onClick={() => setOpen(false)} >Cerrar</Button>,
      ]}
    >
      <form className="w-full max-w-4xl mx-auto my-auto grid grid-cols-1 gap-5 p-2">

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
          <Select placeholder="Categoría:" label="Categoría:" name="categoria" value={formData.categoria.toString()} onChange={(value) => handleSelect(value, 'categoria')}>
            <Option value="1">Mobiliario</Option>
            <Option value="2">Electrónicos</Option>
          </Select>
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
          <Input crossOrigin={undefined} variant="outlined" label="Color:" name="color" value={formData.caracteristicas.color} onChange={handleCaracteristicas}></Input>
          <Input crossOrigin={undefined} variant="outlined" label="Material:" name="material" value={formData.caracteristicas.material} onChange={handleCaracteristicas}></Input>
        </div>

        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input crossOrigin={undefined} variant="outlined" label="Dimensiones:" name="dimensiones" value={formData.caracteristicas.dimensiones} onChange={handleCaracteristicas}></Input>
          <Input crossOrigin={undefined} variant="outlined" label="Marca  :" name="marca" value={formData.caracteristicas.marca} onChange={handleCaracteristicas}></Input>
        </div>

      </form>
    </Modal>
  )
}

export default DetailedView