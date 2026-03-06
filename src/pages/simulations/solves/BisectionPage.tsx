import { useState, useEffect } from "react";
import init, { solve_bisection_generic } from "../../../../simulation-engine/pkg/simulation_engine";
import standardizeInput from "../standardize_input";
import SimulationsContainer from "@/components/containers/SimulationsContainer";
import TwoDimentionalFunctionInput from "@/components/bars/inputs/TwoDimentionalFunctionInput";
import NumericalInput from "@/components/bars/inputs/NumericalInput";
import RunSimulationButton from "@/components/buttons/RunSimulationButton";

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
      <SimulationsContainer children={
        <>
          <h5>Insert your function already equalled to zero (use x as the variable)</h5>
          <TwoDimentionalFunctionInput displayedFunction={displayedFunction} setDisplayedFunction={setDisplayedFunction} message="f(x)" />
          <div className="grid grid-cols-2 gap-1.5">
            <h5>Left point</h5>
            <h5>Right point</h5>
            <NumericalInput displayedNumber={A} setDisplayedNumber={setA} />
            <NumericalInput displayedNumber={B} setDisplayedNumber={setB} />
            <h5>Tolerance (as a power of ten)</h5>
            <h5> </h5>
            <NumericalInput displayedNumber={tolerance} setDisplayedNumber={setTolerance} />
            
          </div>
          <RunSimulationButton handleRunSimulation={handleRunSimulation} isReady={isReady}/>
          {result !== null && (
            <div className="mt-4 text-xl">
              Result from Rust: {result}
            </div>
          )}
        </>
      } />
      
  );
}

export default BisectionPage;