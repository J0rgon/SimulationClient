use core::f64;
use std::thread::current;

use evalexpr::*;
use wasm_bindgen::prelude::*;

const MAX_TRIES: u16 = 10000;

#[wasm_bindgen]
pub fn solve_bisection_generic(f: &str, a: f64, b: f64, tolerance: f64) -> f64 {
    let precompiled = match build_operator_tree::<DefaultNumericTypes>(f) {
        Ok(tree) => tree,
        Err(_) => return f64::NAN,
    };

    let mut context: HashMapContext<DefaultNumericTypes> =
        HashMapContext::<DefaultNumericTypes>::new();

    let mut fa = 0.0_f64;
    let mut fb = 0.0_f64;
    let mut error = f64::MAX;
    let mut mp = 0.0_f64; //mid point
    let mut fmp = 0.0f64;
    let mut last_mp = f64::MAX;

    if a == b {
        return f64::NAN;
    }

    let mut current_a = a;
    let mut current_b = b;

    if a > b {
        current_a = b;
        current_b = a;
    }

    for _ in 1..MAX_TRIES + 1 {
        context.set_value("x".into(), Value::Float(current_a));
        fa = match precompiled.eval_with_context(&context) {
            Ok(r) => match r.as_float() {
                Ok(r) => r,
                Err(_) => return f64::NAN,
            },
            Err(_) => return f64::NAN,
        };

        context.set_value("x".into(), Value::Float(current_b));
        fb = match precompiled.eval_with_context(&context) {
            Ok(r) => match r.as_float() {
                Ok(r) => r,
                Err(_) => return f64::NAN,
            },
            Err(_) => return f64::NAN,
        };

        mp = current_a + ((current_b - current_a) / 2.0_f64); 
        context.set_value("x".into(), Value::Float(mp));
        fmp = match precompiled.eval_with_context(&context) {
            Ok(r) => match r.as_float() {
                Ok(r) => r,
                Err(_) => return f64::NAN,
            },
            Err(_) => return f64::NAN,
        };
        if fa * fb > 0.0_f64 {
            return f64::NAN;
        } else if fa * fmp < 0.0_f64 {
            current_b = mp;
        } else if fb * fmp < 0.0_f64 {
            current_a = mp;
        }

        if (mp - last_mp).abs() < tolerance {
            return mp;
        } else {
            last_mp = mp.clone();
        }

    }

    return f64::NAN;
}

#[wasm_bindgen]
pub fn calculate_dummy_data(x: f64) -> f64 {
    let result = x.sin() * x.cos() + 2.0;
    result
}
