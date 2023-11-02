import React from "react";

const Card = () => {
    return (
        <div className="card">
            <h5 className="card-header">
                {this.props.title}
            </h5>
            <div className="card-body">
                {this.props.children}
            </div>

        </div>
    )
}


export default Card