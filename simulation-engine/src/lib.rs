#![allow(unused_assignments)]
use core::f64;
use std::mem::swap;

use evalexpr::*;
use wasm_bindgen::prelude::*;

const MAX_TRIES: u16 = 10000;

fn evaluate(
    function: &Node,
    value: &f64,
    context: &mut HashMapContext<DefaultNumericTypes>,
) -> f64 {
    match context.set_value("x".into(), Value::Float(*value)) {
        Ok(_) => (),
        Err(_) => return f64::NAN,
    };

    match function.eval_with_context(context) {
        Ok(f) => match f.as_float() {
            Ok(f) => f,
            Err(_) => f64::NAN,
        },
        Err(_) => f64::NAN,
    }
}

#[wasm_bindgen]
pub fn solve_bisection_generic(f: &str, a: f64, b: f64, tolerance: f64) -> f64 {
    println!("{}", f);

    let precompiled = match build_operator_tree::<DefaultNumericTypes>(f) {
        Ok(tree) => tree,
        Err(_) => return f64::NAN,
    };

    let mut context: HashMapContext<DefaultNumericTypes> =
        HashMapContext::<DefaultNumericTypes>::new();

    let mut current_a = a;
    let mut current_b = b;

    if a > b {
        swap(&mut current_a, &mut current_b);
    }

    let mut fa = evaluate(&precompiled, &current_a, &mut context);
    let mut fb = evaluate(&precompiled, &current_b, &mut context);
    let mut mp = 0.0_f64; //mid point
    let mut fmp = 0.0f64;
    let mut last_mp = f64::MAX;

    if fa.is_nan() || fb.is_nan() || fa * fb >= 0.0_f64 {
        return f64::NAN;
    }

    for _ in 0..MAX_TRIES {
        mp = current_a + (current_b - current_a) / 2.0_f64;
        fmp = evaluate(&precompiled, &mp, &mut context);

        if fmp.is_nan() {
            return f64::NAN;
        }
        if fmp.abs() < f64::EPSILON || (mp - last_mp).abs() < tolerance {
            return mp;
        }

        if fa * fmp < 0.0_f64 {
            current_b = mp;
            fb = fmp;
        } else {
            current_a = mp;
            fa = fmp;
        }

        last_mp = mp;
    }

    (current_a + current_b) / 2.0_f64
}

#[wasm_bindgen]
pub fn calculate_dummy_data(x: f64) -> f64 {
    let result = x.sin() * x.cos() + 2.0;
    result
}
