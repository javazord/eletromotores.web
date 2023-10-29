import { render } from "@testing-library/react";
import { AuthContext } from "../main/authProvider";
import { MotorService } from "../app/service/motor/motorService";
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { useContext } from "react";
import { Image } from 'primereact/image';
import { data } from "jquery";
import { Col, Row } from "reactstrap";
import { Card } from 'primereact/card';


export default function Home() {

    const [lastMotors, setLastMotors] = useState([]);
    const { authUser } = useContext(AuthContext);
    const motorService = new MotorService();

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
    }, []);

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
                <div className="welcome-section">
                    <h2 className="font-home">Bem vindo {authUser.login}!</h2>
                </div>
                <p className="font-home">Últimos Registros</p>
                <div className="text-center">
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