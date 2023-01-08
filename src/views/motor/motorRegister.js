import React from "react";
import MotorService from '../../app/service/motor/motorService'
import Card from "../../components/card";
import { showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import FormGroup from '../../components/form-group-login'
import Col from "../../components/col";
import Row from '../../components/row'
import { Button } from 'primereact/button'
import HandleInputChange from '../../components/events/handleInputChange'

class MotorRegister extends React.Component {

    state = {
        marca: "",
        modelo: "",
        ranhuras: 0,
        rotacao: 0,
        ligacao: "",
        potencia: 0,
        medidaInterna: 0,
        medidaExterna: 0,
        tensao: "TRIFASICO",
        fio: {
            awgs: [],
            espiras: [],
            quantidades: [],
            peso: 0
        },
        voltagens: [],
        amperagens: [],
        usuario: {}
    }

    constructor() {
        super();
        this.service = new MotorService();
    }

    addInputAWG = (e) => {
        e.preventDefault();

        this.setState({ awgs: [...this.state.fio.awgs, ""] });
        console.log(this.state.fio.awgs)
    }

    addAWG = (e, index) => {
        e.preventDefault();
        this.setState((prevState) => {
            this.state.fio.awgs[index] = parseInt(e.target.value);
            const copy = [...prevState.fio.awgs];
            return { ...prevState, copy };
        });
    }

    render() {
        return (

            <Card title="Cadastrar Motor">
                <Row>
                    <Col>
                        <FormGroup label="Marca">
                            <input value={this.state.marca} onChange={HandleInputChange} type="text" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Modelo">
                            <input value={this.state.modelo} onChange={HandleInputChange} type="text" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Ranhuras">
                            <input value={this.state.ranhuras} onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Rotação">
                            <input value={this.state.rotacao} onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup label="Ligação">
                            <input value={this.state.ligacao} onChange={HandleInputChange} type="text" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Potência">
                            <input value={this.state.potencia} onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Medida Interna">
                            <input value={this.state.medidaInterna} onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Medida Externa">
                            <input value={this.state.medidaExterna} onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                </Row>

                <Row >
                    {
                        this.state.fio.awgs.map((awg, index) => (
                            <Col key={index}>
                                <FormGroup label={`AWG ${index + 1}`}>
                                    <input value={awg} type="number" id="awg" onChange={(e) => this.addAWG(e, index)} className="form-control" />
                                </FormGroup>
                            </Col>
                        ))
                    }
                    <pre>{this.state.fio.awgs}</pre>
                    <Col className="mb-2 ">
                        <Button className="p-button-rounded p-button-icon-only" icon="p-button-icon p-c pi pi-plus" onClick={this.addInputAWG}></Button>
                    </Col>

                </Row>
                <button onClick={this.create} type="button" className="btn btn-success">Cadastrar</button>


            </Card>


        )
    }
}

export default MotorRegister