import React from "react"

export default function Body(props) {
    return (
        <div className="container d-flex justify-content-center align-items-center p-2" style={{ height: '100vh' }}>
            {props.children}
        </div>

    )
}

