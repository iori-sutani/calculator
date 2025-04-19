import React, { useState } from 'react'

export default function Calculator() {
 const [display, setDisplay] = useState("0");
 const [firstNum, setFirstNum] = useState(null);
 const [operator, setOperator] = useState(null);
  const [secondNum, setSecondNum] = useState(false);

 const reset = () => {
    setDisplay("0");
 }

 const getNum = (num) => {
  if (secondNum) {
      setDisplay(num);            
      setSecondNum(false);    
  } else {
      if (display === "0" && num === "0") return;
      if (display === "0") {
        setDisplay(num);
      } else {
        setDisplay(display + num);
      }
    }
 }

 const handleOperator = (op) => {
  setFirstNum(display);
  setOperator(op);
  setSecondNum(true);
 }

 const handleEqual = () => {
  if (firstNum === null || operator === null) return;
  const num1 = parseFloat(firstNum);
  const num2 = parseFloat(display);
  let result = 0;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Error";
      break;
    default:
      return;
  }

  setDisplay(String(result));
  setFirstNum(null);
  setOperator(null);
  setSecondNum(false);
 }

 const headNunbers = ['7', '8', '9'] ;
 const middoleNumbers = ['4', '5', '6'];
 const lastNumbers = ['1', '2', '3'] ;

  return (
  <div className="p-home">
    <div className="p-home-main">
      <div className="p-home-main__result">
        <div className="p-home-main__display">{display}</div>
      </div>

      <div className="p-home-main__calcu">
        <ul className="p-home-main__calcu-list">
          <li className="p-home-main__calcu-item"><button className="c-button c-button-gray" onClick={reset}>AC</button></li>
          <li className="p-home-main__calcu-item"><button className="c-button c-button-gray">±</button></li>
          <li className="p-home-main__calcu-item"><button className="c-button c-button-gray">%</button></li>
          <li className="p-home-main__calcu-item"><button className="c-button c-button-orange" onClick={() => handleOperator("/")}>&#247;</button></li>
          {headNunbers.map((num) => (
            <li className="p-home-main__calcu-item" key={num}>
              <button className="c-button" onClick={() => getNum(num)}>{num}</button>
            </li>
          ))}
          <li className="p-home-main__calcu-item"><button className="c-button c-button-orange" onClick={() => handleOperator("*")}>&#215;</button></li>
          {middoleNumbers.map((num) => (
            <li className="p-home-main__calcu-item" key={num}>
            <button className="c-button" onClick={() => getNum(num)}>{num}</button>
          </li>
          ))}
          <li className="p-home-main__calcu-item"><button className="c-button c-button-orange" onClick={() => handleOperator("-")}>&#8722;</button></li>

          {lastNumbers.map((num) => (
            <li className="p-home-main__calcu-item" key={num}>
            <button className="c-button" onClick={() => getNum(num)}>{num}</button>
          </li>
          ))}
          <li className="p-home-main__calcu-item"><button className="c-button c-button-orange" onClick={() => handleOperator("+")}>&#43;</button></li>

          <li className="p-home-main__calcu-item p-home-main__calcu-item">
            <button className="c-button"></button>
          </li>
          <li className="p-home-main__calcu-item p-home-main__calcu-item">
            <button className="c-button" onClick={() => getNum(0)}>0</button>
          </li>
          <li className="p-home-main__calcu-item"><button className="c-button">.</button></li>
          <li className="p-home-main__calcu-item">
            <button className="c-button c-button-orange" onClick={handleEqual}>&#61;</button>
          </li>
        </ul>
      </div>
    </div>
</div>
  )
}

