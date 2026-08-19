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

// solver for a fixed point function, not zero/root finding.
#[wasm_bindgen]
pub fn solve_fixed_point(f: &str, a: f64, tolerance: f64) -> f64 {
    let precompiled = match build_operator_tree::<DefaultNumericTypes>(f) {
        Ok(tree) => tree,
        Err(_) => return f64::NAN,
    };

    let mut context: HashMapContext<DefaultNumericTypes> =
        HashMapContext::<DefaultNumericTypes>::new();

    let mut current_point = a;
    let mut last_point = a;

    for _ in 0..MAX_TRIES {
        current_point = evaluate(&precompiled, &current_point, &mut context);

        if current_point.is_nan() {
            return current_point;
        }

        if (current_point - last_point).abs() < tolerance
            || (current_point - last_point).abs() < f64::EPSILON
        {
            return current_point;
        }
        last_point = current_point;
    }

    f64::NAN
}

// solver for a fixed point function, not zero/root finding.
#[wasm_bindgen]
pub fn solve_aitken(f: &str, a: f64, tolerance: f64) -> f64 {
    let precompiled = match build_operator_tree::<DefaultNumericTypes>(f) {
        Ok(tree) => tree,
        Err(_) => return f64::NAN,
    };

    let mut context: HashMapContext<DefaultNumericTypes> =
        HashMapContext::<DefaultNumericTypes>::new();

    let mut last_point: f64 = a;
    let mut n_p: f64 = a;
    let mut n_plus_one_p: f64 = evaluate(&precompiled, &n_p, &mut context);
    let mut n_plus_two_p: f64 = evaluate(&precompiled, &n_plus_one_p, &mut context);
    let mut p_hat: f64;
    let mut error: f64;

    if n_p.is_nan() {
        return f64::NAN;
    }

    if n_plus_one_p.is_nan() {
        return f64::NAN;
    }

    if n_plus_two_p.is_nan() {
        return f64::NAN;
    }

    for _ in 0..MAX_TRIES {
        let denom = n_p - 2.0 * n_plus_one_p + n_plus_two_p;
        if denom.abs() < f64::EPSILON {
            return n_p;
        }
        p_hat = n_p - (&n_p - &n_plus_one_p).powi(2) / denom;
        error = (p_hat - last_point).abs();

        if error < f64::EPSILON || error < tolerance {
            return p_hat;
        }

        last_point = p_hat;

        n_p = n_plus_one_p;
        n_plus_one_p = n_plus_two_p;
        n_plus_two_p = evaluate(&precompiled, &n_plus_one_p, &mut context);

        if n_plus_two_p.is_nan() {
            return f64::NAN;
        }
    }

    f64::NAN
}

#[wasm_bindgen]
pub fn solve_steffensen(f: &str, a: f64, tolerance: f64) -> f64 {
    let precompiled = match build_operator_tree::<DefaultNumericTypes>(f) {
        Ok(tree) => tree,
        Err(_) => return f64::NAN,
    };

    let mut context: HashMapContext<DefaultNumericTypes> =
        HashMapContext::<DefaultNumericTypes>::new();

    let mut last_point: f64 = a;
    let mut n_p: f64 = a;
    let mut n_plus_one_p: f64;
    let mut n_plus_two_p: f64;
    let mut p_hat: f64;
    let mut error: f64;
    let mut denom: f64;

    for _ in 0..MAX_TRIES {
        n_p = last_point;
        n_plus_one_p = evaluate(&precompiled, &n_p, &mut context);
        n_plus_two_p = evaluate(&precompiled, &n_plus_one_p, &mut context);
        denom = n_p - 2.0 * n_plus_one_p + n_plus_two_p;

        if denom.abs() < f64::EPSILON {
            return n_plus_two_p;
        }

        p_hat = n_p - (n_plus_one_p - n_p).powi(2) / denom;
        error = (p_hat - n_p).abs();

        if error < tolerance || error > f64::EPSILON {
            return p_hat;
        }

        last_point = p_hat;

        if last_point.is_nan() {
            return f64::NAN;
        }
    }

    f64::NAN
}

#[wasm_bindgen]
pub fn integral_trapezoid(f: &str, a: f64, b: f64, n_f64: f64) -> f64 {
    let precompiled = match build_operator_tree::<DefaultNumericTypes>(f) {
        Ok(tree) => tree,
        Err(_) => return f64::NAN,
    };

    let mut context: HashMapContext<DefaultNumericTypes> =
        HashMapContext::<DefaultNumericTypes>::new();

    let n: usize = n_f64.round() as usize;
    let delta_x = (b - a) / (n as f64);

    let mut accum =
        (evaluate(&precompiled, &a, &mut context) + evaluate(&precompiled, &b, &mut context)) / 2.0;

    for k in 1..n {
        let x_k = a + (k as f64) * delta_x;
        accum += evaluate(&precompiled, &x_k, &mut context);
    }

    let result = accum * delta_x;
    result
}
