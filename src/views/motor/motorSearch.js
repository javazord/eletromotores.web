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
import { Dialog } from 'primereact/dialog';
import Checkbox from "../../components/grid/checkbox";


class MotorSearch extends React.Component {

    state = {
        marca: '',
        modelo: '',
        ranhuras: 0,
        medidaInterna: 0,
        medidaExterna: 0,
        potencia: 0,
        motores: [],
        motor: {
            fio: {
                awgs: [],
                quantidades: [],
                espiras: []
            },
            voltagens: [],
            amperagens: [],
            usuario: {}
        },
        showConfirmDiaglog: false
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

    //modal para ver dados do usuário
    view = (motor) => {
        console.log(motor.registro)
        this.setState({ showConfirmDiaglog: true, motor: motor })
    }

    //modal para cancelar a atualização de dados
    cancel = () => {
        this.setState({ showConfirmDiaglog: false, motor: {} })
        this.clearLogin()
    }

    render() {

        const lista = this.state.motor.fio.awgs.map((awgs) => awgs)

        return (
            <>
                <Card title="Pesquisar">

                    <Row className="m-auto">
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
                            <MotorTable motores={this.state.motores} view={this.view} />
                        </Col>
                    </Row>


                </Card>

                <div>
                    <Dialog header={`Data ${new Intl.DateTimeFormat('pt-BR').format(this.state.motor.registro) }`} visible={this.state.showConfirmDiaglog} modal={true} style={{ width: '60vw' }} onHide={() => this.setState({ showConfirmDiaglog: false, login: '' })}>
                        

                            <Row>
                                <Col>
                                    <FormGroup label="Marca">
                                        <input name="marca" value={this.state.motor.marca} className="form-control" readOnly />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup label="Modelo">
                                        <input name="modelo" value={this.state.motor.modelo} className="form-control" readOnly />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup label="Ranhuras">
                                        <input name="ranhuras" value={this.state.motor.ranhuras} className="form-control" readOnly />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup label="Rotação">
                                        <input name="rotacao" value={this.state.motor.rotacao} className="form-control" readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormGroup label="Peso">
                                        <input name="peso" className="form-control" readOnly />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup label="Potência">
                                        <input name="potencia" value={this.state.motor.potencia} className="form-control" readOnly />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup label="Comprimento">
                                        <input name="medidaInterna" value={this.state.motor.medidaInterna} className="form-control" readOnly />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup label="Medida Externa">
                                        <input name="medidaExterna" value={this.state.motor.medidaExterna} className="form-control" readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                {
                                    this.state.motor.fio.awgs.map((valor, index) => (
                                        <Col className="col-md-2" key={index}>
                                            <label>Awg {index + 1}</label>
                                            <input className="form-control" value={valor} id={`awg${index + 1}`} readOnly />
                                        </Col>
                                    ))

                                }
                            </Row>
                            <Row>
                                {

                                    this.state.motor.fio.quantidades.map((qtd, index) => (

                                        <Col className="col-md-2" key={index}>
                                            <label>Quantidade {index + 1}</label>
                                            <input className="form-control" value={qtd} id={`qtd${index + 1}`} readOnly />
                                        </Col>
                                    ))
                                }

                            </Row>

                            <Row>
                                {
                                    this.state.motor.fio.espiras.map((esp, index) => (

                                        <Col className="col-md-2" key={index}>
                                            <label>Espiras {index + 1}</label>
                                            <input className="form-control" value={esp} id={`esp${index + 1}`} readOnly />
                                        </Col>
                                    ))
                                }

                            </Row>
                            <Row>

                                {
                                    this.state.motor.amperagens.map((amp, index) => (

                                        <Col className="col-md-2" key={index}>
                                            <label>Amperagens {index + 1}</label>
                                            <input className="form-control" value={amp} id={`amp${index + 1}`} readOnly />
                                        </Col>

                                    ))
                                }
                                <Col>
                                    <FormGroup label="Ligação">
                                        <input name="ligacao" value={this.state.motor.ligacao} className="form-control" readOnly />
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row className="align-items-center">
                                <Col>
                                    <label >Voltagens</label>
                                    <Row>
                                        {
                                            this.state.motor.voltagens.map((item) => (

                                                <Col key={item}>

                                                    <Checkbox label={`${item}v`} name={item} value={item} readOnly/>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Col>

                                <Col className="col-md-6">
                                    <FormGroup label="Tensão">
                                        <input className="form-control" name="tensao" value={this.state.motor.tensao} disabled />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mt-1 text-end">
                                <Col>
                                        <label >Registrado por {this.state.motor.usuario.login}</label>
                                </Col>
                            </Row>

                    </Dialog>
                </div>
            </>


        )
    }

}

export default MotorSearch