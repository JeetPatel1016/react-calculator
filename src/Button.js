import React from "react";

function Button(props) {
    const buttonClick = (e) => {
        const signal = {
            type: e.target.dataset.btntype,
            value: e.target.value,
        };
        props.onPress(signal);
    };
    return (
        <button
            className={props.className}
            value={props.children}
            onClick={buttonClick}
            data-btntype={props.btnType}>
            {props.children}
        </button>
    );
}

export default Button;
