import { MotorService } from "../app/service/motor/motorService";
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Carousel } from 'primereact/carousel';
import { Image } from 'primereact/image';
import { Container, Row } from 'react-bootstrap';
import { Card } from 'primereact/card';
import ViewMotorDialog from "../views/motor/viewMotorDialog";
import { AuthContext } from "../main/authProvider";

const Home = () => {

    const [lastMotors, setLastMotors] = useState([]);
    const motorService = useMemo(() => new MotorService(), []);
    const { authUser } = useContext(AuthContext);
    const [motor, setMotor] = useState({});
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const onHide = () => {
        setShowConfirmDialog(false);
    };

    useEffect(() => {
        motorService.getLastMotors().then((response) => setLastMotors(response.data));
    }, [motorService]);

    const selectedMotor = (motor) => {
        setMotor(motor)
        setShowConfirmDialog(true)
    }

    const motorsTemplate = (motor) => {
        return (
            <>
                <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                    {
                        motor.imagem.dados ? (
                            <div className="mb-3">
                                <Image src={`data:${motor.imagem.tipo};base64,${motor.imagem.dados}`} loading="lazy" alt={motor.imagem.nome} width="100" height="100" preview />
                            </div>
                        ) : (
                            <div className="mb-3">
                                <Image src="/images/image.jpeg" width="100" height="100" />
                            </div>
                        )
                    }
                    <div style={{ cursor: 'pointer' }} onClick={() => selectedMotor(motor)}>
                        <h4 className="mb-1" >{motor.marca}</h4>
                        <h6 className="mt-0 mb-3">{motor.modelo}</h6>
                    </div>
                </div>

            </>

        );

    };

    return (
        <>
            <Container className="mb-5">
                <Row>
                    <h2 className="font text-white">Bem Vindo(a) {authUser.login}</h2>
                </Row>
                <Row>
                    <p className="font">Últimos Registros</p>
                    <div >
                        {lastMotors.length > 0 ? (
                            <div className="carousel-container">
                                <Card>
                                    <Carousel
                                        value={lastMotors}
                                        numVisible={3}
                                        numScroll={3}
                                        responsiveOptions={responsiveOptions}
                                        className="custom-carousel"
                                        circular
                                        autoplayInterval={3000}
                                        itemTemplate={motorsTemplate}
                                    />
                                </Card>
                            </div>
                        ) : (
                            <p>Sem Registros</p>
                        )}
                    </div>
                </Row>
            </Container>
            {showConfirmDialog && <ViewMotorDialog motor={motor} visible={showConfirmDialog} onHide={onHide} />}
        </>
    )



}
export default Home;