import React, { useContext, useEffect, useState } from "react";
import { MotorService } from "../../app/service/motor/motorService";
import { Card } from 'primereact/card';
import MotorTable from "./motorTable";
import ViewMotorDialog from "./viewMotorDialog";
import { Button } from 'primereact/button';
import EditMotorDialog from "./editMotorDialog";
import { AuthContext } from "../../main/authProvider";
import { Col, Row, Input, Label } from "reactstrap";
import useToast from '../../components/toast';
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { ImagemService } from "../../app/service/imagem/imagemService";

const MotorSearch = () => {
    const [motores, setMotores] = useState([]);
    const [motor, setMotor] = useState({
        rotacao: '',
        modelo: '',
        ranhuras: '',
        marca: '',
        ligacao: '',
        potencia: '',
        comprimento: '',
        medidaExterna: '',
        empresa: '',
        tensao: '',
        fio: {
            awgs: [],
            quantidades: [],
            espiras: [],
            peso: '',
        },
        voltagens: [],
        amperagens: [],
        passo: [],
        usuario: {},
    });
    const [imagem, setImagem] = useState();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [editConfirmDialog, setEditConfirmDialog] = useState(false);
    const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const { authUser } = useContext(AuthContext);
    const { showMessageSuccess, showMessageAlert, showMessageError, toast } = useToast();
    const service = new MotorService();
    const imgService = new ImagemService();

    useEffect(() => {

    }, [motor])

    const buttonSearch = () => {
        service
            .search(motor)
            .then((response) => {
                const list = response.data;
                load(list);
                setMotores(list);
            })
            .catch((erro) => {
                console.log(erro);
            });
    };

    const resetState = () => {
        setMotor({
            rotacao: '',
            modelo: '',
            ranhuras: '',
            marca: '',
            ligacao: '',
            potencia: '',
            comprimento: '',
            medidaExterna: '',
            empresa: '',
            tensao: '',
            fio: {
                awgs: [],
                quantidades: [],
                espiras: [],
                peso: '',
            },
            voltagens: [],
            amperagens: [],
            passo: [],
            usuario: {},
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
                setMotores((prevMotores) => [...prevMotores.slice(0, index), ...prevMotores.slice(index + 1),]);
                showMessageSuccess('Motor deletado com sucesso!');
            })
                .catch(error => {
                    console.error(error)
                })

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
            <Card title="Pesquisar">
                <Row className="d-flex align-items-end">
                    <Col>
                        <Label>Marca</Label>
                        <Input name="marca" value={motor.marca} onChange={handleInputChange} type="text" className="form-control mt-1" />
                    </Col>
                    <Col>
                        <Label>Ranhuras</Label>
                        <Input name="ranhuras" value={motor.ranhuras} onChange={handleInputChange} type="number" className="form-control mt-1" />
                    </Col>
                    <Col>
                        <Label>Potência</Label>
                        <Input name="potencia" value={motor.potencia} onChange={handleInputChange} type="number" className="form-control mt-1" />
                    </Col>
                    <Col>
                        <Label>Comprimento</Label>
                        <Input name="comprimento" value={motor.comprimento} onChange={handleInputChange} type="number" className="form-control mt-1" />
                    </Col>
                    <Col >
                        <Label>M. Externa</Label>
                        <Input name="medidaExterna" value={motor.medidaExterna} onChange={handleInputChange} type="number" className="form-control mt-1" />
                    </Col>

                    <Col className="">
                        <Button onClick={buttonSearch} className="btn btn-primary" icon="pi pi-search" size="sm" label="Buscar" loading={loading} />
                    </Col>
                </Row>
                <br />

                <MotorTable motores={motores} view={view} edit={edit} delete={deletar} context={authUser} />

            </Card>

            <Dialog header={`Deletar motor ${motor.marca}`} visible={deleteConfirmDialog} style={{ width: '50vw' }} onHide={onHide} footer={footerContent}>
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