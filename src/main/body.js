import React from "react"

const Body = (props) => {
    return (
        <div className="container d-flex justify-content-center align-items-center p-2" style={{ height: '100vh' }}>
            {props.children}
        </div>

    )
}
export default Body;

