interface TwoDimentionalFunctionInputProps {
  displayedFunction: string;
  setDisplayedFunction: (value: string) => void;
  message: string;
}

function TwoDimentionalFunctionInput({displayedFunction, setDisplayedFunction, message = "f(x)"} : TwoDimentionalFunctionInputProps) {
    return (
        <div className="bg-gray-500 p-4 rounded-md my-4 border-2 border-cyan-500 focus-within:border-white outline-0 flex-row flex-wrap items-center justify-center">
          <h6>{message} =</h6>
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
    );
}

export default TwoDimentionalFunctionInput;