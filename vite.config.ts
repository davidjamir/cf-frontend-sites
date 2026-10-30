import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { workersCacheCdnAdapter } from "@vinext/cloudflare/cache/workers-cache-cdn-adapter";
// import { kvDataAdapter } from "@vinext/cloudflare/cache/kv-data-adapter";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";

export default defineConfig({
  plugins: [
    vinext({
      images: { optimizer: imagesOptimizer() },
      cache: {
        cdn: workersCacheCdnAdapter(),
        // data: kvDataAdapter(),
      },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
  build: {
    rolldownOptions: {
      external: ["cloudflare:workers"],
    },
  },
});
