import React from "react";
import { Link } from "react-router-dom";
import MotorService from "../../app/service/motor/motorService";
import Card from '../../components/card'
import FormGroup from '../../components/grid/form-group'
import Row from "../../components/grid/row";
import { showMessageAlert, showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import MotorTable from "./motorTable";
import Col from "../../components/grid/col";
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

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <>
                <Card title="Pesquisar">

                    <Row className=" mt-auto">
                        <Col>
                            <FormGroup label="Marca">
                                <input name="marca" value={this.state.marca} onChange={this.handleInputChange} type="text" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup label="Modelo">
                                <input name="modelo" value={this.state.modelo} onChange={this.handleInputChange} type="text" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup label="Ranhuras">
                                <input name="ranhuras" value={this.state.ranhuras} onChange={this.handleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup label="Comprimento">
                                <input name="medidaInterna" value={this.state.medidaInterna} onChange={this.handleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col >
                            <FormGroup label="Medida Externa">
                                <input name="medidaExterna" value={this.state.medidaExterna} onChange={this.handleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup label="Potência">
                                <input name="potencia" value={this.state.potencia} onChange={this.handleInputChange} type="number" className="form-control" id="inputLogin" />
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