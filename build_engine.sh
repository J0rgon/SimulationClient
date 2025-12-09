# bin/bash

set -e

cd simulation-engine

wasm-pack build --target web

cd ..

cp ./simulation-engine/pkg/simulation_engine_bg.wasm ./public