import { render } from "@testing-library/react";
import React, { useState } from "react";
import { AuthContext } from "../main/authProvider";
import { InputNumber } from 'primereact/inputnumber';
import { useContext } from "react";

export default function Home() {

    const { authUser } = useContext(AuthContext);
    const [count, setCount] = useState(0);

    return (
        <div>
            <h3>Bem Vindo {authUser.login}</h3>

        </div>
    );




}