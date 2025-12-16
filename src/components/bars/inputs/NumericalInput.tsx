interface NumericalInputProps {
    displayedNumber: number;
    setDisplayedNumber: (value: number) => void;
}

function NumericalInput({ displayedNumber, setDisplayedNumber }: NumericalInputProps) {
    return (
        <input value={displayedNumber} onChange={
            input => {
                setDisplayedNumber(parseFloat(input.target.value))
            }
        } type="number" className="bg-gray-500 p-4 rounded-md my-4 border-2 border-cyan-500 focus-within:border-white outline-0 flex-row flex-wrap items-center justify-center"></input>
    );
}

export default NumericalInput;