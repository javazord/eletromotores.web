import React, { useState } from "react";
import Col from "../../components/grid/col";
import Row from "../../components/grid/row";
import { Dialog } from "primereact/dialog";
import FormGroup from "../../components/grid/form-group";
import Checkbox from "../../components/grid/checkbox";
import { Button } from 'primereact/button'

function EditMotorDialog(props) {

    const { visible, onHide } = props;
    const [motor, setMotor] = useState(props.motor);
    console.log(props.motor)
    if (!motor) {
        return null;
    }

    const footer = (
        <><Button label="Atualizar" className="p-button-success" icon="pi pi-check" onClick={onHide} size="sm" />
            <Button label="Fechar" className="p-button-secondary" icon="pi pi-times" onClick={onHide} size="sm" /></>
    )

    const handleOnChange = event => {
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
                    <FormGroup label="Marca">
                        <input name="marca" value={motor.marca} type="text" className="form-control" onChange={handleOnChange}/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Modelo">
                        <input name="modelo" value={motor.modelo} type="text" className="form-control" onChange={handleOnChange}/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Ranhuras">
                        <input name="ranhuras" value={motor.ranhuras} type="number" className="form-control" onChange={handleOnChange}/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Rotação">
                        <input name="rotacao" value={motor.rotacao} type="number" className="form-control" onChange={handleOnChange}/>
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup label="Peso">
                        <input id="peso" value={motor.fio.peso} type="number" className="form-control" />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Potência">
                        <input name="potencia" value={motor.potencia} type="number" className="form-control" />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Comprimento">
                        <input name="medidaInterna" value={motor.medidaInterna} type="number" min="1" max="100" className="form-control" />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Medida Externa">
                        <input name="medidaExterna" value={motor.medidaExterna} type="number" className="form-control" />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                {
                    motor.fio.awgs.map((valor, index) => (
                        <Col className="col-md-2" key={index}>
                            <label>Awg {index + 1}</label>
                            <input className="form-control" type="number" value={valor} id={`awg${index + 1}`} />
                        </Col>
                    ))

                }
            </Row>

            <Row>
                {

                    motor.fio.quantidades.map((qtd, index) => (

                        <Col className="col-md-2" key={index}>
                            <label>Quantidade {index + 1}</label>
                            <input className="form-control" type="number" value={qtd} id={`qtd${index + 1}`} />
                        </Col>

                    ))

                }

            </Row>
            <Row>
                {

                    motor.fio.espiras.map((esp, index) => (

                        <Col className="col-md-2" key={index}>
                            <label>Espiras {index + 1}</label>
                            <input className="form-control" type="number" value={esp} id={`esp${index + 1}`} />
                        </Col>

                    ))

                }

            </Row>
            <Row>
                <Row>
                    {
                        motor.amperagens.map((amp, index) => (

                            <Col key={index}>
                                <label>Amperagem {index + 1}</label>
                                <input className="form-control" type="number" value={amp} id={`amp${index + 1}`} />
                            </Col>

                        ))
                    }
                </Row>
                <Row>
                    {
                        motor.voltagens.map((amp, index) => (

                            <Col key={index}>
                                <label>Voltagem {index + 1}</label>
                                <input className="form-control" type="number" value={amp} id={`amp${index + 1}`} />
                            </Col>

                        ))
                    }
                </Row>
            </Row>

            <Row>
                <Col className="col-md-3">
                    <FormGroup label="Tensão">
                        <input name="tensao" value={motor.tensao} className="form-control" />
                    </FormGroup>
                </Col>
                <Col className="col-md-5">
                    <FormGroup label="Ligação">
                        <input name="ligacao" value={motor.ligacao} type="text" className="form-control" />
                    </FormGroup>
                </Col>
                <Col className="col-md-4">
                    <FormGroup label="Colaborador ">
                        <input name="usuario" value={motor.usuario.login} type="text" className="form-control" />
                    </FormGroup>
                </Col>
            </Row>

        </Dialog>
    );
}

export default EditMotorDialog;