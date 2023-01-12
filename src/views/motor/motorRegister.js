import React, { Fragment } from "react";
import MotorService from '../../app/service/motor/motorService'
import Card from "../../components/card";
import { showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import FormGroup from '../../components/grid/form-group'
import Col from "../../components/grid/col";
import Row from '../../components/grid/row'
import { Button } from 'primereact/button'
import HandleInputChange from '../../components/events/handleInputChange'
import Checkbox from "../../components/grid/checkbox";

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
            quantidades: [],
            espiras: [],
            peso: 0
        },
        voltagens: [],
        amperagens: ["", "", "", ""],
        usuario: {},
        checkboxValue: ["100v", "220v", "380v", "440v", "760v"],
        indexAWG: 1,
        indexESP: 1
    }

    constructor() {
        super();
        this.service = new MotorService();
    }

    addInputsESP = (e) => {
        if (this.state.indexESP <= 5) {
            e.preventDefault();

            this.state.fio.espiras.push("")
            const espiras = [...this.state.fio.espiras, ""]
            this.setState({ espiras: espiras, indexESP: this.state.indexESP + 1 });

        }
    }

    addInputs = (e) => {
        if (this.state.indexAWG <= 5) {
            e.preventDefault();

            this.state.fio.awgs.push("")
            this.state.fio.quantidades.push("")
            const awgs = [...this.state.fio.awgs, ""]
            const quantidades = [...this.state.fio.quantidades, ""]
            this.setState({ awgs: awgs, quantidades: quantidades, indexAWG: this.state.indexAWG + 1 });

        }

    };

    removeInputsESP = () => {
        this.state.fio.espiras.pop()
        const espiras = [...this.state.fio.espiras, ""]
        this.setState({ espiras: espiras, indexESP: this.state.indexESP - 1 })
    }

    removeInputs = () => {
        //this.setState([...this.state.fio.awgs.filter((_, index) => index != posicao)])
        this.state.fio.awgs.pop()
        this.state.fio.quantidades.pop()
        const awgs = [...this.state.fio.awgs, ""]
        const quantidades = [...this.state.fio.quantidades, ""]
        this.setState({ awgs: awgs, quantidades: quantidades, indexAWG: this.state.indexAWG - 1 })
    };

    //pega o valor do input
    handleChangeAWG = (e, index) => {
        //numero max estipulado é 5
        if (index <= 5) {
            e.preventDefault();

            this.state.fio.awgs[index] = e.target.value;
            this.setState([...this.state.fio.awgs])
        }
    }
    //pega o valor do input
    handleChangeQTD = (e, index) => {
        //numero max estipulado é 5
        if (index <= 5) {
            e.preventDefault();

            this.state.fio.quantidades[index] = e.target.value;
            this.setState([...this.state.fio.quantidades])
        }

    }
    handleChangeAMP(e, index) {
        this.state.amperagens[index] = e.target.value;
        this.setState([...this.state.amperagens]);
    }

    handleCheckbox(e, index) {
        this.state.checkboxValue = e.target.value;
        this.setState([...this.state.checkboxValue]);
    }

    
    render() {
        return (

            <Card title="Cadastrar Motor">
                <Row>
                    <Col>
                        <FormGroup label="Marca">
                            <input name="marca" onChange={HandleInputChange} type="text" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Modelo">
                            <input name="modelo" onChange={HandleInputChange} type="text" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Ranhuras">
                            <input name="ranhuras" onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Rotação">
                            <input name="rotacao" onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup label="Peso">
                            <input name="peso" onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Potência">
                            <input name="potencia" onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Comprimento">
                            <input name="medidaInterna" onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Medida Externa">
                            <input name="medidaExterna" onChange={HandleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    {
                        this.state.fio.awgs.map((valor, index) => (
                            <Col className="col-md-2" key={index}>
                                <label>Awg {index + 1}</label>
                                <input className="form-control" type="number" value={valor} id={`awg${index + 1}`} onChange={(e) => this.handleChangeAWG(e, index)} />
                            </Col>


                        ))

                    }

                    <div className="col-md-2 mt-2 d-flex align-items-end">
                        <button className="p-button p-component p-button-rounded p-button-icon-only" title="Adicionar AWG/Quantidade" type='button' onClick={this.addInputs}>
                            <span className="p-button-icon p-c pi pi-plus"></span>
                        </button>
                    </div>

                </Row>
                <Row>
                    {

                        this.state.fio.quantidades.map((qtd, index) => (

                            <Col className="col-md-2" key={index}>
                                <label>Quantidade {index + 1}</label>
                                <input className="form-control" type="number" value={qtd} id={`qtd${index + 1}`} onChange={(e) => this.handleChangeQTD(e, index)} />
                            </Col>

                        ))

                    }

                    <div className="col-md-2 mt-2 d-flex align-items-end">
                        <button className="p-button p-component p-button-rounded p-button-danger p-button-icon-only" title="Remover AWG/Quantidade" type='button' onClick={this.removeInputs}>
                            <span className="p-button-icon p-c pi pi-minus"></span>
                        </button>
                    </div>

                </Row>
                <Row>
                    {

                        this.state.fio.espiras.map((esp, index) => (

                            <Col className="col-md-2" key={index}>
                                <label>Espiras {index + 1}</label>
                                <input className="form-control" type="number" value={esp} id={`esp${index + 1}`} onChange={(e) => this.handleChangeESP(e, index)} />
                            </Col>

                        ))

                    }

                    <div className="col-md-2 mt-2 d-flex align-items-end">
                        <button className="m-1 p-button p-component p-button-rounded p-button-icon-only" title="Adicionar Espiras" type='button' onClick={this.addInputsESP}>
                            <span className="p-button-icon p-c pi pi-plus"></span>
                        </button>
                        <button className="m-1 p-button p-component p-button-rounded p-button-danger p-button-icon-only" title="Remover Espiras" type='button' onClick={this.removeInputsESP}>
                            <span className="p-button-icon p-c pi pi-minus"></span>
                        </button>
                    </div>

                </Row>
                <Row>

                    {
                        this.state.amperagens.map((amp, index) => (

                            <Col className="col-md-2" key={index}>
                                <label>Amperagens {index + 1}</label>
                                <input className="form-control" type="number" value={amp} id={`amp${index + 1}`} onChange={(e) => this.handleChangeAMP(e, index)} />
                            </Col>

                        ))
                    }
                    <Col>
                        <FormGroup label="Ligação">
                            <input name="ligacao" onChange={HandleInputChange} type="text" className="form-control" />
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    {
                        this.state.voltagens.map((valor, index) => {
                            <Col className="col-md-2" key={index}>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value={this.state.checkboxValue[index]} onChange={(e) => this.handleCheckbox(e, index)} />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">{valor}</label>
                                </div>
                            </Col>
                        })
                    }
                    {console.log(this.state.checkboxValue[0])}

                    <Col>
                        <FormGroup label="Tensão">
                            <input className="form-control" disabled />
                        </FormGroup>
                    </Col>
                </Row>

                <button onClick={this.create} type="button" className="mt-2 btn btn-success"><span className="pi pi-check"></span> Cadastrar</button>


            </Card>

        )
    }
}

export default MotorRegister