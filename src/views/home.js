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
        motorService.getLastMotors().then((response) => setLastMotors(response.data))
    }, []);

    const motorsTemplate = (motor) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-2 px-3">
                <div className="mb-3">
                    <Image src={`data:${motor.imagem.tipo};base64,${motor.imagem.dados}`} loading="lazy" alt={motor.imagem.nome} width="100" height="80" preview />
                </div>
                <div>
                    <h4 className="mb-1">{motor.marca}</h4>
                    <h6 className="mt-0 mb-3">{motor.modelo}</h6>
                </div>
            </div>
        );
    };

    return (

        <><div>
            <h2>Bem Vindo! {authUser.login}</h2>
        </div>
            <div className="fixed-block">

                <div>
                    <p style={{ color: 'white' }}>Últimos Registros</p>
                    {lastMotors ? (
                        <div className="card">
                            <Carousel value={lastMotors} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                                autoplayInterval={3000} itemTemplate={motorsTemplate} />
                        </div>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>

            </div></>
    )

}