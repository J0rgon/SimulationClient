pub mod integrals {
    use evalexpr::{DefaultNumericTypes, HashMapContext, build_operator_tree};
    use wasm_bindgen::prelude::wasm_bindgen;

    use crate::functions::functions::evaluate;

    #[wasm_bindgen]
    pub fn integral_trapezoid(f: &str, a: f64, b: f64, n_f64: f64) -> f64 {
        let precompiled = match build_operator_tree::<DefaultNumericTypes>(f) {
            Ok(tree) => tree,
            Err(_) => return f64::NAN,
        };

        let mut context: HashMapContext<DefaultNumericTypes> =
            HashMapContext::<DefaultNumericTypes>::new();

        let n: usize = n_f64.round() as usize;
        let delta_x = (b - a) / (n_f64);

        let mut accum = (evaluate(&precompiled, &a, &mut context)
            + evaluate(&precompiled, &b, &mut context))
            / 2.0;

        for k in 1..n {
            let x_k = a + (k as f64) * delta_x;
            accum += evaluate(&precompiled, &x_k, &mut context);
        }

        let result = accum * delta_x;
        result
    }

    #[wasm_bindgen]
    pub fn simpsons_one_third(f: &str, a: f64, b: f64, n_f64: f64) -> f64 {
        let precompiled = match build_operator_tree::<DefaultNumericTypes>(f) {
            Ok(tree) => tree,
            Err(_) => return f64::NAN,
        };

        let mut context: HashMapContext<DefaultNumericTypes> =
            HashMapContext::<DefaultNumericTypes>::new();

        let mut n: usize = n_f64.round() as usize;
        if n % 2 != 0 {
            n += 1;
        }
        if n == 0 {
            n = 2;
        }
        let delta_x = (b - a) / (n as f64);
        let mut accum = evaluate(&precompiled, &a, &mut context) +  evaluate(&precompiled, &b, &mut context);
        for k in 1..n {
            let factor = if k % 2 == 0 { 2.0 } else { 4.0 };
            let x_k = a + (k as f64) * delta_x;
            accum += factor * evaluate(&precompiled, &x_k, &mut context);
        }
        return accum * (delta_x / 3.0_f64);
    }
}
