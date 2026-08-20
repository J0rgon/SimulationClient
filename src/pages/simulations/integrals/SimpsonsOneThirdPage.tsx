import SimulationsContainer from "@/components/containers/SimulationsContainer";
import { useEffect, useState } from "react";
import standardizeInput from "../standardize_input";
import init, { simpsons_one_third } from "../../../../simulation-engine/pkg/simulation_engine";
import TwoDimentionalFunctionInput from "@/components/bars/inputs/TwoDimentionalFunctionInput";
import NumericalInput from "@/components/bars/inputs/NumericalInput";
import RunSimulationButton from "@/components/buttons/RunSimulationButton";

function SimpsonsOneThirdPage() {

    const [result, setResult] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [displayedFunction, setDisplayedFunction] = useState("");
    const [A, setA] = useState(0);
    const [B, setB] = useState(0);
    const [N, setN] = useState(0);

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
            const value = simpsons_one_third(ready, A, B, N);
            setResult(value.toString());
        } catch (error) {
            setResult("Not a valid function");
        }

    };

    return (
        <SimulationsContainer children={
            <>
                <h3>Simpson's 1/3 rule for numerical integrals</h3>
                <TwoDimentionalFunctionInput displayedFunction={displayedFunction} setDisplayedFunction={setDisplayedFunction} message={"f(x)"} />
                <div className="grid grid-cols-2 gap-1.5">
                    <h5>Start of integral interval A:</h5>
                    <NumericalInput displayedNumber={A} setDisplayedNumber={setA} />
                    <h5>End of integral interval B:</h5>
                    <NumericalInput displayedNumber={B} setDisplayedNumber={setB} />
                    <h5>Amount of sections to use N:</h5>
                    <NumericalInput displayedNumber={N} setDisplayedNumber={setN} />
                </div>
                <RunSimulationButton handleRunSimulation={handleRunSimulation} isReady={isReady} />
                {result !== null && (
                    <div className="mt-4 text-xl">
                        Result from Rust: {result}
                    </div>
                )}
            </>
        } />
    )
}

export default SimpsonsOneThirdPage;