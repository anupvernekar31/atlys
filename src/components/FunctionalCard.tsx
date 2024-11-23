import React, { useEffect, useState } from "react";
import { validateEquation } from "../utils/utils";

interface FunctionCardProps {
  id: number;
  equation: string;
  nextFunction: string;
  input: number | undefined;
  onOutputChange: (id: number, value: number) => void;
}

const FunctionCard: React.FC<FunctionCardProps> = ({
  id,
  equation,
  nextFunction,
  input,
  onOutputChange,
}) => {
  const [currentEquation, setCurrentEquation] = useState(equation);
  const [output, setOutput] = useState<number | string>("");


  useEffect(() => {
    try {
      if(validateEquation(currentEquation)){
        const result = eval(currentEquation.replace(/x/g, `${input}`));
        console.log(currentEquation.replace(/x/g, `${input}`), result);
        setOutput(result);
        onOutputChange(id, result);
      }
      
    } catch {
      setOutput("Error");
    }

     
  }, [currentEquation, input, id, onOutputChange]);

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <div className="flex mb-3 items-center">
        <label className="text-gray-500 font-semibold">{`Function ${id}`}</label>
      </div>
      <label className="block text-sm text-black font-semibold">Equation</label>
      <input
        type="text"
        style={{ backgroundColor: "white", color: "black", borderRadius: 10 }}
        value={currentEquation}
        onChange={(e) => setCurrentEquation(e.target.value)}
        className="mt-2 p-2 border rounded w-full"
      />
      <label className="block mt-4 text-sm text-black font-semibold">
        Next Function
      </label>
      <select
        disabled
        value={nextFunction}
        className="mt-2 p-2 border text-gray-700 bg-gray-200 rounded w-full"
      >
        <option>{nextFunction}</option>
      </select>
      <div className="flex justify-between py-3">
        <div className="space-x-2">
          <input type="radio" checked={true} />
          <label className="text-black text-sm">input</label>
        </div>
        <div className="space-x-2">
          <label className="text-black">output</label>
          <input type="radio" checked={true} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(FunctionCard);
