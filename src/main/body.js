import React from "react"

export default function Body(props) {


    return (
        <div className="site-section">
            <div className="container">
                <div className="row justify-content-center">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

