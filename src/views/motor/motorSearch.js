import React, { useContext, useState } from "react";
import { MotorService } from "../../app/service/motor/motorService";
import MotorTable from "./motorTable";
import ViewMotorDialog from "./viewMotorDialog";
import { Button } from 'primereact/button';
import EditMotorDialog from "./editMotorDialog";
import { AuthContext } from "../../main/authProvider";
import { Card, Form, Row, Col, CardHeader, Container } from 'react-bootstrap';
import useToast from '../../components/toast';
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const MotorSearch = () => {
    const [motores, setMotores] = useState([]);
    const [motor, setMotor] = useState({
        rotacao: 0,
        modelo: '',
        ranhuras: 0,
        marca: '',
        ligacao: '',
        potencia: 0,
        comprimento: 0,
        medidaInterna: 0,
        empresa: '',
        tensao: {
            tipoTensao: '', //Trifasico ou Monofasico
            bobinas: [
                {
                    tipoBobina: 'TRABALHO', //UNICO, TRABALHO, AUXILIAR
                    fio: {
                        awgs: [0],
                        quantidades: [0],
                        espiras: [0]
                    },
                    passo: [0]
                },
                {
                    tipoBobina: 'AUXILIAR', //UNICO, TRABALHO, AUXILIAR
                    fio: {
                        awgs: [0],
                        quantidades: [0],
                        espiras: [0]
                    },
                    passo: [0]
                },
                {
                    tipoBobina: 'UNICO', //UNICO, TRABALHO, AUXILIAR
                    fio: {
                        awgs: [0],
                        quantidades: [0],
                        espiras: [0]
                    },
                    passo: [0]
                }
            ]
        },
        peso: 0,
        voltagens: [],
        amperagens: [],
        usuario: {},
        imagem: {
            dados: null,
            nome: null,
            tipo: null
        }
    });
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [editConfirmDialog, setEditConfirmDialog] = useState(false);
    const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const { authUser } = useContext(AuthContext);
    const { showMessageSuccess, showMessageAlert, showMessageError, toast } = useToast();
    const service = new MotorService();

    const buttonSearch = () => {
        service
            .search(motor)
            .then((response) => {
                load(response.data);

            })
            .catch((erro) => {
                console.log(erro);
            });
    };

    const resetState = () => {
        setMotor({
            rotacao: 0,
            modelo: '',
            ranhuras: 0,
            marca: '',
            ligacao: '',
            potencia: 0,
            comprimento: 0,
            medidaInterna: 0,
            empresa: '',
            tensao: {
                tipoTensao: '', //Trifasico ou Monofasico
                bobinas: [
                    {
                        tipoBobina: 'TRABALHO', //UNICO, TRABALHO, AUXILIAR
                        fio: {
                            awgs: [0],
                            quantidades: [0],
                            espiras: [0]
                        },
                        passo: [0]
                    },
                    {
                        tipoBobina: 'AUXILIAR', //UNICO, TRABALHO, AUXILIAR
                        fio: {
                            awgs: [0],
                            quantidades: [0],
                            espiras: [0]
                        },
                        passo: [0]
                    },
                    {
                        tipoBobina: 'UNICO', //UNICO, TRABALHO, AUXILIAR
                        fio: {
                            awgs: [0],
                            quantidades: [0],
                            espiras: [0]
                        },
                        passo: [0]
                    }
                ]
            },
            peso: 0,
            voltagens: [],
            amperagens: [],
            usuario: {},
            imagem: {
                dados: null,
                nome: null,
                tipo: null
            }
        });
        setShowConfirmDialog(false);
        setEditConfirmDialog(false);
        setDeleteConfirmDialog(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.includes('fio.')) {
            const [field, subField] = name.split('.');
            setMotor((prevMotor) => ({
                ...prevMotor,
                fio: {
                    ...prevMotor.fio,
                    [field]: {
                        ...prevMotor.fio[field],
                        [subField]: value,
                    },
                },
            }));
        } else {
            setMotor((prevMotor) => ({ ...prevMotor, [name]: value }));
        }
    };

    const load = (lista) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (lista < 1) {
                showMessageAlert('Nenhum resultado encontrado.');
            }
            setMotores(lista);
        }, 2000);
    }

    const view = (motor) => {
        setMotor(motor);
        setShowConfirmDialog(true);
    };

    const edit = (motor) => {
        setMotor(motor);
        setEditConfirmDialog(true);
    };

    const deletar = (motor) => {
        setMotor(motor);
        setDeleteConfirmDialog(true);
    }

    const onDelete = () => {
        try {
            service.deletar(motor.id).then((response) => {
                const index = motores.indexOf(motor);
                setMotores((prevMotores) => [
                    ...prevMotores.slice(0, index),
                    ...prevMotores.slice(index + 1),
                ]);
                showMessageSuccess('Motor deletado com sucesso!');
            });
        } catch (error) {
            showMessageError('Ocorreu um erro ao deletar o motor');
        }
        onHide()
    };

    const onHide = () => {
        resetState();
    };

    const footerContent = (
        <div>
            <Button label="Não" icon="pi pi-times" onClick={onHide} className="p-button-text" autoFocus />
            <Button label="Sim" icon="pi pi-check" onClick={onDelete} />
        </div>
    );

    return (
        <>
            <Container>
                <Card>
                    <CardHeader as="h5">Pesquisar</CardHeader>
                    <Card.Body>
                        <Row className="d-flex align-items-end">
                            <Col>
                                <Form.Label>Marca</Form.Label>
                                <Form.Control name="marca" value={motor.marca} onChange={handleInputChange} type="text" className="form-control mt-1" />
                            </Col>
                            <Col>
                                <Form.Label>Ranhuras</Form.Label>
                                <Form.Control name="ranhuras" value={motor.ranhuras} onChange={handleInputChange} type="number" className="form-control mt-1" min={0}/>
                            </Col>
                            <Col>
                                <Form.Label>Potência</Form.Label>
                                <Form.Control name="potencia" value={motor.potencia} onChange={handleInputChange} type="number" className="form-control mt-1" min={0}/>
                            </Col>
                            <Col>
                                <Form.Label>Comprimento</Form.Label>
                                <Form.Control name="comprimento" value={motor.comprimento} onChange={handleInputChange} type="number" className="form-control mt-1" min={0}/>
                            </Col>
                            <Col >
                                <Form.Label>M. Externa</Form.Label>
                                <Form.Control name="medidaInterna" value={motor.medidaInterna} onChange={handleInputChange} type="number" className="form-control mt-1" min={0}/>
                            </Col>

                            <Col className="">
                                <Button onClick={buttonSearch} className="btn btn-primary" icon="pi pi-search" size="sm" label="Buscar" loading={loading} />
                            </Col>
                        </Row>
                    </Card.Body>

                    <br />

                    <MotorTable motores={motores} view={view} edit={edit} delete={deletar} context={authUser} />

                </Card>
            </Container>


            <Dialog header={`Deletar Motor ${motor.marca}`} visible={deleteConfirmDialog} style={{ width: '50vw' }} onHide={onHide} footer={footerContent}>
                <p className="m-0">
                    Deseja deletar o motor de ID {motor.id} ?
                </p>
            </Dialog>

            {showConfirmDialog && <ViewMotorDialog motor={motor} visible={showConfirmDialog} onHide={onHide} />}

            {editConfirmDialog && <EditMotorDialog motor={motor} visible={editConfirmDialog} onHide={onHide} />}
            <Toast ref={toast} />
        </>
    )

}
export default MotorSearch;