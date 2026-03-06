import NumericalInput from "@/components/bars/inputs/NumericalInput";
import TwoDimentionalFunctionInput from "@/components/bars/inputs/TwoDimentionalFunctionInput";
import RunSimulationButton from "@/components/buttons/RunSimulationButton";
import SimulationsContainer from "@/components/containers/SimulationsContainer";
import { useEffect, useState } from "react";
import standardizeInput from "../standardize_input";
import init, { solve_steffensen } from "../../../../simulation-engine/pkg/simulation_engine";

export function SteffensenPage() {

    const [result, setResult] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [displayedFunction, setDisplayedFunction] = useState("");
    const [A, setA] = useState(0);
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
            const value = solve_steffensen(ready, A, 10 ** (-tolerance));
            setResult(value.toString());
        } catch (error) {
            setResult("Not a valid function");
        }

    };

    return (
        <SimulationsContainer children={
            <>
                <h5>Insert your function already equalled to x (use x as the variable as well)</h5>
                <TwoDimentionalFunctionInput displayedFunction={displayedFunction} setDisplayedFunction={setDisplayedFunction} message={"x"}/>
                <div className="grid grid-cols-2 gap-1.5">
                    <h5>Starting point</h5>
                    <NumericalInput displayedNumber={A} setDisplayedNumber={setA} />
                    <h5>Tolerance (as a power of ten)</h5>
                    <NumericalInput displayedNumber={tolerance} setDisplayedNumber={setTolerance} />
                </div>
                <RunSimulationButton handleRunSimulation={handleRunSimulation} isReady={isReady} />
                {result !== null && (
                    <div className="mt-4 text-xl">
                        Result from Rust: {result}
                    </div>
                )}
            </>
        } />
    );
}

export default SteffensenPage;