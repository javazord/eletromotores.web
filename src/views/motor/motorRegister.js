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
        amperagens: [],
        usuario: {},
        index: 1
    }

    constructor() {
        super();
        this.service = new MotorService();
    }

    addInputs = (e) => {
        if (this.state.index <= 5) {
            e.preventDefault();

            this.state.fio.awgs.push("")
            this.state.fio.quantidades.push("")
            const awgs = [...this.state.fio.awgs, ""]
            const quantidades = [...this.state.fio.quantidades, ""]
            this.setState({ awgs: awgs, quantidades: quantidades,index: this.state.index + 1 });

        }

    };

    removeInputs = () => {
        //this.setState([...this.state.fio.awgs.filter((_, index) => index != posicao)])
        this.state.fio.awgs.pop()
        this.state.fio.quantidades.pop()
        const awgs = [...this.state.fio.awgs, ""]
        const quantidades = [...this.state.fio.quantidades, ""]
        this.setState({ awgs: awgs, quantidades: quantidades, index: this.state.index - 1 })
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
                        <FormGroup label="Ligação">
                            <input name="ligacao" onChange={HandleInputChange} type="text" className="form-control" />
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
                        <button className="p-button p-component p-button-rounded p-button-icon-only" type='button' onClick={this.addInputs}>
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
                        <button className="p-button p-component p-button-rounded p-button-danger p-button-icon-only" type='button' onClick={this.removeInputs}>
                            <span className="p-button-icon p-c pi pi-minus"></span>
                        </button>
                    </div>

                </Row>

                <button onClick={this.create} type="button" className="mt-2 btn btn-success">Cadastrar</button>


            </Card>


        )
    }
}

export default MotorRegister