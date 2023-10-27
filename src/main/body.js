import React from "react"

export default function Body(props) {
    return (
        <div className="container container-sm container-md container-lg" style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {props.children}
        </div>

    )
}

