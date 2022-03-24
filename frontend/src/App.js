import "./App.css";
import { useState } from "react";

function App() {
  return (
    <div className="App flex h-screen flex-col justify-center items-center bg-blue-900">
      <Calculator />
    </div>
  );
}

function Calculator() {
  const [expression, setExpression] = useState("");

  const buttonPress = (val) => {
    setExpression(expression + val);
  };

  const clear = () => {
    setExpression("");
  };

  const deleteChar = () => {
    setExpression(expression.slice(0, -1));
  };

  const evaluate = (expression) => {
    expression = expression.replaceAll("/", "d");
    fetch(`https://studica-calculator.herokuapp.com/eval/${expression}`)
      .then((response) => response.json())
      .then((data) => setExpression(data))
      .catch(() => setExpression("Failed to reach server"));
  };

  const NormalButton = (props) => {
    const value = props.value;
    return (
      <div
        className="border border-gray-700 flex justify-center items-center cursor-pointer hover:bg-slate-300"
        onClick={() => buttonPress(value)}
      >
        {value}
      </div>
    );
  };

  return (
    <div className="w-10/12 h-64 flex flex-col justify-center items-center">
      <div className="bg-slate-50 w-5/6 md:w-1/3 h-24 pr-3 flex items-center justify-end text-lg overflow-x-auto scroll">
        {expression}
      </div>
      <div className="bg-slate-200 h-96 w-5/6 md:w-1/3 flex flex-col">
        <div className="grid grid-rows-1 grid-cols-4 w-full h-1/5">
          <div
            onClick={() => clear()}
            className="col-span-2 border border-gray-700 flex justify-center items-center cursor-pointer hover:bg-slate-300"
          >
            CLEAR
          </div>
          <div
            onClick={() => deleteChar()}
            className="border border-gray-700 flex justify-center items-center cursor-pointer hover:bg-slate-300"
          >
            DEL
          </div>
          <NormalButton value={"/"} className="w-1/4" />
        </div>
        <div className="h-3/5 w-full grid grid-cols-4 grid-rows-3">
          <NormalButton value={"7"} />
          <NormalButton value={"8"} />
          <NormalButton value={"9"} />
          <NormalButton value={"*"} />
          <NormalButton value={"4"} />
          <NormalButton value={"5"} />
          <NormalButton value={"6"} />
          <NormalButton value={"-"} />
          <NormalButton value={"1"} />
          <NormalButton value={"2"} />
          <NormalButton value={"3"} />
          <NormalButton value={"+"} />
        </div>
        <div className="grid grid-cols-4 grid-rows-1 w-full h-1/5">
          <NormalButton value={"0"} />
          <NormalButton value={"."} />
          <div
            onClick={() => evaluate(expression)}
            className="col-span-2 border border-gray-700 flex justify-center items-center cursor-pointer hover:bg-slate-300"
          >
            =
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
