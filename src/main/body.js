import React from "react"

export default function Body(props) {


    return (
        <div className="page">
            <div className="container container-sm container-md container-lg">
                {props.children}
            </div>
        </div>

    )
}

