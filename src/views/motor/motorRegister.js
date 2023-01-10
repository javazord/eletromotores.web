import React from "react";
import MotorService from '../../app/service/motor/motorService'
import Card from "../../components/card";
import { showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import FormGroup from '../../components/grid/form-group-login'
import Col from "../../components/grid/col";
import Row from '../../components/grid/row'
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

    addAWG = (e) => {
        e.preventDefault();

        // Mapeia cada nome para a posição (índice) do array:
        const nameToIndexMap = {
            'awg1': 0,
            'awg2': 1,
            'awg3': 1,
            'awg4': 1,
            'awg5': 1
        };

        const name = e.target.name;
        const val = parseInt(e.target.value);

        this.setState((obj) => {
            // Copiamos o array:
            const copy = [...obj.fio.awgs];
            // Modificamos o índice de acordo com o nosso mapa:
            copy[nameToIndexMap[name]] = val;
            this.state.fio.awgs.push(copy)
            
        });
        console.log(this.state.fio.awgs)
    };

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
                    <Col >
                        <FormGroup label={"AWG 1"}>
                            <input type="number" name="awg1" onChange={this.addAWG} className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col >
                        <FormGroup label={"AWG 2"}>
                            <input type="number" name="awg2" onChange={this.addAWG} className="form-control" />
                        </FormGroup>
                    </Col>



                </Row>
                <pre></pre>
                <button onClick={this.create} type="button" className="btn btn-success">Cadastrar</button>


            </Card>


        )
    }
}

export default MotorRegister