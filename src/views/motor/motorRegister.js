import React, { Fragment } from "react";
import MotorService from '../../app/service/motor/motorService'
import { Card } from "primereact/card";
import { showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import FormGroup from '../../components/grid/form-group'
import Col from "../../components/grid/col";
import Row from '../../components/grid/row'
import { Button } from 'primereact/button'
import HandleInputResetValues from '../../components/events/handleInputResetValues'
import Checkbox from "../../components/grid/checkbox";
import LocalStorageService from "../../app/localStorage";
import { AuthContext } from "../../main/authProvider";

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
        tensao: "",
        fio: {
            awgs: [],
            quantidades: [],
            espiras: [],
            peso: 0
        },
        voltagens: [],
        amperagens: [0, 0, 0, 0, 0],
        checkboxVolts: [127, 220, 380, 440, 760],
        indexAWG: 1,
        indexESP: 1
    }

    constructor() {
        super();
        this.service = new MotorService();
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleInputChangePeso = (event) => {
        this.setState({ ...this.state, peso: event.target.value })
    }
    handleInputChangePeso = (event) => {
        const { id, value } = event.target;
        this.setState(prevState => ({
            fio: {
                ...prevState.fio,
                [id]: value
            }
        }));
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
            this.setState({ awgs: [...this.state.fio.awgs, ""], quantidades: [...this.state.fio.quantidades, ""], indexAWG: this.state.indexAWG + 1 });

        }

    };

    removeInputsESP = () => {
        this.state.fio.espiras.pop()
        const espiras = [...this.state.fio.espiras, ""]
        this.setState({ espiras: espiras, indexESP: this.state.indexESP - 1 })
    }

    removeInputs = () => {
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

    handleChangeAMP = (e, index) => {
        this.state.amperagens[index] = e.target.value;
        this.setState([...this.state.amperagens]);
    }

    handleChangeESP = (e, index) => {
        this.state.fio.espiras[index] = e.target.value;
        this.setState([...this.state.fio.espiras]);
    }

    handleCheckbox = (e) => {
        var updatedList = [...this.state.voltagens].map(str => { return parseInt(str, 10) });

        if (e.target.checked) {
            updatedList = [...this.state.voltagens, e.target.value];
            this.validateCheckbox(updatedList.map(str => { return parseInt(str, 10) }))
        } else {
            updatedList.splice(this.state.voltagens.indexOf(e.target.value), 1);
            this.validateCheckbox(updatedList)
        }
        this.setState({ voltagens: updatedList });
    }

    validateCheckbox = (updatedList) => {

        if (updatedList.includes(220) && updatedList.includes(380) && updatedList.includes(440) && updatedList.includes(760)) {
            updatedList.includes(127) ? this.setState({ tensao: "" }) : this.setState({ tensao: "TRIFASICO" })

        } else if (updatedList.includes(127) && updatedList.includes(220)) {
            updatedList.includes(380) || updatedList.includes(440) || updatedList.includes(760) ? this.setState({ tensao: "" }) : this.setState({ tensao: "MONOFASICO" })

        } else {
            this.setState({ tensao: "" })
        }
    }

    create = () => {

        const { marca, modelo, ranhuras, rotacao, ligacao, potencia, medidaInterna, medidaExterna, tensao, fio, voltagens, amperagens } = this.state

        const motor = {
            marca,
            modelo,
            ranhuras: parseInt(ranhuras),
            rotacao: parseInt(rotacao),
            ligacao,
            potencia: parseInt(potencia),
            medidaInterna: parseInt(medidaInterna),
            medidaExterna: parseInt(medidaExterna),
            tensao,
            fio: {
                awgs: fio.awgs.map(str => { return parseInt(str, 10) }),
                quantidades: fio.quantidades.map(str => { return parseInt(str, 10) }),
                espiras: fio.espiras.map(str => { return parseInt(str, 10) }),
                peso: parseInt(fio.peso),
            },
            voltagens: voltagens.map(str => { return parseInt(str, 10) }),
            amperagens: amperagens.map(str => { return parseFloat(str, 10) }),
            usuario: this.context.authUser.id
        }

        this.service.save(motor)
            .then(response => {
                showMessageSuccess('Motor cadastrado com sucesso!')
                HandleInputResetValues()
            }).catch(erro => {
                showMessageError(erro.response.data)
            })
    }

    render() {
        return (

            <Card title={"Cadastrar Motor"} >
                <Row>
                    <Col>
                        <FormGroup label="Marca">
                            <input name="marca" value={this.state.marca} onChange={this.handleInputChange} type="text" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Modelo">
                            <input name="modelo" value={this.state.modelo} onChange={this.handleInputChange} type="text" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Ranhuras">
                            <input name="ranhuras" value={this.state.ranhuras} onChange={this.handleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Rotação">
                            <input name="rotacao" value={this.state.rotacao} onChange={this.handleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup label="Peso">
                            <input id="peso" onChange={this.handleInputChangePeso} value={this.state.fio.peso} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Potência">
                            <input name="potencia" value={this.state.potencia} onChange={this.handleInputChange} type="number" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Comprimento">
                            <input name="medidaInterna" value={this.state.medidaInterna} onChange={this.handleInputChange} type="number" min="1" max="100" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup label="Medida Externa">
                            <input name="medidaExterna" value={this.state.medidaExterna} onChange={this.handleInputChange} type="number" className="form-control" />
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
                        <Button icon="pi pi-plus" rounded outlined severity="info" aria-label="Adicionar" title="Adicionar AWG/Quantidade" size="sm" onClick={this.addInputs} />
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
                        <Button icon="pi pi-minus" rounded outlined severity="danger" aria-label="Adicionar" title="Remover AWG/Quantidade" size="sm" onClick={this.removeInputs} />
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
                        <Button icon="pi pi-plus" rounded outlined severity="info" title="Adicionar Espiras" onClick={this.addInputsESP} />
                        <Button icon="pi pi-minus" rounded outlined severity="danger" title="Remover Espiras" onClick={this.removeInputsESP} />
                    </div>

                </Row>
                <Row>
                    <Row>
                        {
                            this.state.amperagens.map((amp, index) => (

                                <Col key={index}>
                                    <label>Amperagem {index + 1}</label>
                                    <input className="form-control" type="number" value={amp} id={`amp${index + 1}`} onChange={(e) => this.handleChangeAMP(e, index)} />
                                </Col>

                            ))
                        }
                    </Row>
                    <Row>
                        {
                            this.state.checkboxVolts.map((item, index) => (
                                <Col key={item}>
                                    <label>Volagem {index + 1}</label>
                                    <Checkbox label={`${item}v`} name={item} value={item} onChange={(e) => this.handleCheckbox(e)} />
                                </Col>
                            ))
                        }
                    </Row>
                </Row>

                <Row>
                    <Col className="col-md-3">
                        <FormGroup label="Tensão">
                            <input className="form-control" name="tensao" value={this.state.tensao} disabled />
                        </FormGroup>
                    </Col>
                    <Col className="col-md-4">
                        <FormGroup label="Ligação">
                            <input name="ligacao" value={this.state.ligacao} onChange={this.handleInputChange} type="text" className="form-control" />
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col className="d-flex justify-content-end mt-2">
                        <Button onClick={this.create} label="Cadastrar" icon="pi pi-check" size="sm"/>
                    </Col>
                </Row>

            </Card>

        )

    }

}
MotorRegister.contextType = AuthContext;
export default MotorRegister