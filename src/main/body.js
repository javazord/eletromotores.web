import React from "react"
import Col from "../components/grid/col"
import Row from "../components/grid/row"

export default function Body(props) {


    return (
        <div className="d-flex align-items-center" style={{ height: "92vh" }}>
            <div className="container">
                {props.children}
            </div>
        </div>

    )
}

