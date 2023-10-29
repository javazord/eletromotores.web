import React from "react";

export default function HandleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
}