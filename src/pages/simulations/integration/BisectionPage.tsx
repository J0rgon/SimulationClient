import { useState, useEffect } from "react";
import init, { solve_bisection_generic } from "../../../../simulation-engine/pkg/simulation_engine";
import standardizeInput from "./standardize_input";

export function BisectionPage() {
  const [result, setResult] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [displayedFunction, setDisplayedFunction] = useState("");
  const [A, setA] = useState(0);
  const [B, setB] = useState(0);
  const [tolerance, setTolerance] = useState(0);

  useEffect(() => {
    init("/simulation_engine").then(() => {
      setIsReady(true);
    });
  }, []);

  const handleRunSimulation = () => {
    if (!isReady) return;
    try {
      let ready = standardizeInput(displayedFunction);
      console.log(ready);
      const value = solve_bisection_generic(ready, A, B, 10 ** (-tolerance));
      setResult(value.toString());
    } catch (error) {
      setResult("Not a valid function");
    }

  };

  return (
    <div className="p-4 bg-gray-600 rounded-md my-4 border-2 border-cyan-500 flex-col items-center justify-center">
      <form className="my-4">
        <h5>Insert your function already equalled to zero (use x as the variable)</h5>
        <div className="bg-gray-500 p-4 rounded-md my-4 border-2 border-cyan-500 focus-within:border-white outline-0 flex-row flex-wrap items-center justify-center">
          <h6>f(x)=</h6>
          <textarea
            rows={1}
            className="outline-0 font-mono resize-none overflow-hidden"
            value={displayedFunction}
            onChange={input => {
              setDisplayedFunction(input.target.value)
            }}
            onKeyDown={(e) => {
              // Prevent Enter from adding newlines
              if (e.key === 'Enter') e.preventDefault();
            }}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
          />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <h5>Left point</h5>
          <h5>Right point</h5>
          <input value={A} onChange={
            input => {
              setA(parseFloat(input.target.value))
            }
          } type="number" className="bg-gray-500 p-4 rounded-md my-4 border-2 border-cyan-500 focus-within:border-white outline-0 flex-row flex-wrap items-center justify-center"></input>
          <input value={B} onChange={
            input => {
              setB(parseFloat(input.target.value))
            }
          } type="number" className="bg-gray-500 p-4 rounded-md my-4 border-2 border-cyan-500 focus-within:border-white outline-0 flex-row flex-wrap items-center justify-center"></input>
        </div>
        <h5>Tolerance (as a power of ten)</h5>
        <input value={tolerance} onChange={
          input => {
            setTolerance(parseFloat(input.target.value))
          }
        } type="number" className="bg-gray-500 p-4 rounded-md my-4 border-2 border-cyan-500 focus-within:border-white outline-0 flex-row flex-wrap items-center justify-center"></input>

      </form>
      <button
        onClick={handleRunSimulation}
        disabled={!isReady}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isReady ? "Run Calculation" : "Loading WASM..."}
      </button>

      {result !== null && (
        <div className="mt-4 text-xl">
          Result from Rust: {result}
        </div>
      )}
    </div>
  );
}

export default BisectionPage;