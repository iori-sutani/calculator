import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'; 
import Button from './Button';
import Display from './Display';

const fetchCalculations = async () => {
  try {
    const q = query(collection(db, "calculations"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  }
  catch (e) {
    console.error("データの取得に失敗しました", e);
    return [];
  }
};

const saveResultToFirestore = async (expression, result) => {
  try {
    await addDoc(collection(db, "calculations"), {
      expression,
      result,
      createdAt: new Date()
    });
  } catch (e) {
    console.error("データの取得に失敗しました", e);
  }
};

export default function Calculator() {
 const [display, setDisplay] = useState("0");
 const [firstNum, setFirstNum] = useState(null);
 const [operator, setOperator] = useState(null);
  const [secondNum, setSecondNum] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await fetchCalculations();
      setHistory(data);
    }
    loadHistory();
  }, []);

 const reset = () => {
    setDisplay("0");
 }

 const getNum = (num) => {
  if (secondNum) {
      setDisplay(num);            
      setSecondNum(false);    
  } else {
      if (display === "0" && num === 0) return;
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

 const inputDot = () => {
  if (display.includes(".")) return;
  setDisplay(display + ".");
 }

 const handlePercent = () => {
  const num = parseFloat(display);
  const result = num / 100;
  setDisplay(String(result)); 
 }

 const handleToggleSign = () => {
  if (display === "0") return;

  const num = parseFloat(display);
  const result = num * -1;
  setDisplay(String(result));
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

  saveResultToFirestore(`${firstNum} ${operator} ${display}`, result);

  setDisplay(String(result));
  setFirstNum(null);
  setOperator(null);
  setSecondNum(false);
 }

 const playClickSound = () => {
  const audio = new Audio('/sounds/voice.mp3'); 
  audio.play();
}

 const headNunbers = ['7', '8', '9'] ;
 const middoleNumbers = ['4', '5', '6'];
 const lastNumbers = ['1', '2', '3'] ;

  return (
  <div className="p-home">
    <div className="p-home-main">
      <Display value={display} />

      <div className="p-home-main__calcu">
        <ul className="p-home-main__calcu--list">
          <li className="p-home-main__calcu--item">
            <Button
              label="AC" 
              className="c-button-gray"
              onClick={reset}
             />
          </li>
          <li className="p-home-main__calcu--item">
            <Button
              label="+/-" 
              className="c-button-gray"
              onClick={handleToggleSign}
            />
          </li>
          <li className="p-home-main__calcu--item">
            <Button
              label="%" 
              className="c-button-gray"
              onClick={handlePercent}
             />
          </li>
          <li className="p-home-main__calcu--item">
            <Button
              label="&#247;" 
              className="c-button-orange"
              onClick={() => handleOperator("/")}
            />
          </li>
          {headNunbers.map((num) => (
            <li className="p-home-main__calcu--item" key={num}>
              <Button label={num} onClick={() => getNum(num)} />
            </li>
          ))}
          <li className="p-home-main__calcu--item">
            <Button
              label="&#215;" 
              className="c-button-orange"
              onClick={() => handleOperator("*")}
          />
          </li>
          {middoleNumbers.map((num) => (
            <li className="p-home-main__calcu--item" key={num}>
              <Button label={num} onClick={() => getNum(num)} />
          </li>
          ))}
          <li className="p-home-main__calcu--item">
          <Button
              label="&#8722;" 
              className="c-button-orange"
              onClick={() => handleOperator("-")}
          />
          </li>

          {lastNumbers.map((num) => (
            <li className="p-home-main__calcu--item" key={num}>
             <Button label={num} onClick={() => getNum(num)} />
          </li>
          ))}
          <li className="p-home-main__calcu--item">
            <Button
                label="&#43;" 
                className="c-button-orange"
                onClick={() => handleOperator("+")}
            />
          </li>

          <li className="p-home-main__calcu--item">
            <button className="c-button"></button>
          </li>
          <li className="p-home-main__calcu--item">
            <button className="c-button" onClick={() => getNum(0)}>0</button>
          </li>
          <li className="p-home-main__calcu--item"><button className="c-button" onClick={inputDot}>.</button></li>
          <li className="p-home-main__calcu--item">
            <Button
                label="&#61;" 
                className="c-button-orange"
                onClick={() => {handleEqual(); playClickSound()}}
            />
          </li>
        </ul>
      </div>
    </div>
</div>
  )
}

