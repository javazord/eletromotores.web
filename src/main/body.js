import React from "react"

const Body = (props) => {
    return (
        <div className="container mx-auto" style={{ width: '100%', height: '100vh' }}>
            {props.children}
        </div>
    )
}

export default Body;


