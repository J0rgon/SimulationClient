pub mod functions{
    use evalexpr::{ContextWithMutableVariables, DefaultNumericTypes, HashMapContext, Node, Value};


    pub fn evaluate(
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


}

