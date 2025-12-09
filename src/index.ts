import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    "/*": index,

    "/simulation_engine": async req => {
      const file = Bun.file("./public/simulation_engine_bg.wasm");
      return new Response(file, {
        headers: {
          "Content-Type": "application/wasm",
        },
      })
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
