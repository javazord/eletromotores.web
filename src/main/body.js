import React from "react"

export default function Body(props) {


    return (
        <div className="container">
            <div className="child">
                    {props.children}

            </div>
        </div>
    )
}

