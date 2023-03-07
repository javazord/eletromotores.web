import React from "react";
import MotorService from "../../app/service/motor/motorService";
import { Card } from 'primereact/card';
import { showMessageAlert } from "../../components/toastr";
import MotorTable from "./motorTable";
import ViewMotorDialog from "./viewMotorDialog";
import { Button } from 'primereact/button';
import EditMotorDialog from "./editMotorDialog";
import { AuthContext } from "../../main/authProvider";
import { Col, Row, Input, Label } from "reactstrap";


export default class MotorSearch extends React.Component {

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
            comprimento: 0,
            medidaExterna: 0,
            potencia: 0,
        },
        showConfirmDialog: false,
        editConfirmDialog: false
    }

    constructor() {
        super();
        this.service = new MotorService();
    }

    buttonSearch = () => {
        const { motor } = this.state;
        const motorFilter = {
            marca: motor.marca,
            ranhuras: motor.ranhuras,
            comprimento: motor.comprimento,
            medidaExterna: motor.medidaExterna,
            potencia: motor.potencia
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

    resetState = () => {
        this.setState({
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
                comprimento: 0,
                medidaExterna: 0,
                potencia: 0,
            },
            showConfirmDialog: false,
            editConfirmDialog: false
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

    edit = (motor) => {
        this.setState({ editConfirmDialog: true, motor: motor })
    }

    onHide = () => {
        this.resetState();
    };

    //modal para cancelar a atualização de dados
    cancel = () => {
        this.setState({ showConfirmDialog: false })
    }

    render() {
        return (
            <>
                <Card title="Pesquisar">
                    <Row className="d-flex align-items-end">
                        <Col>
                            <Label>Marca</Label>
                            <Input name="marca" value={this.state.marca} onChange={this.handleInputChange} type="text" className="form-control mt-1" id="inputLogin" />
                        </Col>
                        <Col>
                            <Label>Ranhuras</Label>
                            <Input name="ranhuras" value={this.state.ranhuras} onChange={this.handleInputChange} type="number" className="form-control mt-1" id="inputLogin" />
                        </Col>
                        <Col>
                            <Label>Potência</Label>
                            <Input name="potencia" value={this.state.potencia} onChange={this.handleInputChange} type="number" className="form-control mt-1" id="inputLogin" />
                        </Col>
                        <Col>
                            <Label>Comprimento</Label>
                            <Input name="comprimento" value={this.state.comprimento} onChange={this.handleInputChange} type="number" className="form-control mt-1" id="inputLogin" />
                        </Col>
                        <Col >
                            <Label>M. Externa</Label>
                            <Input name="medidaExterna" value={this.state.medidaExterna} onChange={this.handleInputChange} type="number" className="form-control mt-1" id="inputLogin" />
                        </Col>

                        <Col className="">
                            <Button onClick={this.buttonSearch} className="btn btn-primary" icon="pi pi-search" size="sm" label="Buscar" />
                        </Col>
                    </Row>
                    <br />

                    <MotorTable motores={this.state.motores} view={this.view} edit={this.edit} context={this.context} />

                </Card>

                <ViewMotorDialog motor={this.state.motor} visible={this.state.showConfirmDialog} onHide={this.onHide} />

                <EditMotorDialog motor={this.state.motor} visible={this.state.editConfirmDialog} onHide={this.onHide} />
            </>
        )
    }

}
MotorSearch.contextType = AuthContext;