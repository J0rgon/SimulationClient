interface RunSimulationButtonProps{
    handleRunSimulation: () => void;
    isReady: boolean;
}

function RunSimulationButton({handleRunSimulation, isReady}: RunSimulationButtonProps){
    return (
        <button
              onClick={handleRunSimulation}
              disabled={!isReady}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              type="button"
            >
              {isReady ? "Run Simulation" : "Loading WASM..."}
            </button>
    );
}

export default RunSimulationButton;