import React from "react";
import { Link } from "react-router-dom";
import MotorService from "../../app/service/motor/motorService";
import Card from '../../components/card'
import FormGroup from '../../components/form-group-login'
import Row from "../../components/row";
import { showMessageAlert, showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import MotorTable from "./motorTable";
import Col from "../../components/col";
import HandleInputChange from '../../components/events/handleInputChange';


class MotorSearch extends React.Component {

    state = {
        marca: '',
        modelo: '',
        ranhuras: 0,
        medidaInterna: 0,
        medidaExterna: 0,
        potencia: 0,
        motores: []
    }

    constructor() {
        super();
        this.service = new MotorService();
    }

    buttonSearch = () => {
        const { marca, modelo, ranhuras, medidaInterna, medidaExterna, potencia } = this.state;
        const motorFilter = { marca, modelo, ranhuras, medidaInterna, medidaExterna, potencia }

        this.service.search(motorFilter)
            .then(response => {
                const list = response.data;
                console.log(motorFilter.modelo)
                if (list.length < 1) {
                    showMessageAlert("Nenhum resultado encontrado.")
                }

                this.setState({ motores: list })
            }).catch(erro => {
                console.log(erro)
            })

    }

    render() {
        return (
            <>
                <Card title="Pesquisar">

                    <Row className=" mt-auto">
                        <Col>
                            <FormGroup label="Marca">
                                <input value={this.state.marca} onChange={HandleInputChange} type="text" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup label="Modelo">
                                <input value={this.state.modelo} onChange={HandleInputChange} type="text" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup label="Ranhuras">
                                <input value={this.state.ranhuras} onChange={HandleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup label="Medida Interna">
                                <input value={this.state.medidaInterna} onChange={HandleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col >
                            <FormGroup label="Medida Externa">
                                <input value={this.state.medidaExterna} onChange={HandleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup label="Potência">
                                <input value={this.state.potencia} onChange={HandleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col className=" mt-auto">
                            <FormGroup>
                                <button onClick={this.buttonSearch} className="btn btn-primary" type="submit">Buscar</button>
                            </FormGroup>

                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col className="-md-12">
                            <MotorTable motores={this.state.motores} />
                        </Col>
                    </Row>


                </Card></>

        )
    }

}

export default MotorSearch