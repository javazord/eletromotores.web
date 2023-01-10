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
        usuario: {}
    }

    constructor() {
        super();
        this.service = new MotorService();
    }

    addAWG = (e) => {
        e.preventDefault();

        this.state.fio.awgs.push("")
        this.state.fio.quantidades.push("")
        const awgs = [...this.state.fio.awgs, ""]
        const quantidades = [...this.state.fio.quantidades, ""]
        this.setState({ awgs: awgs, quantidades: quantidades });
    };

    //pega o valor do input
    handleChangeAWG = (e, index) => {
        e.preventDefault();

        this.setState((prevState) => {
            this.state.fio.awgs[index] = parseInt(e.target.value);
            this.state.fio.quantidades[index] = parseInt(e.target.value)
            const copy = [...prevState.fio.awgs, ...prevState.fio.quantidades];
            return { ...prevState, copy };
        });
    }
    //pega o valor do input
    handleChangeQTD = (e, index) => {
        e.preventDefault();

        this.setState((prevState) => {
            this.state.fio.quantidades[index] = parseInt(e.target.value);
            const copy = [...prevState.fio.quantidades];
            return { ...prevState, copy };
        });
    }

    renderInputAWG = () => {

        this.state.fio.awgs.map((valor, index) => (

            <div className='col' key={valor}>
                <label>Awg {index + 1}</label>
                <input type="number" value={valor} id='valores' onChange={(e) => this.handleChangeNota(e, index)} />
            </div>

        ))

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
                                <input className="form-control" type="number" value={valor} onChange={(e) => this.handleChangeAWG(e, index)} />
                            </Col>


                        ))

                    }

                    <div className="col-md-2 mt-2 d-flex align-items-end">
                        <button className="p-button p-component p-button-rounded p-button-icon-only" type='button' onClick={this.addAWG}>
                            <span className="p-button-icon p-c pi pi-plus"></span>
                        </button>
                    </div>

                </Row>
                <Row>
                    {

                        this.state.fio.quantidades.map((qtd, index) => (

                            <Col className="col-md-2" key={qtd}>
                                <label>Quantidade {index + 1}</label>
                                <input className="form-control" type="number" value={qtd} onChange={(e) => this.handleChangeQTD(e, index)} />
                            </Col>

                        ))

                    }

                </Row>






                <button onClick={this.create} type="button" className="btn btn-success">Cadastrar</button>


            </Card>


        )
    }
}

export default MotorRegister