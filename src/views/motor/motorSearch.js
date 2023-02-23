import React from "react";
import { Link } from "react-router-dom";
import MotorService from "../../app/service/motor/motorService";
import { Card } from 'primereact/card'
import FormGroup from '../../components/grid/form-group'
import Row from "../../components/grid/row";
import { showMessageAlert, showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import MotorTable from "./motorTable";
import Col from "../../components/grid/col";
import { Dialog } from 'primereact/dialog';
import Checkbox from "../../components/grid/checkbox";
import Modal from "./viewDialog";
import {Button} from 'primereact/button'


class MotorSearch extends React.Component {

    state = {
        motores: [],
        motor: {
            fio: {
                awgs: [],
                quantidades: [],
                espiras: [],
                peso: 0
            },
            voltagens: [],
            amperagens: [],
            usuario: {},
            marca: '',
            modelo: '',
            ranhuras: 0,
            medidaInterna: 0,
            medidaExterna: 0,
            potencia: 0,
        },
        showConfirmDialog: false
    }

    constructor() {
        super();
        this.service = new MotorService();
    }

    buttonSearch = () => {
        const { motor } = this.state;
        const motorFilter = {
            marca: motor.marca,
            modelo: motor.modelo,
            ranhuras: motor.ranhuras,
            medidaInterna: motor.medidaInterna,
            medidaExterna: motor.medidaExterna,
            potencia: motor.potencia,
            fio: motor.fio,
        };
        this.service.search(motorFilter)
            .then(response => {
                const list = response.data;
                if (list.length < 1) {
                    showMessageAlert("Nenhum resultado encontrado.")
                }

                this.setState({ motores: list })
            }).catch(erro => {
                console.log(erro)
            })

    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        const { motor } = this.state;
        if (name.includes('fio.')) {
            const [field, subField] = name.split('.');
            this.setState({
                motor: {
                    ...motor,
                    fio: {
                        ...motor.fio,
                        [field]: {
                            ...motor.fio[field],
                            [subField]: value,
                        },
                    },
                },
            });
        } else {
            this.setState({ motor: { ...motor, [name]: value } });
        }
    };

    //modal para ver dados do motor
    view = (motor) => {
        this.setState({ showConfirmDialog: true, motor: motor })
    }

    onHide = () => {
        this.setState({ showConfirmDialog: false });
    };

    //modal para cancelar a atualização de dados
    cancel = () => {
        this.setState({ showConfirmDialog: false })
        this.clearLogin()
    }

    render() {
        return (
            <>
                <Card title="Pesquisar">

                    <Row className="">
                        <Col>
                            <FormGroup label="Marca">
                                <input name="marca" value={this.state.marca} onChange={this.handleInputChange} type="text" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup label="Ranhuras">
                                <input name="ranhuras" value={this.state.ranhuras} onChange={this.handleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup label="Potência">
                                <input name="potencia" value={this.state.potencia} onChange={this.handleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup label="Comprimento">
                                <input name="medidaInterna" value={this.state.medidaInterna} onChange={this.handleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>
                        <Col >
                            <FormGroup label="M. Externa">
                                <input name="medidaExterna" value={this.state.medidaExterna} onChange={this.handleInputChange} type="number" className="form-control" id="inputLogin" />
                            </FormGroup>
                        </Col>

                        <Col className=" mt-auto">
                            <FormGroup>
                                <Button onClick={this.buttonSearch} className="btn btn-primary" icon="pi pi-search" size="sm" label="Buscar"/>
                            </FormGroup>

                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col >
                            <MotorTable motores={this.state.motores} view={this.view} />
                        </Col>
                    </Row>


                </Card>

                <div>
                    <Modal motor={this.state.motor} visible={this.state.showConfirmDialog} onHide={this.onHide} />
                </div>
            </>


        )
    }

}

export default MotorSearch