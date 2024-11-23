import React, { useState, useCallback } from "react";
import FunctionCard from "./components/FunctionalCard";

const App: React.FC = () => {
  const [initialInput, setInitialInput] = useState(2);
  const [outputs, setOutputs] = useState<number[]>([0, 0, 0, 0, 0]);

  const updateOutput = useCallback((id: number, value: number) => {
    setOutputs((prevOutputs) => {
      console.log("====================================");
      console.log(prevOutputs);
      console.log("====================================");
      const newOutputs = [...prevOutputs];
      newOutputs[id - 1] = value;
      return newOutputs;
    });
  }, []);

  const functionChain = [
    { id: 1, equation: "x*2", next: "Function 2", current: "Function 1" },
    { id: 2, equation: "2*x+4", next: "Function 4", current: "Function 2" },
    { id: 3, equation: "x**2+20", next: "-", current: "Function 3" },
    { id: 4, equation: "x-2", next: "Function 5", current: "Function 4" },
    { id: 5, equation: "x/2", next: "Function 3", current: "Function " },
  ];

  const cardInput = (index: number) => {
    switch (index) {
      case 0:
        return initialInput;
      case 1:
        return outputs[0];
      case 2:
        return outputs[4];
      case 3:
        return outputs[1];
      case 4:
        return outputs[3];
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="flex-col justify-center items-center mr-5">
        <div className="flex justify-center mb-2 items-center bg-orange-400  rounded-xl">
          <label>Initial Value of x</label>
        </div>
        <div className="flex items-center mr-10 px-5 justify-center rounded-xl bg-white border-2 border-orange-300">
          <input
            type="number"
            style={{ backgroundColor: "transparent", color: "black" }}
            value={initialInput}
            onChange={(e) => setInitialInput(Number(e.target.value))}
            className="w-10"
          />
          <label className="flex items-center py-4 space-x-2">
            <input type="radio" checked={true} />
          </label>
        </div>
      </div>
      <div className="space-y-8 w-full max-w-4xl">

        <div className="grid grid-cols-3 gap-8 relative">
          {functionChain.map((func, index) => {
            return (
              <FunctionCard
                key={func.id}
                id={func.id}
                equation={func.equation}
                nextFunction={func.next}
                input={index === 0 ? initialInput : cardInput(index)}
                onOutputChange={updateOutput}
              />
            );
          })}
        </div>
      </div>
      <div className="flex-col justify-center items-center">
        <div className="flex justify-center mb-2 items-center bg-green-400 mx-8 rounded-xl">
          <label>Final Output y</label>
        </div>
        <div className="flex ml-10 items-center mr-10 px-5 space-x-10 justify-center rounded-xl border-2 border-green-300 bg-white">
          <label className="flex items-center py-4 space-x-2">
            <input type="radio" checked={true} />
          </label>

          <label className="text-gray-500 font-semibold">{outputs[2]}</label>
        </div>
      </div>
    </div>
  );
};

export default App;
