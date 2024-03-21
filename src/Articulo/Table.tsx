import { Typography } from '@material-tailwind/react';
import { Modal, Table } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GrTrash, GrView } from 'react-icons/gr';
import { deleteArticulo, fetchArticulos } from '../api/articulo';
import DetailedView from './DetailedView';

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
    caracteristicas: object
}

type Props = {
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

interface ObjetoGenerico {
    [llave: string] : Array<string>
}

const ArticuloTable = ({ isLoading, setIsLoading }: Props) => {

    const [dataSource, setDataSource] = useState([]);
    const [openDetailview, setOpenDetailView] = useState(false);
    const [openConfirm, setOpenconfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const showDetailModal = (id: number) => {
        setSelectedId(id)
        setOpenDetailView(true);
    };

    const showConfirmModal = (id: number) => {
        setSelectedId(id);
        setOpenconfirm(true);
    }

    useEffect(() => {
        if (!isLoading) return;

        const getArticulos = async () => {
            try {
                const response = await fetchArticulos();
                const articulos = response?.data;
                const newDataSource = articulos.map((articulo: Articulo, index: number) => {
                    return {
                        key: index,
                        ...articulo
                    }
                });

                setDataSource(newDataSource);
            } catch (error) {
                console.error(error);
            }
        }

        getArticulos();
        setIsLoading(false)
    }, [isLoading, dataSource, setIsLoading]);

    const fetchDeleteArticulo = async (id: number) => {
        try {
            await deleteArticulo(id);
            setIsLoading(true);
            setOpenconfirm(false);
        } catch (error) {
            console.error(error)
        }
    }


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'name',
        },
        {
            title: 'Código',
            dataIndex: 'codigo',
            key: 'code',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'status',
        },
        {
            title: 'Categoría',
            dataIndex: 'categoria',
            key: 'categoryId',
            render: (categoria: ObjetoGenerico) => {
                return categoria.nombre
            }
        },
        {
            title: 'Espacio',
            dataIndex: 'espacio',
            key: 'spaceId',
            render: (espacio: ObjetoGenerico) => {
                return espacio.nombre
            }
        },
        {
            title: 'Número de Serie',
            dataIndex: 'numero_serie',
            key: 'serialNumber',
        },
        {
            title: 'Posición',
            dataIndex: 'posicion',
            key: 'position',
        },
        {
            title: 'Características',
            dataIndex: 'caracteristicas',
            key: 'characteristics',
            width: 200,
            render: (text: object) => {
                const characteristics = Object.entries(text);
                return characteristics.map(([key, value]) => <p key={key}>{`${key}: ${value}`}</p>);
            }, // Convertir el objeto a JSON para mostrarlo en la tabla
        },
        {
            title: 'Acciones',
            key: 'actions',
            dataIndex: 'id',
            render: (id: number) => {
                return (
                    <div className='flex gap-4' key={id}>
                        <div
                            className='rounded-full border-2 border-blue-200 p-2 hover:bg-gray-200 transition-all cursor-pointer'
                            onClick={() => showDetailModal(id)}
                        >
                            <GrView className=' text-blue-600' />
                        </div>
                        <div
                            className='rounded-full border-2 border-red-200 p-2 hover:bg-gray-200 transition-all cursor-pointer'
                            onClick={() => showConfirmModal(id)}
                        >
                            <GrTrash className=' text-red-600' />
                        </div>

                    </div >
                )
            }
        }
    ];

    return (
        <section className='w-full max-w-7xl mx-auto mt-8 flex flex-col px-2'>
            <div className="mx-auto mb-3">
                <Typography variant="h3" placeholder={undefined}>Artículos registrados</Typography>
            </div>
            <Table dataSource={dataSource} columns={columns} scroll={{ x: true }} size='small' />
            <DetailedView open={openDetailview} setOpen={setOpenDetailView} id={selectedId} setIsLoading={setIsLoading} />
            <Modal
                open={openConfirm}
                onCancel={() => setOpenconfirm(false)}
                centered
                title="Eliminar Artículo"
                cancelText="Cancelar"
                okText="Eliminar"
                okButtonProps={{
                    type: 'primary',
                    danger: true
                }}
                onOk={() => fetchDeleteArticulo(selectedId)}
            >
                Estás a punto de eliminar el artículo, no será posible deshacer esta acción, ¿estás seguro de eliminarlo?
            </Modal>
        </section>
    )
}

export default ArticuloTable

