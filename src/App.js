import './App.css';
import { useState } from 'react';

function App() {
  const [answer, setAnswer] = useState("0");
  const [expression, setExpression] = useState("");
  const et = expression.trim(); //remove whitespace

  const isOperator = (symbol) => {
  return /[-+*/]/.test(symbol);
  };

  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      // split by operators and get the last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if the last number already has a decimal, don't add another
      if (lastNumber.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };
  
  const calculate = () => {
    // if the last character is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row use the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];
  
    // go through parts backward
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression).toString());
    } else {
      setAnswer(eval(newExpression).toString());
    }
    setExpression("");
  };

  return (
    <div className="container">
      <h1>Calculator Application</h1>
      <div id="calculator">
      <div id="display" style={{textAlign: "right"}}>
        <div id="answer">{answer}</div>
        <div id="expression">{expression}</div>
      </div>

      <button id="clear" onClick={() => buttonPress("clear")}className="red">AC</button>
      <button id="negative" onClick={(handleNumber) => buttonPress("negative")}className="light-grey">+/-</button>
      <button id="percentage" onClick={() => buttonPress("percentage")}className="light-grey">%</button>
      <button id="divide" onClick={() => buttonPress("/")}className="yellow">/</button>
      <button id="seven" onClick={() => buttonPress("7")}className="dark-grey">7</button>
      <button id="eight" onClick={(handleNumber) => buttonPress("8")}className="dark-grey">8</button>
      <button id="nine" onClick={(handleNumber) => buttonPress("9")}className="dark-grey">9</button>
      <button id="multiply" onClick={() => buttonPress("*")}className="yellow">x</button>
      <button id="four" onClick={() => buttonPress("4")}className="dark-grey">4</button>
      <button id="five" onClick={() => buttonPress("5")}className="dark-grey">5</button>
      <button id="six" onClick={() => buttonPress("6")}className="dark-grey">6</button>
      <button id="subtract" onClick={() => buttonPress("-")}className="yellow">-</button>
      <button id="one" onClick={() => buttonPress("1")}className="dark-grey">1</button>
      <button id="two" onClick={() => buttonPress("2")}className="dark-grey">2</button>
      <button id="three" onClick={() => buttonPress("3")}className="dark-grey">3</button>
      <button id="add" onClick={() => buttonPress("+")}className="yellow">+</button>
      <button id="zero" onClick={() => buttonPress("0")}className="dark-grey">0</button>
      <button id="decimal" onClick={() => buttonPress(".")}className="dark-grey">.</button>
      <button id="equals" onClick={() => buttonPress("=")}className="blue">=</button>
    </div>
    </div>
  );
};

export default App;
