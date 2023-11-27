import { MotorService } from "../app/service/motor/motorService";
import React, { useState, useEffect, useMemo } from 'react';
import { Carousel } from 'primereact/carousel';
import { Image } from 'primereact/image';
import { Row } from "reactstrap";
import { Card } from 'primereact/card';

const Home = () => {

    const [lastMotors, setLastMotors] = useState([]);
    const motorService = useMemo(() => new MotorService(), []);

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

    useEffect(() => {
        motorService.getLastMotors().then((response) => setLastMotors(response.data));
    }, [motorService]);

    const motorsTemplate = (motor) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                {
                    motor.imagem.dados ? (
                        <div className="mb-3">
                            <Image src={`data:${motor.imagem.tipo};base64,${motor.imagem.dados}`} loading="lazy" alt={motor.imagem.nome} width="100" height="100" preview />
                        </div>
                    ) : (
                        <div className="mb-3">
                            <p>Sem imagem</p>
                        </div>
                    )
                }
                <div>
                    <h4 className="mb-1">{motor.marca}</h4>
                    <h6 className="mt-0 mb-3">{motor.modelo}</h6>
                </div>
            </div>
        );
    };

    return (

        <>
            <Row>
                <p>Últimos Registros</p>
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
                        <p>Carregando...</p>
                    )}
                </div>
            </Row>
        </>
    )

}
export default Home;