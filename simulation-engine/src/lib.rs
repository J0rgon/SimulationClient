use wasm_bindgen::prelude::*;
use meval::Expr;


#[wasm_bindgen]
pub fn solve_bisection_generic(
    f: &JsFunction,
    a: f64, 
    b: f64, 
    _tolerance: f64
) -> f64 {
    let result_a = f.call1(a);
    let result_b = f.call1(b);
    result_a + result_b
}

#[wasm_bindgen]
pub fn calculate_dummy_data(x: f64) -> f64 {
    let result = x.sin() * x.cos() + 2.0;
    result
}

