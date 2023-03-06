import React, { useState } from "react";
import { Row, Col, Input, Label } from "reactstrap";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { useEffect } from "react";
import MotorService from '../../app/service/motor/motorService';
import { showMessageAlert, showMessageError, showMessageSuccess } from "../../components/toastr";
import { validate } from "./motorAttributes";

export default function EditMotorDialog(props) {

    const service = new MotorService();
    const { visible, onHide } = props;

    const [motor, setMotor] = useState(useEffect(() => {
        setMotor(props.motor);
    }, [props.motor]));

    if (!motor) {
        return null;
    }
    
    const update = () => {
        
        motor.usuario = motor.usuario.id
        try {
            validate(motor);
          } catch (error) {
            const msgs = error.mensagens;
            msgs.forEach(msg => showMessageAlert(msg));
            return false;
          }
        service.update(motor)
            .then(response => {
                showMessageSuccess('Motor atualizado com sucesso!')
            }).catch(erro => {
                console.log(erro)
                showMessageError(erro.response.data)
            })
    }

    const footer = (
        <><Button label="Atualizar" className="p-button-success" icon="pi pi-check" onClick={update} size="sm" />
            <Button label="Fechar" className="p-button-secondary" icon="pi pi-times" onClick={onHide} size="sm" /></>
    )

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setMotor({ ...motor, [name]: value });
    };

    return (

        <Dialog
            header={`Atualizar ${motor.id}`}
            visible={visible}
            modal={true}
            style={{ width: '60vw' }}
            onHide={onHide} // Passa a propriedade onHide para o componente Dialog
            footer={footer}
        >
            <Row>
                <Col>
                    <Label>Marca</Label>
                    <Input name="marca" value={motor.marca} type="text" className="form-control" onChange={handleOnChange} />
                </Col>
                <Col>
                    <Label>Modelo</Label>
                    <Input name="modelo" value={motor.modelo} type="text" className="form-control" onChange={handleOnChange} />
                </Col>
                <Col>
                    <Label>Ranhuras</Label>
                    <Input name="ranhuras" value={motor.ranhuras} type="number" className="form-control" onChange={handleOnChange} />
                </Col>
                <Col>
                    <Label>Rotação</Label>
                    <Input name="rotacao" value={motor.rotacao} type="number" className="form-control" onChange={handleOnChange} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Label>Peso</Label>
                    <Input id="peso" value={motor.fio.peso} type="number" className="form-control" onChange={handleOnChange} />
                </Col>
                <Col>
                    <Label>Potência</Label>
                    <Input name="potencia" value={motor.potencia} type="number" className="form-control" onChange={handleOnChange} />
                </Col>
                <Col>
                    <Label>Comprimento</Label>
                    <Input name="medidaInterna" value={motor.medidaInterna} type="number" min="1" max="100" className="form-control" onChange={handleOnChange} />
                </Col>
                <Col>
                    <Label>Medida Externa</Label>
                    <Input name="medidaExterna" value={motor.medidaExterna} type="number" className="form-control" onChange={handleOnChange} />
                </Col>
            </Row>

            <Row>
                {
                    motor.fio.awgs.map((valor, index) => (
                        <Col className="col-md-2" key={index}>
                            <Label>Awg {index + 1}</Label>
                            <Input className="form-control" type="number" value={valor} id={`awg${index + 1}`} onChange={handleOnChange} />
                        </Col>
                    ))

                }
            </Row>

            <Row>
                {

                    motor.fio.quantidades.map((qtd, index) => (

                        <Col className="col-md-2" key={index}>
                            <Label>Quantidade {index + 1}</Label>
                            <Input className="form-control" type="number" value={qtd} id={`qtd${index + 1}`} onChange={handleOnChange} />
                        </Col>
                    ))
                }

            </Row>
            <Row>
                {

                    motor.fio.espiras.map((esp, index) => (

                        <Col className="col-md-2" key={index}>
                            <Label>Espiras {index + 1}</Label>
                            <Input className="form-control" type="number" value={esp} id={`esp${index + 1}`} onChange={handleOnChange} />
                        </Col>
                    ))
                }

            </Row>
            <Row>
                <Row>
                    {
                        motor.amperagens.map((amp, index) => (

                            <Col key={index}>
                                <Label>Amperagem {index + 1}</Label>
                                <Input className="form-control" type="number" value={amp} id={`amp${index + 1}`} onChange={handleOnChange} />
                            </Col>
                        ))
                    }
                </Row>
                <Row>
                    {
                        motor.voltagens.map((amp, index) => (

                            <Col key={index}>
                                <Label>Voltagem {index + 1}</Label>
                                <Input className="form-control" type="number" value={amp} id={`amp${index + 1}`} onChange={handleOnChange} />
                            </Col>
                        ))
                    }
                </Row>
            </Row>

            <Row>
                <Col className="col-md-3">
                    <Label>Tensão</Label>
                    <Input name="tensao" value={motor.tensao} className="form-control" onChange={handleOnChange} />
                </Col>
                <Col className="col-md-5">
                    <Label>Ligação</Label>
                    <Input name="ligacao" value={motor.ligacao} type="text" className="form-control" onChange={handleOnChange} />
                </Col>
                <Col className="col-md-4">
                    <Label>Colaborador</Label>
                    <Input name="usuario" value={motor.usuario.login} type="text" className="form-control" onChange={handleOnChange} />
                </Col>
            </Row>

        </Dialog>
    );
}