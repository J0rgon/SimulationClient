import type React from "react"
interface SimulationsContainerContent {
    children: React.ReactElement;
}

function SimulationsContainer({children}: SimulationsContainerContent) {
    return (
        <div className="p-4 bg-gray-600 rounded-md my-4 border-2 border-cyan-500 flex-col items-center justify-center">
            <form className="my-4">
                {children}
            </form>
        </div>
    )
}

export default SimulationsContainer;