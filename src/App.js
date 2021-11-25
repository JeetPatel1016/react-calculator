import React, { useState } from "react";
import "./style.css";
import Button from "./Button";

export default function App() {
    const [prevDisplay, setPrevDisplay] = useState("");
    const [currentDisplay, setCurrentDisplay] = useState("");
    const [newEntry, setNewEntry] = useState(false);

    const evaluate = (str, symbol) => {
        let [a, b] = str.split(symbol);
        a = parseFloat(a);
        b = parseFloat(b);
        switch (symbol) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "÷":
                return Math.round((a / b) * 100) / 100;
            default:
                break;
        }
    };
    const digitHandler = (digit) => {
        //Check for newEntry
        if (newEntry === true) {
            setCurrentDisplay("");
            setNewEntry("false");
        }
        //Curb leading zeros
        if (currentDisplay === "0" && digit === 0) {
            setCurrentDisplay(currentDisplay);
        } else if (digit === "." && currentDisplay.includes(".")) {
            setCurrentDisplay(currentDisplay);
        } else {
            setCurrentDisplay((prev) => prev + digit);
        }
    };
    const operationHandler = (operation) => {
        // if no input, don't append operator
        if (!currentDisplay) {
            setCurrentDisplay(currentDisplay);
        }
        // If operand present append and push to prevDisplay, also prepare evaluate if new operand to be added
        if (currentDisplay && !prevDisplay) {
            if (operation === "=") {
                setCurrentDisplay(currentDisplay);
                setNewEntry(true);
            } else {
                setPrevDisplay(currentDisplay + operation);
                setCurrentDisplay("");
            }
        }
        //If no current data but want to change operation
        if (!currentDisplay && prevDisplay) {
            if (operation === "=") {
                setCurrentDisplay(prevDisplay.slice(0, prevDisplay.length - 1));
                setPrevDisplay("");
                setNewEntry(true);
            } else {
                setPrevDisplay(
                    (prev) => prev.slice(0, prev.length - 1) + operation
                );
            }
        }
        //If both operands present but add even more operands
        if (currentDisplay && prevDisplay) {
            const result = evaluate(
                prevDisplay + currentDisplay,
                prevDisplay.slice(prevDisplay.length - 1)
            );
            if (operation === "=") {
                setCurrentDisplay(result + "");
                setPrevDisplay("");
                setNewEntry(true);
            } else {
                setPrevDisplay(result + operation);
                setCurrentDisplay("");
            }
        }
    };
    const clearHandler = (value) => {
        if (value === "AC") {
            setPrevDisplay("");
            setCurrentDisplay("");
        } else if (value === "DEL") {
            setCurrentDisplay("");
        }
    };
    const buttonHandler = (data) => {
        // console.log(data);
        const { type, value } = data;
        switch (type) {
            case "CLEAR":
                //lOGIC TO CLEAR SCREEN BASED ON VALUE
                clearHandler(value);
                break;

            case "OPERATION":
                //lOGIC TO PERFORM OPERATION
                operationHandler(value);
                break;

            case "DIGIT":
                //lOGIC TO ENTER DIGITS
                digitHandler(value);
                break;

            default:
                break;
        }
    };
    return (
        <div className='calculator-wrap'>
            <div className='display'>
                <div className='prev-display'>{prevDisplay}</div>
                <div className='current-display'>{currentDisplay}</div>
            </div>
            {/* first row  */}
            <Button
                className='span-2 clear'
                onPress={buttonHandler}
                btnType='CLEAR'>
                AC
            </Button>
            <Button className='clear' btnType='CLEAR' onPress={buttonHandler}>
                DEL
            </Button>
            <Button
                className='operation'
                btnType='OPERATION'
                onPress={buttonHandler}>
                ÷
            </Button>
            {/* second row  */}
            <Button onPress={buttonHandler} btnType='DIGIT'>
                1
            </Button>
            <Button onPress={buttonHandler} btnType='DIGIT'>
                2
            </Button>
            <Button onPress={buttonHandler} btnType='DIGIT'>
                3
            </Button>
            <Button
                className='operation'
                onPress={buttonHandler}
                btnType='OPERATION'>
                *
            </Button>
            {/* third row  */}
            <Button onPress={buttonHandler} btnType='DIGIT'>
                4
            </Button>
            <Button onPress={buttonHandler} btnType='DIGIT'>
                5
            </Button>
            <Button onPress={buttonHandler} btnType='DIGIT'>
                6
            </Button>
            <Button
                className='operation'
                onPress={buttonHandler}
                btnType='OPERATION'>
                -
            </Button>
            {/* fourth row  */}
            <Button onPress={buttonHandler} btnType='DIGIT'>
                7
            </Button>
            <Button onPress={buttonHandler} btnType='DIGIT'>
                8
            </Button>
            <Button onPress={buttonHandler} btnType='DIGIT'>
                9
            </Button>
            <Button
                className='operation'
                onPress={buttonHandler}
                btnType='OPERATION'>
                +
            </Button>
            {/* fifth row  */}
            <Button className='span-2' onPress={buttonHandler} btnType='DIGIT'>
                0
            </Button>
            <Button onPress={buttonHandler} btnType='DIGIT'>
                .
            </Button>
            <Button
                className='operation'
                onPress={buttonHandler}
                btnType='OPERATION'>
                =
            </Button>
        </div>
    );
}
