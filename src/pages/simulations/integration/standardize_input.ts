const standardizeInput = (input: string): string => {
    const mathFunctions = ["is_nan", "is_finite", "is_infinite", "is_normal", "ln", "log", "log2", "log10", "exp", "exp2", "pow",
        "cos", "acos", "cosh", "acosh", "sin", "asin", "sinh", "asinh", "tan", "atan", "tanh", "atanh", "atan2", "sqrt", "sqrt", "hypot", "abs"];

    let standardized = input;
    mathFunctions.forEach(func => {
        standardized = standardized.replace(
            new RegExp(`\\b${func}\\b(?!::)`, 'g'), 
            `math::${func}`
        );
    });

    return standardized;
}

export default standardizeInput;
