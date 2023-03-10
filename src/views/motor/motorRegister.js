import React from "react";
import MotorService from '../../app/service/motor/motorService';
import { Card } from "primereact/card";
import { Col, Row } from 'reactstrap';
import { Button } from 'primereact/button';
import HandleInputResetValues from '../../components/events/handleInputResetValues';
import Checkbox from "../../components/grid/checkbox";
import { AuthContext } from "../../main/authProvider";
import { Input, Label } from "reactstrap";
import { validate } from "./motorAttributes";
import { useToast } from "../../components/toast";
const { showMessageAlert, showMessageError, showMessageSuccess } = useToast();

export default class MotorRegister extends React.Component {

    state = {
        marca: "",
        modelo: "",
        ranhuras: 0,
        rotacao: 0,
        ligacao: "",
        potencia: 0,
        comprimento: 0,
        medidaExterna: 0,
        tensao: "",
        empresa: "",
        fio: {
            awgs: [],
            quantidades: [],
            espiras: [],
            peso: 0
        },
        voltagens: [],
        amperagens: [],
        checkboxVolts: [127, 220, 380, 440, 760],
        inputsAmps: [],
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
        const { value, checked } = e.target;
        const { voltagens } = this.state;
        let checkboxVolts = this.state.checkboxVolts;
        let amperagens = this.state.amperagens;
        let inputsAmps = this.state.inputsAmps;
        let updatedList;

        if (checked && !voltagens.includes(value)) {
            updatedList = [...voltagens, value];
        } else if (!checked) {
            const index = voltagens.findIndex(val => val === value);
            updatedList = [...voltagens.slice(0, index), ...voltagens.slice(index + 1)];
        } else {
            updatedList = voltagens;
        }

        this.setState({ voltagens: updatedList }, () => {
            this.validateCheckbox(updatedList.map(str => parseInt(str, 10)));
        });


        if (checked) {
            const index = inputsAmps.length + 1;
            inputsAmps.push(
                <><Label>Amperagem</Label>
                    <Input className="form-control" type="number" onChange={(e) => this.handleChangeAMP(e, index)} bsSize="sm" /></>
            );
        } else {
            const index = checkboxVolts.indexOf(value);
            if (index > -1) {
                checkboxVolts.splice(index, 1);
                inputsAmps.splice(index, 1);
                //index = index - 1;

            }
            inputsAmps.pop()
        }

        this.setState({ checkboxVolts, amperagens, inputsAmps });
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

    resetState = () => {
        this.setState({
            marca: "",
            modelo: "",
            ranhuras: 0,
            rotacao: 0,
            ligacao: "",
            potencia: 0,
            comprimento: 0,
            medidaExterna: 0,
            tensao: "",
            empresa: "",
            fio: {
                awgs: [],
                quantidades: [],
                espiras: [],
                peso: 0
            },
            voltagens: [],
            amperagens: [],
            checkboxVolts: [127, 220, 380, 440, 760],
            inputsAmps: [],
            indexAWG: 1,
            indexESP: 1
        })
    }

    create = () => {

        const { marca, modelo, ranhuras, rotacao, ligacao, potencia, comprimento, medidaExterna, tensao, fio, voltagens, amperagens, empresa } = this.state

        const motor = {
            marca,
            modelo,
            ranhuras: parseInt(ranhuras),
            rotacao: parseInt(rotacao),
            ligacao,
            potencia: parseInt(potencia),
            comprimento: parseInt(comprimento),
            medidaExterna: parseInt(medidaExterna),
            tensao,
            empresa,
            fio: {
                awgs: fio.awgs.map(str => { return parseInt(str, 10) }),
                quantidades: fio.quantidades.map(str => { return parseInt(str, 10) }),
                espiras: fio.espiras.map(str => { return parseInt(str, 10) }),
                peso: parseInt(fio.peso),
            },
            voltagens: voltagens.sort().map(str => { return parseInt(str, 10) }),
            amperagens: amperagens.map(str => { return parseFloat(str, 10) }),
            usuario: this.context.authUser.id
        }
        try {
            validate(motor);
        } catch (error) {
            const msgs = error.mensagens;
            msgs.forEach(msg => showMessageAlert(msg));
            return false;
        }
        this.service.save(motor)
            .then(response => {
                showMessageSuccess("Motor registrado com sucesso!")
                HandleInputResetValues()
                this.resetState()
            }).catch(erro => {
                showMessageError(erro.response.data)
            })
    }

    render() {
        return (

            <Card title={"Cadastrar Motor"} >
                <Row>
                    <Col>
                        <Label>Marca <span>*</span></Label>
                        <Input name="marca" value={this.state.marca} onChange={this.handleInputChange} type="text" className="form-control" bsSize="sm" />
                    </Col>
                    <Col>
                        <Label>Modelo</Label>
                        <Input name="modelo" value={this.state.modelo} onChange={this.handleInputChange} type="text" className="form-control" bsSize="sm" />
                    </Col>
                    <Col>
                        <Label>Ranhuras <span>*</span></Label>
                        <Input name="ranhuras" value={this.state.ranhuras} onChange={this.handleInputChange} type="number" className="form-control" bsSize="sm" />
                    </Col>
                    <Col>
                        <Label>Rotação</Label>
                        <Input name="rotacao" value={this.state.rotacao} onChange={this.handleInputChange} type="number" className="form-control" bsSize="sm" />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Label>Peso <span>*</span></Label>
                        <Input id="peso" onChange={this.handleInputChangePeso} value={this.state.fio.peso} type="number" className="form-control" bsSize="sm" />
                    </Col>
                    <Col>
                        <Label>Potência</Label>
                        <Input name="potencia" value={this.state.potencia} onChange={this.handleInputChange} type="number" className="form-control" bsSize="sm" />
                    </Col>
                    <Col>
                        <Label>Comprimento <span>*</span></Label>
                        <Input name="comprimento" value={this.state.comprimento} onChange={this.handleInputChange} type="number" min="1" max="100" className="form-control" bsSize="sm" />
                    </Col>
                    <Col>
                        <Label>M. Externa <span>*</span></Label>
                        <Input name="medidaExterna" value={this.state.medidaExterna} onChange={this.handleInputChange} type="number" className="form-control" bsSize="sm" />
                    </Col>
                </Row>

                <Row>
                    {
                        this.state.fio.awgs.map((valor, index) => (
                            <Col className="col-md-2" key={index}>
                                <Label>Awg <span>*</span></Label>
                                <Input className="form-control" type="number" value={valor} id={`awg${index + 1}`} onChange={(e) => this.handleChangeAWG(e, index)} bsSize="sm" />
                            </Col>
                        ))

                    }

                    <Col className="col-md-2 mt-2 d-flex align-items-end">
                        <Button icon="pi pi-plus" rounded raised severity="info" aria-label="Adicionar" title="Adicionar AWG/Quantidade" size="sm" onClick={this.addInputs} />
                    </Col>
                </Row>

                <Row>
                    {

                        this.state.fio.quantidades.map((qtd, index) => (

                            <Col className="col-md-2" key={index}>
                                <Label>Quantidade <span>*</span></Label>
                                <Input className="form-control" type="number" value={qtd} id={`qtd${index + 1}`} onChange={(e) => this.handleChangeQTD(e, index)} bsSize="sm" />
                            </Col>

                        ))

                    }

                    <Col className="col-md-2 mt-2 d-flex align-items-end">
                        <Button icon="pi pi-minus" rounded raised severity="danger" aria-label="Adicionar" title="Remover AWG/Quantidade" size="sm" onClick={this.removeInputs} />
                    </Col>
                </Row>
                <Row>
                    {

                        this.state.fio.espiras.map((esp, index) => (

                            <Col className="col-md-2" key={index}>
                                <Label>Espiras <span>*</span></Label>
                                <Input className="form-control" type="number" value={esp} id={`esp${index + 1}`} onChange={(e) => this.handleChangeESP(e, index)} bsSize="sm" />
                            </Col>

                        ))

                    }
                    <Col className="col-2 mt-2 d-flex align-items-end" >
                        <Button className="me-1" icon="pi pi-plus" rounded raised severity="info" title="Adicionar Espiras" onClick={this.addInputsESP} size="sm" />
                        <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" title="Remover Espiras" onClick={this.removeInputsESP} size="sm" />
                    </Col>

                </Row>
                <Row className="mt-2">
                    {
                        this.state.checkboxVolts.map((item, index) => (
                            <Col key={item}>
                                <Label>Voltagem <span>*</span></Label>
                                <Checkbox label={`${item}v`} name={item} value={item} onChange={(e) => this.handleCheckbox(e)} />
                                {this.state.inputsAmps[index]}
                            </Col>
                        ))
                    }

                </Row>

                <Row>
                    <Col className="col-md-3">
                        <Label>Tensão <span>*</span></Label>
                        <Input className="form-control" name="tensao" value={this.state.tensao} disabled bsSize="sm" />
                    </Col>
                    <Col className="col-md-5">
                        <Label>Ligação <span>*</span></Label>
                        <Input name="ligacao" value={this.state.ligacao} onChange={this.handleInputChange} type="text" className="form-control" bsSize="sm" />
                    </Col>
                    <Col className="col-md-4">
                        <Label>Empresa <span>*</span></Label>
                        <select name="empresa" value={this.state.empresa} onChange={this.handleInputChange} className="form-select form-select-sm" >
                            <option value="ARCELOR">Arcelor</option>
                            <option value="RIVELLI">Rivelli</option>
                            <option value="DOWCORNING">Dow Corning</option>
                            <option value="PARTICULAR">Particular</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end mt-2">
                        <Button onClick={this.create} label="Cadastrar" icon="pi pi-check" size="sm" />
                    </Col>
                </Row>

            </Card>

        )

    }

}
MotorRegister.contextType = AuthContext;
